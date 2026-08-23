#!/bin/bash
# Production no-chrome gate: fails if audit-process scaffolding appears in production source.
# Enforced in CI (every push) and in the deploy path. Owner directive 2026-08-23.
set -uo pipefail
cd "$(dirname "$0")/.."
BANNED=(
  "Adversarial audit"
  "adversarial audit"
  "claims removed from this page"
  "adjudicated ledger"
  "CL-0"
  "register_by_route"
  "Ground-Truth Register"
  "GT-01"
  "financial_rebuild.md"
  "deletion_register"
  "unresolved_register.md"
  "d6_delta"
  "WHAT WAS REMOVED"
  "audit-corrected"
  "fresh pass"
  "closure pass"
)
fail=0
for s in "${BANNED[@]}"; do
  hits=$(grep -rn --include='*.tsx' --include='*.ts' -F "$s" app lib components 2>/dev/null | grep -v "globals.css")
  if [ -n "$hits" ]; then
    echo "NO-CHROME GATE VIOLATION: '$s'"
    echo "$hits" | head -5
    fail=1
  fi
done
if [ "$fail" -eq 1 ]; then
  echo "Refusing to ship audit scaffolding on the production surface."
  exit 1
fi
echo "no-chrome gate: clean"
