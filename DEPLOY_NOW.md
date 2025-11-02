# Deploy to GitHub Right Now

Your Medhassu platform is complete. Here's how to push it to your GitHub repo.

## Option 1: Using GitHub CLI (Easiest)

\`\`\`bash
# Install GitHub CLI if not already installed
# https://cli.github.com

# Clone repo (if not already done)
git clone https://github.com/sathwik2000/medhassu.git
cd medhassu

# Add all files and commit
git add .
git commit -m "Initial commit: medhassu ed-tech platform"

# Push to GitHub
git push origin main
\`\`\`

## Option 2: Manual Git Commands

\`\`\`bash
# Initialize if this is a fresh clone
git init

# Add remote if needed
git remote add origin https://github.com/sathwik2000/medhassu.git

# Fetch and merge existing content (if repo has code)
git fetch origin main
git merge origin/main

# Add all new files
git add .

# Commit with descriptive message
git commit -m "feat: Add medhassu ed-tech platform with GitHub integration, search modal, and Google Ads support"

# Push to GitHub
git push -u origin main
\`\`\`

## Option 3: Deploy Script (Automated)

If you want automatic deployment with environment variables:

\`\`\`bash
# Set environment variables
export GITHUB_TOKEN=ghp_your_token_here
export GITHUB_OWNER=sathwik2000
export GITHUB_REPO=medhassu

# Run deployment script
npm install ts-node
npm run deploy
\`\`\`

## What Gets Committed

✅ All source code
✅ Configuration files
✅ Documentation (README, guides)
✅ GitHub workflows

❌ `.env` and `.env.local` (already in `.gitignore`)
❌ `node_modules/` (already in `.gitignore`)
❌ `.next/` build artifacts (already in `.gitignore`)

## After Pushing

### 1. Verify on GitHub
Visit: https://github.com/sathwik2000/medhassu

You should see all files there.

### 2. Create `courses/` Folder
\`\`\`bash
mkdir courses
git add courses/.gitkeep
git commit -m "Add courses folder"
git push
\`\`\`

### 3. Deploy to Vercel

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Deploy (follow prompts)
vercel

# Or use GitHub integration
# Go to https://vercel.com/import
# Select your GitHub repo
# Follow setup wizard
\`\`\`

### 4. Add Environment Variables in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `GITHUB_OWNER` = `sathwik2000`
   - `GITHUB_REPO` = `medhassu`
   - `GITHUB_TOKEN` = Your GitHub token
   - `NEXT_PUBLIC_GOOGLE_ADS_PUBLISHER_ID` = Your AdSense ID (optional)

3. Click "Save"
4. Redeploy the project

## Verify Everything Works

1. Visit your Vercel domain
2. Try search (Cmd+K or Ctrl+K)
3. Search should work
4. Check that recommended courses section appears

## Next: Add Your First Course

Create `courses/welcome.md`:

\`\`\`markdown
---
title: Welcome to Medhassu
description: Getting started with your courses
tags: Tutorial
level: beginner
---

## Welcome

https://www.youtube.com/watch?v=dQw4w9WgXcQ

This is your first course!
\`\`\`

\`\`\`bash
git add courses/welcome.md
git commit -m "Add: Welcome course"
git push
\`\`\`

**Your site updates automatically!**

---

🎉 **You're all set!** Your ed-tech platform is live!
