# Medhassu Quick Start

Get up and running in 5 minutes.

## 1. Deploy to Vercel

Click the button below (coming soon) or:

\`\`\`bash
npm install
npm run build
vercel deploy
\`\`\`

## 2. Set Environment Variables

In Vercel dashboard → Settings → Environment Variables:

\`\`\`
GITHUB_OWNER=your-username
GITHUB_REPO=your-repo
GITHUB_TOKEN=ghp_xxxx
\`\`\`

## 3. Create First Course

Create `courses/my-course.md`:

\`\`\`markdown
---
title: My Course
description: Learn amazing things
tags: Learning
---

## Lesson 1

https://www.youtube.com/watch?v=VIDEO_ID

Your content here...
\`\`\`

## 4. Push to GitHub

\`\`\`bash
git add courses/
git commit -m "Add my course"
git push
\`\`\`

## 5. Done!

Your course appears on the site automatically. Add more courses the same way.

## Add Webhook (Optional)

Repo → Settings → Webhooks → Add:
- URL: `https://your-domain.vercel.app/api/sync-github`
- Content type: `application/json`
- Events: Push

## Want Ads?

Sign up at AdSense, get your Publisher ID, add as env var:

\`\`\`
NEXT_PUBLIC_GOOGLE_ADS_PUBLISHER_ID=ca-pub-xxxx
\`\`\`

That's it! 🚀
\`\`\`

```tsx file="" isHidden
