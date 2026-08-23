'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MARKETS } from '@/lib/data/markets';

interface Hover {
  x: number;
  y: number;
  market: string;
  city: string;
  stat: string;
  source: string;
}

const ORIGIN = { city: 'Mumbai', lat: 19.08, lon: 72.88 };

function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function buildArc(from: THREE.Vector3, to: THREE.Vector3, r: number): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = [];
  const angle = from.angleTo(to);
  const lift = 1 + 0.18 + angle * 0.22; // arcs rise higher for longer routes
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    const p = new THREE.Vector3().copy(from).lerp(to, t).normalize();
    const elevation = 1 + (lift - 1) * Math.sin(Math.PI * t);
    points.push(p.multiplyScalar(r * elevation));
  }
  return new THREE.CatmullRomCurve3(points);
}

export default function Globe() {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<Hover | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const width = el.clientWidth || 600;
    const height = el.clientHeight || 480;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.7, 6.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
    renderer.setSize(width, height);
    el.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const R = 2.2;
    let disposed = false;

    // Core sphere — deep charcoal with subtle sheen
    const sphereGeo = new THREE.SphereGeometry(R, 64, 64);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x0b0b0c,
      emissive: 0x0a0906,
      specular: 0x1c1608,
      shininess: 8,
      transparent: true,
      opacity: 0.98,
    });
    group.add(new THREE.Mesh(sphereGeo, sphereMat));

    // Atmospheric rim glow (fresnel, back side)
    const glowGeo = new THREE.SphereGeometry(R * 1.08, 64, 64);
    const glowMat = new THREE.ShaderMaterial({
      uniforms: { glowColor: { value: new THREE.Color(0xc9a84c) } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.5);
          gl_FragColor = vec4(glowColor, 1.0) * intensity * 0.9;
        }`,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xf3dfae, 0.9);
    key.position.set(4, 3, 5);
    scene.add(key);

    // Continent point cloud from real land geometry
    fetch('/data/globe-dots.json')
      .then((r) => r.json())
      .then((dots: [number, number][]) => {
        if (disposed || !Array.isArray(dots)) return;
        const positions = new Float32Array(dots.length * 3);
        dots.forEach((d, i) => {
          const v = latLonToVec3(d[0], d[1], R * 1.004);
          positions[i * 3] = v.x;
          positions[i * 3 + 1] = v.y;
          positions[i * 3 + 2] = v.z;
        });
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const mat = new THREE.PointsMaterial({
          color: 0xb99a4e,
          size: 0.021,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.85,
          depthWrite: false,
        });
        group.add(new THREE.Points(geo, mat));
      })
      .catch(() => {
        // graceful fallback: faint wireframe if land data cannot load
        const wireGeo = new THREE.SphereGeometry(R * 1.001, 36, 24);
        const wireMat = new THREE.MeshBasicMaterial({ color: 0xc9a84c, wireframe: true, transparent: true, opacity: 0.06 });
        group.add(new THREE.Mesh(wireGeo, wireMat));
      });

    // Expansion arcs — Mumbai to each market city, with travelling light particles
    const originPos = latLonToVec3(ORIGIN.lat, ORIGIN.lon, R * 1.005);
    const arcCurves: THREE.CatmullRomCurve3[] = [];
    const comets: THREE.Mesh[] = [];
    MARKETS.forEach((m) => {
      (m.hotspots ?? []).forEach((h) => {
        const target = latLonToVec3(h.lat, h.lon, R * 1.005);
        const curve = buildArc(originPos.clone().normalize(), target.clone().normalize(), R);
        arcCurves.push(curve);
        const pts = curve.getPoints(72);
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineBasicMaterial({ color: 0xe0bd63, transparent: true, opacity: 0.32 });
        group.add(new THREE.Line(geo, mat));

        const comet = new THREE.Mesh(
          new THREE.SphereGeometry(0.032, 10, 10),
          new THREE.MeshBasicMaterial({ color: 0xf7e6b2, transparent: true, opacity: 0.95 })
        );
        group.add(comet);
        comets.push(comet);
      });
    });

    // Origin marker (Mumbai)
    const originDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 14, 14),
      new THREE.MeshBasicMaterial({ color: 0xf5e2a8 })
    );
    originDot.position.copy(originPos);
    group.add(originDot);

    // Market hotspot markers with pulse rings
    const markers: THREE.Mesh[] = [];
    const pulses: THREE.Mesh[] = [];
    MARKETS.forEach((m) => {
      (m.hotspots ?? []).forEach((h) => {
        const pos = latLonToVec3(h.lat, h.lon, R * 1.008);
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.055, 14, 14),
          new THREE.MeshBasicMaterial({ color: 0xe8c96a })
        );
        dot.position.copy(pos);
        dot.userData = { market: m.name, city: h.city, stat: m.heroStat, source: m.heroStatSource };
        group.add(dot);
        markers.push(dot);

        const pulse = new THREE.Mesh(
          new THREE.RingGeometry(0.075, 0.1, 28),
          new THREE.MeshBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.7, side: THREE.DoubleSide })
        );
        pulse.position.copy(pos.clone().multiplyScalar(1.005));
        pulse.lookAt(pos.clone().multiplyScalar(2));
        group.add(pulse);
        pulses.push(pulse);
      });
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let vel = 0;
    const AUTO_SPEED = 0.0016;
    let tiltTarget = 0.28;

    // Face the Indian Ocean corridor on load
    group.rotation.y = -1.1;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      vel = 0;
    };
    const onUp = () => {
      dragging = false;
    };
    const onMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (dragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        group.rotation.y += dx * 0.0045;
        vel = dx * 0.00045; // inertia
        tiltTarget = Math.max(-0.5, Math.min(0.65, tiltTarget + dy * 0.0028));
        lastX = e.clientX;
        lastY = e.clientY;
      }

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(markers);
      if (hits?.length && hits[0]?.object?.userData?.market) {
        const d = hits[0].object.userData as any;
        setHover({ x: e.clientX - rect.left, y: e.clientY - rect.top, market: d?.market ?? '', city: d?.city ?? '', stat: d?.stat ?? '', source: d?.source ?? '' });
        renderer.domElement.style.cursor = 'pointer';
      } else {
        setHover(null);
        renderer.domElement.style.cursor = dragging ? 'grabbing' : 'grab';
      }
    };

    renderer.domElement.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    renderer.domElement.addEventListener('pointermove', onMove);
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.style.touchAction = 'none';

    let raf = 0;
    let t = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.016;
      if (!dragging) {
        group.rotation.y += AUTO_SPEED + vel;
        vel *= 0.96; // decay inertia back to smooth auto-rotation
      }
      group.rotation.x += (tiltTarget - group.rotation.x) * 0.07;

      // Pulse rings breathe
      const s = 1 + 0.3 * Math.abs(Math.sin(t * 1.8));
      pulses.forEach((p) => {
        p.scale.setScalar(s);
        (p.material as THREE.MeshBasicMaterial).opacity = 0.7 - 0.45 * Math.abs(Math.sin(t * 1.8));
      });

      // Travelling light particles along the expansion arcs
      comets.forEach((c, i2) => {
        const u = (t * 0.14 + i2 * 0.17) % 1;
        const p = arcCurves[i2]?.getPoint?.(u);
        if (p) c.position.copy(p);
        (c.material as THREE.MeshBasicMaterial).opacity = 0.35 + 0.6 * Math.sin(Math.PI * u);
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = el.clientWidth || width;
      const h = el.clientHeight || height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointerup', onUp);
      renderer.domElement.removeEventListener('pointerdown', onDown);
      renderer.domElement.removeEventListener('pointermove', onMove);
      scene.traverse((obj: any) => {
        obj?.geometry?.dispose?.();
        if (obj?.material) {
          (Array.isArray(obj.material) ? obj.material : [obj.material]).forEach((mm: any) => mm?.dispose?.());
        }
      });
      renderer.dispose();
      if (renderer.domElement?.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative h-[420px] w-full md:h-[520px]">
      <div ref={ref} className="h-full w-full" />
      {hover ? (
        <div
          className="pointer-events-none absolute z-20 w-64 rounded-lg border border-primary/40 bg-background/95 p-3 shadow-xl backdrop-blur"
          style={{ left: Math.min(hover.x + 14, 340), top: Math.max(hover.y - 20, 0) }}
        >
          <p className="font-marquee text-xs font-bold uppercase tracking-[0.14em] text-primary">
            {hover.market} — {hover.city}
          </p>
          <p className="mt-1 text-[12px] leading-snug text-foreground/85">{hover.stat}</p>
          <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">Source: {hover.source}</p>
        </div>
      ) : null}
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
        Drag to rotate — hover gold markers for market evidence
      </p>
    </div>
  );
}
