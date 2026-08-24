'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticlesBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Size from the container, not window.innerWidth: innerWidth includes the
    // scrollbar and does not track the layout viewport on mobile, so a canvas
    // sized from it lands wider than the page and drags the document with it.
    // Measure the layout viewport, never this element: a fixed inset-0 box grows
    // with the document once anything overflows, so sizing the canvas from it
    // feeds the overflow straight back into itself and the page never settles.
    const measure = () => ({
      w: document.documentElement.clientWidth || window.innerWidth,
      h: document.documentElement.clientHeight || window.innerHeight,
    });

    const scene = new THREE.Scene();
    const { w: w0, h: h0 } = measure();
    const camera = new THREE.PerspectiveCamera(60, w0 / h0, 0.1, 100);
    camera.position.z = 12;

    // Purely decorative: on a browser without a WebGL context (remote desktops,
    // hardened privacy settings, some headless modes) skip the background
    // entirely rather than letting the constructor's throw unmount the page.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 1.5));
    renderer.setSize(w0, h0);
    el.appendChild(renderer.domElement);

    const count = 260;
    const positions = new Float32Array(count * 3);
    const speeds: number[] = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      speeds.push(0.0008 + Math.random() * 0.0022);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xc9a84c,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const pos = geo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < count; i++) {
        let y = pos.getY(i) + (speeds[i] ?? 0.001);
        if (y > 9) y = -9;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;
      points.rotation.y += 0.0004;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const { w, h } = measure();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement?.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, []);

  // overflow-hidden matters: the renderer sizes its canvas in pixels from
  // window.innerWidth, so without clipping an oversized canvas widens the
  // document itself and every page gains a horizontal scrollbar.
  return (
    <div
      ref={ref}
      className="no-print pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-60"
      aria-hidden="true"
    />
  );
}
