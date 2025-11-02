# Medhassu - GitHub-First Ed-Tech Platform

Your markdown-driven course platform is ready! Here's how to get started.

## Quick Start (2 minutes)

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/sathwik2000/medhassu.git
cd medhassu
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
# or
pnpm install
\`\`\`

### 3. Set Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# GitHub Configuration (Required)
GITHUB_OWNER=sathwik2000
GITHUB_REPO=medhassu
GITHUB_TOKEN=ghp_your_token_here

# Google Ads (Optional)
NEXT_PUBLIC_GOOGLE_ADS_PUBLISHER_ID=ca-pub-xxxxxxxxxxxxxxxx

# Vercel Blob (Optional)
BLOB_READ_WRITE_TOKEN=your_blob_token
\`\`\`

**To get GitHub Token:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Tokens (classic)"
3. Select `repo` scope
4. Generate and copy

### 4. Run Locally
\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000

### 5. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sathwik2000/medhassu&env=GITHUB_OWNER,GITHUB_REPO,GITHUB_TOKEN,NEXT_PUBLIC_GOOGLE_ADS_PUBLISHER_ID)

Or deploy manually:
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

## How It Works

### File Structure
\`\`\`
medhassu/
├── courses/              # Your markdown course files
│   ├── intro-to-react.md
│   ├── nodejs-basics.md
│   └── ...
├── app/                  # Next.js app
├── components/           # React components
├── lib/                  # Utility functions
└── public/               # Static assets
\`\`\`

### Adding Courses

#### Via GitHub (Recommended)
1. Create a new file in the `courses/` folder
2. Name it: `course-slug.md`
3. Add frontmatter and content (see format below)
4. Push to GitHub
5. Site updates automatically

#### Via Web Interface
1. Go to your deployed site
2. Click the search bar, find a course
3. Click "Commit to GitHub"
4. Make edits and commit

### Course Markdown Format

Create `courses/my-course.md`:

\`\`\`markdown
---
title: Course Title
description: Short description
tags: React, JavaScript
duration: 4 weeks
level: beginner
prerequisites: Basic JavaScript
followups: Advanced React Patterns
---

## Lesson 1: Introduction

https://www.youtube.com/watch?v=VIDEO_ID

Write lesson content here...

## Lesson 2: Deep Dive

https://www.youtube.com/watch?v=VIDEO_ID2

More content...
\`\`\`

**Frontmatter Fields:**
- `title` - Course name (required)
- `description` - Short description (required)
- `tags` - Comma-separated tags for filtering
- `duration` - How long the course takes (e.g., "4 weeks")
- `level` - beginner, intermediate, advanced
- `prerequisites` - Course slug or name of prerequisite
- `followups` - Suggested next course

**Content Features:**
- YouTube links are auto-embedded
- Markdown formatting supported
- Headings create lesson structure

## Features

✅ **GitHub-First Workflow** - All content lives in Git
✅ **Markdown-Driven** - Write courses as `.md` files
✅ **YouTube Integration** - Auto-embed videos from URLs
✅ **Search Modal** - Quick search across all courses (Cmd+K)
✅ **Course Relationships** - Prerequisites and follow-ups
✅ **Recommended Courses** - Multiple theming options
✅ **Google Ads Ready** - AdSense integration built-in
✅ **Auto-Sync** - Changes sync via GitHub webhook
✅ **Responsive Design** - Mobile-first, works everywhere

## API Endpoints

### GET `/api/courses`
Get all courses
\`\`\`bash
curl https://your-site.com/api/courses
\`\`\`

### GET `/api/courses/[slug]`
Get specific course
\`\`\`bash
curl https://your-site.com/api/courses/intro-to-react
\`\`\`

### POST `/api/sync-github`
Manual sync trigger (called by webhook)
\`\`\`bash
curl -X POST https://your-site.com/api/sync-github \
  -H "Content-Type: application/json"
\`\`\`

### POST `/api/commit-course`
Commit changes to GitHub
\`\`\`bash
curl -X POST https://your-site.com/api/commit-course \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "my-course",
    "content": "# Course content",
    "message": "Update course"
  }'
\`\`\`

## Search Feature

### Keyboard Shortcuts
- `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) - Open search
- `Escape` - Close search
- `Enter` - Open first result

### Search Scope
Searches across:
- Course titles
- Course descriptions
- Course tags
- Lesson headings
- Course content

## Recommended Courses

Three themes available:

1. **Grid View** - Traditional card layout with badges
2. **Carousel** - Featured courses in a slider
3. **List View** - Minimal numbered list

Change theme in settings or via component props.

## Environment Variables

### Required
- `GITHUB_OWNER` - Your GitHub username
- `GITHUB_REPO` - Repository name
- `GITHUB_TOKEN` - Personal access token with `repo` scope

### Optional
- `NEXT_PUBLIC_GOOGLE_ADS_PUBLISHER_ID` - Google AdSense publisher ID
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob token

## Troubleshooting

### Courses not loading
- Ensure `.md` files are in `courses/` folder
- Check YAML frontmatter syntax
- Files must have valid markdown format

### Search not working
- Ensure courses are loaded (check `/api/courses`)
- Try hard refresh (Cmd+Shift+R)
- Check browser console for errors

### GitHub sync not working
- Verify token hasn't expired
- Check webhook in repo settings
- Verify endpoint is correct

### Videos not embedding
- Use YouTube share URL or `youtube.com/watch?v=ID` format
- Check URL is on its own line in markdown

## Next Steps

1. ✅ Set up environment variables
2. ✅ Create your first course in `courses/`
3. ✅ Push to GitHub
4. ✅ Deploy to Vercel
5. ✅ Share with students!

## Support

Need help? Check these resources:
- [GitHub Integration Guide](./GITHUB_SETUP.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Quick Start](./QUICKSTART.md)

## License

MIT - Use freely!
