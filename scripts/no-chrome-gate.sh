#!/bin/bash
# Production-language gate: the production surface (app/, lib/, components/) must read as a
# proposal for Leadership - never as audit process. Fails the build/deploy on any violation.
# Owner directive 2026-08-23/24. Audit artifacts live only under /audit (outside this tree).
set -uo pipefail
cd "$(dirname "$0")/.."

# Fixed strings (case-sensitive) that are audit/dev chrome
BANNED_FIXED=(
  "Adversarial audit" "adversarial audit" "claims removed from this page" "adjudicated ledger"
  "CL-0" "register_by_route" "Ground-Truth Register" "GT-01" "GT-0" "financial_rebuild.md"
  "deletion_register" "unresolved_register" "d6_delta" "WHAT WAS REMOVED" "audit-corrected"
  "fresh pass" "closure pass" "editor pass" "OPEN ITEM" "sanctioned" "provenance marker"
  "provenance markers" "labelled exception" "this audit" "This audit" "the audit"
  "accessed 2026" "Accessed 2026" "verified 2026" "Verified 2026" "run date" "Run date"
  "first-hand" "First-hand" "receipted" "Receipted" "T0-0" "mandate" "Mandate"
  "verification pack" "orchestrat" "swarm"
)
# Regex patterns (extended grep)
BANNED_REGEX=(
  '\[(ACTUAL|LIST|QUOTE|DERIVED|ASSUMPTION|UNKNOWN|OFFICIAL|COUNT|ILLUSTRATIVE|EST|UNVERIFIED)\]'
  '\bU-0[0-9]\b'
  '\(H-[0-9]\)'
  '\bD[1-6]’s\b|\bD[1-6]'"'"'s\b'
)

fail=0
for s in "${BANNED_FIXED[@]}"; do
  hits=$(grep -rn --include='*.tsx' --include='*.ts' -F -- "$s" app lib components 2>/dev/null | grep -v "globals.css" | grep -v "no-chrome-gate")
  if [ -n "$hits" ]; then echo "GATE VIOLATION (string): '$s'"; echo "$hits" | head -4; fail=1; fi
done
for r in "${BANNED_REGEX[@]}"; do
  hits=$(grep -rnE --include='*.tsx' --include='*.ts' -- "$r" app lib components 2>/dev/null | grep -v "no-chrome-gate")
  if [ -n "$hits" ]; then echo "GATE VIOLATION (pattern): $r"; echo "$hits" | head -4; fail=1; fi
done
if [ "$fail" -eq 1 ]; then
  echo "Refusing to ship non-production language on the production surface."
  exit 1
fi
echo "production-language gate: clean"
