#!/usr/bin/env bash
# One-time installer on the VPS: deploys main NOW and installs key-free pull-based CD
# (polls GitHub main every 2 minutes; deploys whenever it advances). Public repo - no keys needed.
# Run as the user that owns the app process (root on the Hostinger VPS):
#   curl -fsSL https://raw.githubusercontent.com/Victordtesla24/global-ticketing-initiative/main/scripts/vps-install-cd.sh | bash
set -euo pipefail
mkdir -p /opt/ticketalay-cd
curl -fsSL https://raw.githubusercontent.com/Victordtesla24/global-ticketing-initiative/main/scripts/vps-deploy.sh -o /opt/ticketalay-cd/vps-deploy.sh
chmod +x /opt/ticketalay-cd/vps-deploy.sh
# the poller always refreshes itself from main first, so script fixes ship too
cat > /opt/ticketalay-cd/poll.sh <<'POLL'
#!/usr/bin/env bash
set -uo pipefail
exec 9>/tmp/ticketalay-cd.lock; flock -n 9 || exit 0
curl -fsSL https://raw.githubusercontent.com/Victordtesla24/global-ticketing-initiative/main/scripts/vps-deploy.sh -o /opt/ticketalay-cd/vps-deploy.sh.new 2>/dev/null \
  && mv /opt/ticketalay-cd/vps-deploy.sh.new /opt/ticketalay-cd/vps-deploy.sh && chmod +x /opt/ticketalay-cd/vps-deploy.sh
bash /opt/ticketalay-cd/vps-deploy.sh >> /var/log/ticketalay-cd.log 2>&1
POLL
chmod +x /opt/ticketalay-cd/poll.sh
( crontab -l 2>/dev/null | grep -v ticketalay-cd/poll.sh; echo "*/2 * * * * /opt/ticketalay-cd/poll.sh" ) | crontab -
echo "==> CD installed: polls main every 2 minutes (log: /var/log/ticketalay-cd.log)"
echo "==> deploying main now"
FORCE=1 bash /opt/ticketalay-cd/vps-deploy.sh
