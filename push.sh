#!/usr/bin/env bash
# ---------------------------------------------------------------
# Commit + push the current passanai-webport-main/ folder to GitHub.
#
# Usage:
#   ./push.sh                       # auto-generated commit message
#   ./push.sh "your commit message" # custom message
#
# Prerequisites (one-time):
#   ./setup-git.sh                  # syncs this folder with remote main
# ---------------------------------------------------------------

set -e

cd "$(dirname "$0")"

if [ ! -d ".git" ]; then
  echo "❌ No .git/ here yet. Run ./setup-git.sh first."
  exit 1
fi

# Clear stale git lock if present (from crashed git processes)
rm -f .git/index.lock

# Stage everything
git add -A

if git diff --cached --quiet; then
  echo "✓ No changes to commit — everything already pushed."
  exit 0
fi

MSG="${1:-update: $(date '+%Y-%m-%d %H:%M')}"
git commit -m "$MSG"

echo "→ Pushing to GitHub..."
# Use -u so the first push sets the upstream automatically; later pushes
# are no-ops for the -u flag.
BRANCH=$(git branch --show-current)
git push -u origin "$BRANCH"

echo ""
echo "✅ Done. Vercel should auto-deploy in ~1-2 minutes."
echo "   Check: https://vercel.com/dashboard"
