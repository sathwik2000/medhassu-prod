# GitHub Integration Setup

Complete guide to set up GitHub integration for Medhassu.

## 1. Generate Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Tokens (classic)"
3. Fill in:
   - **Token name**: `Medhassu Courses`
   - **Expiration**: 90 days or Custom
   - **Scopes**: Check `repo` (Full control of private repositories)
4. Click "Generate token"
5. **COPY the token immediately** - you won't see it again!

Token format: `ghp_xxxxxxxxxxxxxxxx`

## 2. Add to Vercel Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add three new variables:

| Name | Value | Example |
|------|-------|---------|
| `GITHUB_OWNER` | Your GitHub username | `john-doe` |
| `GITHUB_REPO` | Your repository name | `medhassu-courses` |
| `GITHUB_TOKEN` | Your personal access token | `ghp_1234567...` |

3. Click "Save"
4. Redeploy the project

## 3. Create courses/ Folder

In your GitHub repository:

\`\`\`bash
mkdir courses
git add courses/
git commit -m "Add courses folder"
git push
\`\`\`

## 4. Add Your First Course

Create `courses/intro-to-react.md`:

\`\`\`markdown
---
title: Introduction to React
description: Learn React from scratch
tags: React, JavaScript, Frontend
duration: 4 weeks
level: beginner
---

## Lesson 1: What is React?

https://www.youtube.com/watch?v=dQw4w9WgXcQ

Content here...
\`\`\`

Push to GitHub:

\`\`\`bash
git add courses/intro-to-react.md
git commit -m "Add: Introduction to React"
git push
\`\`\`

The course appears on your site automatically!

## 5. Set Up Webhook (Optional)

For automatic content syncing:

1. Go to your repo → Settings → Webhooks → Add webhook
2. Configure:
   - **Payload URL**: `https://your-vercel-domain.vercel.app/api/sync-github`
   - **Content type**: `application/json`
   - **Which events**: "Push events"
   - **Active**: ✅ Checked
3. Click "Add webhook"

GitHub will send a test ping. Check "Recent Deliveries" to see it worked.

## 6. Use Commit Button

To edit/create courses from the web interface:

1. On the site, navigate to a course or create one
2. Click "Commit to GitHub" button
3. Enter your commit message
4. Changes automatically push to your repository

## Token Security

⚠️ **Important Security Notes:**
- Never commit tokens to Git
- Use `.env.local` for local development (not committed)
- Use Vercel Environment Variables for production
- If token is leaked, delete it immediately and generate a new one
- Tokens can be revoked anytime at: https://github.com/settings/tokens

## Troubleshooting

### Courses not syncing
- Verify token has `repo` scope
- Check token hasn't expired
- Verify folder is `courses/` (lowercase)
- Check markdown files are valid

### Webhook not firing
- Go to repo → Settings → Webhooks
- Click webhook and check "Recent Deliveries"
- Verify payload URL is correct
- Check for red X marks indicating failures

### Commit button not working
- Verify `GITHUB_TOKEN` is set
- Check token has `repo` scope
- Try generating a new token

## Refresh Token

Tokens expire after the time you set. To create a new one:

1. Go to: https://github.com/settings/tokens
2. Find your "Medhassu Courses" token
3. Click "Regenerate token"
4. Copy new token
5. Update in Vercel Environment Variables

Done!
