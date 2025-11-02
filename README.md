# Medhassu - Markdown-Driven Ed-Tech Platform

A modern educational platform built with Next.js that makes it easy to create and manage courses through markdown files synced from GitHub.

## Features

✨ **Markdown-Driven Content**: Write courses in markdown with YAML frontmatter
📚 **Course Management**: Organized course structure with lessons and prerequisites
🎥 **YouTube Integration**: Automatically embed YouTube videos from markdown
🔍 **Full-Text Search**: Pop-over modal search across all course content
💡 **Recommended Courses**: Multiple viewing themes (cards, carousel, minimal)
📱 **Responsive Design**: Beautiful UI that works on all devices
🎨 **Dark Mode Support**: Built-in theme system
📊 **Google Ads Ready**: Easy integration with Google AdSense
🔗 **GitHub-Driven**: Push markdown to GitHub, content updates automatically
⚡ **One-Click GitHub Commits**: Commit course changes directly from the platform

## Project Structure

\`\`\`
medhassu/
├── app/
│   ├── page.tsx              # Home page with search modal
│   ├── layout.tsx            # Root layout with ads provider
│   ├── course/
│   │   └── [slug]/
│   │       └── page.tsx      # Dynamic course pages
│   └── api/
│       ├── courses/          # Course fetching endpoints
│       ├── sync-github/      # GitHub webhook handler
│       └── commit-course/    # GitHub commit endpoint
├── components/
│   ├── header.tsx            # Sticky header with search button
│   ├── search-modal.tsx      # Pop-over search modal
│   ├── github-commit-button.tsx # GitHub commit UI
│   ├── recommended-courses.tsx # 3-theme recommended section
│   ├── course-grid.tsx       # Course cards grid
│   ├── google-ads-provider.tsx # AdSense script loader
│   ├── google-ad-slot.tsx    # Ad slot component
│   └── ...
├── lib/
│   ├── courses.ts            # Course fetching logic
│   ├── markdown.ts           # Markdown parsing
│   └── ...
└── courses/                  # Course markdown files (in GitHub repo)

\`\`\`

## Course Markdown Format

Create a markdown file in the `courses/` directory of your GitHub repo:

\`\`\`markdown
---
title: Introduction to React
description: Learn React fundamentals from scratch
thumbnail: https://example.com/thumb.jpg
tags: React, JavaScript, Frontend
duration: 4 weeks
level: beginner
prerequisites: JavaScript Basics
followups: Advanced React Patterns
---

## Lesson 1: Components and JSX

https://www.youtube.com/watch?v=ABC123

Learn about React components and JSX syntax...

## Lesson 2: Hooks

https://www.youtube.com/watch?v=DEF456

Master React Hooks and state management...
\`\`\`

## Quick Start

### 1. Clone & Deploy

\`\`\`bash
git clone https://github.com/yourusername/medhassu.git
cd medhassu
npm install
\`\`\`

### 2. Set Environment Variables

In your Vercel project or `.env.local`:

\`\`\`
GITHUB_OWNER=your-username
GITHUB_REPO=your-repo-name
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
NEXT_PUBLIC_GOOGLE_ADS_PUBLISHER_ID=ca-pub-xxxxxxxxxxxxxxxx (optional)
\`\`\`

**How to get GitHub Token:**
1. Go to GitHub Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Create new token with `repo` scope
3. Copy and save as `GITHUB_TOKEN`

### 3. Create Courses Folder

In your GitHub repo, create a `courses/` folder and add markdown files:

\`\`\`
your-repo/
├── courses/
│   ├── intro-to-react.md
│   ├── advanced-javascript.md
│   └── web-design-basics.md
├── README.md
└── ...
\`\`\`

### 4. Deploy

**Option A: Deploy to Vercel (Recommended)**
\`\`\`bash
npm run build
vercel deploy
\`\`\`

**Option B: Deploy Manually**
\`\`\`bash
npm run build
npm run start
\`\`\`

## How It Works

### Content Flow

1. **You write markdown** - Create course files locally with YouTube links and content
2. **Push to GitHub** - Commit to `courses/` folder in your repository
3. **Automatic sync** - Webhook triggers `/api/sync-github` to fetch and cache courses
4. **Students see it** - Content appears on the platform immediately

### GitHub Webhook Setup

To enable automatic content syncing when you push:

1. Go to your repo → Settings → Webhooks → Add webhook
2. Configure:
   - **Payload URL**: `https://your-domain.com/api/sync-github`
   - **Content type**: `application/json`
   - **Events**: Select "Push events"
   - **Active**: ✅ Checked

3. Click "Add webhook" and GitHub will send a test ping

### Commit Courses from UI

Create/edit course content and commit directly to GitHub:

1. On any course page, use the "Commit to GitHub" button
2. Enter your commit message
3. Changes are pushed to `courses/` folder automatically
4. Other team members pull the latest changes

## Features Explained

### Search Modal
- **Access**: Click search icon in header or press keyboard shortcut
- **Coverage**: Searches titles, descriptions, tags, and content
- **Results**: Click any result to navigate to course
- **Real-time**: Instant filtering as you type

### Recommended Courses
Choose display theme in settings:
- **Cards**: Grid layout with course metadata
- **Carousel**: Full-featured slider view
- **Minimal**: Simple numbered list

### Google AdSense Integration

Optional revenue generation:

1. Sign up at [Google AdSense](https://adsense.google.com)
2. Get your Publisher ID: `ca-pub-xxxxxxxxxxxxxxxx`
3. Add to environment variables as `NEXT_PUBLIC_GOOGLE_ADS_PUBLISHER_ID`
4. Ads appear automatically on:
   - Home page (hero and middle sections)
   - Course pages (header and footer)

### Prerequisites & Follow-ups
Link courses together:
- Add `prerequisites: Course Name` to YAML frontmatter
- Add `followups: Course Name` to suggest next courses
- Creates guided learning paths

## Deployment Checklist

- [ ] GitHub repository created with `courses/` folder
- [ ] GitHub Token generated with `repo` scope
- [ ] Environment variables set in Vercel/hosting
- [ ] First course markdown pushed to `courses/` folder
- [ ] GitHub webhook configured (if auto-sync desired)
- [ ] Site deployed and tested
- [ ] Google AdSense ID added (optional)

## Troubleshooting

### Courses not showing up
- Verify markdown files are in `courses/` folder
- Check GitHub Token has `repo` scope
- Ensure YAML frontmatter is valid
- Check browser console for errors

### Search not working
- Make sure courses have proper YAML frontmatter
- Verify course files are valid markdown

### Commits failing
- Verify `GITHUB_TOKEN` is set and valid
- Check token has `repo` scope
- Ensure branch is `main` (or update in code)

## License

MIT
