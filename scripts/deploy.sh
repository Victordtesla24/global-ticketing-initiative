#!/bin/bash
# Deploy the Ticketalay proposal app on the Hostinger VPS.
# Run from /opt/global-ticketing-initiative on the host (or with that as cwd).
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> production-language gate"
bash scripts/no-chrome-gate.sh

echo "==> yarn build"
yarn build

echo "==> restart ticketalay.service"
systemctl restart ticketalay

echo "==> wait for ready"
for i in 1 2 3 4 5 6 7 8 9 10; do
  if curl -sf -o /dev/null -w "%{http_code}" http://127.0.0.1:3400/prototype | grep -q 200; then
    echo "deploy ok — /prototype returned 200"
    exit 0
  fi
  sleep 1
done

echo "deploy failed — /prototype did not return 200 within 10s" >&2
systemctl --no-pager -l status ticketalay || true
exit 1
