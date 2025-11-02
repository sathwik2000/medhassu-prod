# Medhassu - Deployment Guide

Complete step-by-step guide to deploy Medhassu to production and set up GitHub integration.

## Prerequisites

- GitHub account with a repository
- Vercel account (for hosting)
- Node.js 18+ installed locally

## Step 1: Fork or Create Repository

### Option A: Create New Repository

1. Create a new GitHub repository: `medhassu-courses`
2. Clone this project locally
3. Push to your new repository

\`\`\`bash
git clone https://github.com/yourusername/medhassu-courses.git
cd medhassu-courses
git remote set-url origin https://github.com/yourusername/medhassu-courses.git
git push -u origin main
\`\`\`

### Option B: Use Existing Repository

If you already have a repository:

1. Add this project as a subtree or merge the code
2. Create a `courses/` folder in the root
3. Push to your repository

## Step 2: Create GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Tokens (classic)"
3. Configure:
   - **Token name**: `Medhassu Platform`
   - **Expiration**: 90 days (or No expiration)
   - **Scopes**: Check `repo` (Full control of private repositories)
4. Click "Generate token"
5. **Copy and save** your token - you won't see it again!

Token format: `ghp_xxxxxxxxxxxx`

## Step 3: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
5. Click "Continue"

### Option B: Vercel CLI

\`\`\`bash
npm install -g vercel
vercel login
vercel
\`\`\`

## Step 4: Set Environment Variables

### In Vercel Dashboard:

1. After importing, go to "Settings" → "Environment Variables"
2. Add these variables:

| Variable | Value | Required |
|----------|-------|----------|
| `GITHUB_OWNER` | Your GitHub username | ✅ Yes |
| `GITHUB_REPO` | Your repository name | ✅ Yes |
| `GITHUB_TOKEN` | Your personal access token | ✅ Yes |
| `NEXT_PUBLIC_GOOGLE_ADS_PUBLISHER_ID` | Your AdSense publisher ID | ❌ No |

Example:
- `GITHUB_OWNER`: `john-doe`
- `GITHUB_REPO`: `medhassu-courses`
- `GITHUB_TOKEN`: `ghp_1234567890abcdef...`

3. Click "Save"

## Step 5: Create Your First Course

### Step 5a: Local Setup

1. Create `courses/` folder in your repository:

\`\`\`bash
mkdir -p courses
\`\`\`

2. Create your first course: `courses/intro-to-react.md`

\`\`\`markdown
---
title: Introduction to React
description: Learn React fundamentals from scratch
thumbnail: https://via.placeholder.com/400x300?text=React
tags: React, JavaScript, Frontend
duration: 4 weeks
level: beginner
prerequisites: JavaScript Basics
followups: Advanced React Patterns
---

## Lesson 1: What is React?

https://www.youtube.com/watch?v=dQw4w9WgXcQ

React is a JavaScript library for building user interfaces with components.

### Key Concepts
- Components
- JSX
- Props
- State

## Lesson 2: Components and JSX

https://www.youtube.com/watch?v=jrKIPQCnWfI

Learn how to create and use React components.

### Topics
- Functional components
- Class components
- JSX syntax
- Component composition
\`\`\`

### Step 5b: Push to GitHub

\`\`\`bash
git add courses/
git commit -m "Add: Introduction to React course"
git push origin main
\`\`\`

### Step 5c: Deploy Site

1. Vercel will automatically deploy after pushing
2. Wait for deployment to complete
3. Visit your Vercel deployment URL
4. Your course should appear!

## Step 6: Configure GitHub Webhook (Optional but Recommended)

For automatic content syncing when you push courses:

1. Go to your GitHub repo → Settings → Webhooks
2. Click "Add webhook"
3. Configure:
   - **Payload URL**: `https://your-vercel-domain.vercel.app/api/sync-github`
   - **Content type**: `application/json`
   - **Which events...**: Select "Push events"
   - **Active**: Check the box ✅
4. Click "Add webhook"

GitHub will send a test ping. You should see a successful `200` response.

## Step 7: Add More Courses

### Method 1: Push via Git (Recommended)

1. Create new markdown files in `courses/` folder
2. Push to GitHub:

\`\`\`bash
git add courses/
git commit -m "Add: Advanced JavaScript course"
git push origin main
\`\`\`

3. Vercel auto-deploys
4. Content appears on site

### Method 2: Use Commit Button

1. Go to your site
2. Use "Commit to GitHub" button on course pages
3. Changes push automatically to GitHub

## Step 8: Set Up Google AdSense (Optional)

To monetize with ads:

1. Apply at https://adsense.google.com
2. Get your Publisher ID: `ca-pub-xxxxxxxxxxxxxxxx`
3. Add to Vercel environment variables:
   - Variable: `NEXT_PUBLIC_GOOGLE_ADS_PUBLISHER_ID`
   - Value: `ca-pub-xxxxxxxxxxxxxxxx`
4. Redeploy
5. Ads appear on home page and course pages

## Verify Deployment

✅ **Site is live:**
- Visit your Vercel deployment URL
- See your courses displayed

✅ **Search works:**
- Click search icon in header
- Search for course by title or tag

✅ **Content loads:**
- Click on any course
- Videos should embed correctly

✅ **GitHub sync works (if webhook configured):**
- Add a new course markdown file
- Push to GitHub
- Check site after 1-2 minutes
- New course appears

## Troubleshooting

### Courses not showing up

**Problem**: Markdown files exist but courses don't appear

**Solution**:
1. Check YAML frontmatter is valid (use online YAML validator)
2. Verify files are in `courses/` folder
3. Check filename is lowercase with hyphens (e.g., `intro-to-react.md`)
4. Check GitHub API by visiting: `https://api.github.com/repos/OWNER/REPO/contents/courses`
5. Check Vercel deployment logs for errors

### GitHub Token errors

**Problem**: "GitHub credentials not configured" error

**Solution**:
1. Verify `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO` are all set
2. Check token has `repo` scope
3. Check token hasn't expired
4. Generate a new token if needed

### Search not working

**Problem**: Search modal opens but no results

**Solution**:
1. Verify courses have proper YAML frontmatter
2. Check markdown files aren't corrupted
3. Clear browser cache and reload

### Webhook not firing

**Problem**: Changes don't sync automatically

**Solution**:
1. Check webhook in repo settings → Recent Deliveries
2. Click failed delivery to see error details
3. Verify payload URL is correct
4. Check `/api/sync-github` isn't throwing errors in Vercel logs

## Custom Domain

To use your own domain:

1. In Vercel dashboard, go to project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update webhook URL if using custom domain

## Monitoring

- **Vercel Analytics**: Dashboard shows traffic and performance
- **GitHub Webhooks**: Recent Deliveries tab shows sync history
- **Vercel Logs**: Check Function Logs for API errors

## Next Steps

- Add more courses with varied content
- Set up Google AdSense for revenue
- Customize branding in `app/layout.tsx`
- Share your site with students
- Monitor performance in Vercel dashboard

## Support

For issues:
1. Check Vercel deployment logs
2. Check GitHub API responses
3. Check browser console for client-side errors
4. Review environment variables
5. Open issue on GitHub repository
