#!/usr/bin/env bash
# ---------------------------------------------------------------
# One-time setup: sync this folder with the GitHub main branch.
#
# What it does:
#   1. Fetches origin/main from GitHub
#   2. Adopts it as HEAD (keeping all your local files as "changes")
#   3. Leaves everything ready for a commit + push via ./push.sh
#
# Run this ONCE. After that, use ./push.sh for every deploy.
# ---------------------------------------------------------------

set -e

cd "$(dirname "$0")"

if [ ! -d ".git" ]; then
  echo "→ Initializing fresh git repo..."
  git init -q -b main
  git remote add origin https://github.com/B4YM4C/passanai-webport.git
  git config user.email "passanai.work@gmail.com"
  git config user.name "Passanai Tampawisit"
fi

# Clear stale lock if present
rm -f .git/index.lock

# Make sure remote is set correctly (idempotent)
if ! git remote get-url origin > /dev/null 2>&1; then
  git remote add origin https://github.com/B4YM4C/passanai-webport.git
fi

echo "→ Fetching origin/main from GitHub..."
git fetch origin main

echo "→ Adopting origin/main as base (your local files stay as changes)..."
git reset --mixed origin/main

echo ""
echo "✅ Setup complete. Your local files are staged against the current"
echo "   remote main branch. Review changes with:"
echo ""
echo "   git status"
echo "   git diff"
echo ""
echo "   Then commit + push with:"
echo ""
echo "   ./push.sh \"your commit message\""
