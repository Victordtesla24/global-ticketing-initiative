#!/usr/bin/env bash
# Deploy origin/main of global-ticketing-initiative on the Hostinger VPS.
# Idempotent. Auto-discovers the app checkout, rebuilds, restarts whatever supervises it.
# One-shot use:   curl -fsSL https://raw.githubusercontent.com/Victordtesla24/global-ticketing-initiative/main/scripts/vps-deploy.sh | bash
# CD use:         invoked over SSH by .github/workflows/deploy-vps.yml on every push to main.
set -euo pipefail

REPO_URL="https://github.com/Victordtesla24/global-ticketing-initiative.git"
APP_DIR="${APP_DIR:-}"

if [ -z "$APP_DIR" ]; then
  # find an existing checkout of this repo (git config carries the remote url)
  APP_DIR=$(grep -rls "global-ticketing-initiative" /root /opt /home /var/www /srv --include=config 2>/dev/null \
            | grep '/\.git/config$' | head -1 | sed 's|/\.git/config$||' || true)
fi
if [ -z "$APP_DIR" ]; then
  APP_DIR=/opt/global-ticketing-initiative
  echo "==> no existing checkout found; cloning to $APP_DIR"
  git clone "$REPO_URL" "$APP_DIR"
fi
echo "==> app dir: $APP_DIR"
cd "$APP_DIR"

git fetch origin main --quiet
git checkout -q main 2>/dev/null || git checkout -q -b main origin/main
# cron-safe: exit when already at origin/main and the app is answering
if [ "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)" ] && [ "${FORCE:-0}" != "1" ] \
   && curl -s -o /dev/null --max-time 5 "http://127.0.0.1:${PORT:-3000}/"; then
  exit 0
fi
git reset -q --hard origin/main
echo "==> at $(git rev-parse --short HEAD) $(git log -1 --format=%s)"

# production gate: never ship audit scaffolding
bash scripts/no-chrome-gate.sh

command -v yarn >/dev/null 2>&1 || npm i -g yarn >/dev/null 2>&1
yarn install --frozen-lockfile 2>/dev/null || yarn install
npx prisma generate >/dev/null 2>&1 || true
export DATABASE_URL="${DATABASE_URL:-postgresql://placeholder:placeholder@localhost:5432/placeholder}"
export NEXTAUTH_SECRET="${NEXTAUTH_SECRET:-static-proposal-site-no-auth}"
yarn build

# restart whatever supervises the app (pm2 / systemd / docker compose / plain next start)
restarted=0
if command -v pm2 >/dev/null 2>&1 && pm2 list 2>/dev/null | grep -qiE 'ticketalay|global-ticketing|next'; then
  name=$(pm2 jlist | python3 -c "import sys,json;[print(p['name']) for p in json.load(sys.stdin) if any(k in (p['name']+p['pm2_env'].get('pm_cwd','')).lower() for k in ('ticketalay','global-ticketing','next'))]" | head -1)
  pm2 restart "$name" --update-env && restarted=1
elif systemctl list-units --type=service 2>/dev/null | grep -qiE 'ticketalay|global-ticketing'; then
  unit=$(systemctl list-units --type=service --no-legend | grep -iE 'ticketalay|global-ticketing' | awk '{print $1}' | head -1)
  systemctl restart "$unit" && restarted=1
elif [ -f docker-compose.yml ] || [ -f compose.yml ]; then
  docker compose up -d --build && restarted=1
fi
if [ "$restarted" -eq 0 ]; then
  echo "==> no supervisor detected; (re)starting next start on PORT=${PORT:-3000} via nohup"
  pkill -f "next start" || true
  nohup npx next start -p "${PORT:-3000}" > /var/log/ticketalay-next.log 2>&1 &
fi

sleep 4
echo "==> deployed $(git rev-parse --short HEAD); local check: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:${PORT:-3000}/ || echo unreachable)"
