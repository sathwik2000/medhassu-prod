# Medhassu Ed-Tech Platform - Setup & Deployment Guide

## 📋 Project Structure

\`\`\`
medhassu-prod/
├── config/
│   └── courses.ts          # Course configuration (add/edit courses here)
├── md/
│   ├── home.md             # Home page content
│   └── courses/            # Course README files
│       ├── web-development/
│       │   └── README.md
│       ├── javascript-fundamentals/
│       │   └── README.md
│       └── ... (other courses)
├── app/
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # Root layout with theme
│   ├── courses/
│   │   └── [id]/
│   │       └── page.tsx    # Course detail page
│   └── globals.css         # Tailwind & theme config
└── components/
    ├── navbar.tsx          # Top navigation with search
    ├── app-sidebar.tsx     # Left sidebar navigation
    └── ...
\`\`\`

---

## 🚀 How to Add a New Course

### Step 1: Create the README file

Create a folder under `md/courses/` with a `README.md` file:

\`\`\`
md/courses/your-course-name/README.md
\`\`\`

Example content:
\`\`\`markdown
# Your Course Title

## Overview
Your course description here...

## Topics
- Topic 1
- Topic 2

## Getting Started
Content here...
\`\`\`

### Step 2: Add to course config

Edit `config/courses.ts` and add your course:

\`\`\`typescript
{
  id: "your-course-id",
  title: "Your Course Title",
  description: "Short description",
  readmeFile: "md/courses/your-course-name/README.md",
  children: [
    {
      id: "sub-course-id",
      title: "Sub Course Title",
      readmeFile: "md/courses/your-course-name/sub-topic/README.md",
    }
  ]
}
\`\`\`

### Step 3: Commit and Deploy

Your changes will automatically appear on the site after deployment!

---

## 📝 Adding Sub-Courses (Children)

To add sub-courses under a main course, add them to the `children` array:

\`\`\`typescript
{
  id: "web-development",
  title: "Web Development",
  readmeFile: "md/courses/web-development/README.md",
  children: [
    {
      id: "html-css",
      title: "HTML & CSS",
      readmeFile: "md/courses/web-development/html-css/README.md",
    },
    {
      id: "javascript",
      title: "JavaScript",
      readmeFile: "md/courses/javascript-fundamentals/README.md",
      parentId: "javascript-fundamentals" // Links to main JavaScript course
    }
  ]
}
\`\`\`

**Note:** When you add `parentId`, clicking the sub-course navigates to the parent main course.

---

## 🔗 Linking Sub-Courses to Main Courses

To make a sub-course under one course link to another main course:

\`\`\`typescript
{
  id: "sql",  // Under Web Development
  title: "SQL",
  readmeFile: "md/courses/sql/README.md",
  parentId: "sql"  // Links to main SQL course when clicked
}
\`\`\`

---

## 💻 How to Commit and Deploy

### Option 1: Using v0 GitHub Integration

1. In v0, click the **GitHub** button (top right)
2. Select your repo: `sathwik2000/medhassu-prod`
3. v0 will automatically commit your changes
4. Your site redeploys automatically on commit

### Option 2: Manual Git Commit

\`\`\`bash
# Navigate to your project folder
cd medhassu-prod

# Stage changes
git add .

# Commit with a message
git commit -m "Add new course: Your Course Name"

# Push to GitHub
git push origin main
\`\`\`

### Option 3: Using GitHub Desktop

1. Open GitHub Desktop
2. Select your `medhassu-prod` repo
3. You'll see your changes listed
4. Enter commit message in the bottom-left
5. Click "Commit to main"
6. Click "Push origin"

---

## 🌐 Deploying to Vercel

### First-time Setup

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repo: `sathwik2000/medhassu-prod`
4. Vercel auto-detects Next.js settings
5. Click "Deploy"

### Auto-Deploy on Every Commit

✅ Already configured! Every time you push to GitHub, Vercel automatically:
- Builds your site
- Tests the deployment
- Goes live within 1-2 minutes

### View Your Live Site

After first deployment, your site is live at:
\`\`\`
https://medhassu-prod.vercel.app
\`\`\`

---

## 🎨 Editing the Home Page

The home page is also a Markdown file:

\`\`\`
md/home.md
\`\`\`

Edit this file to customize your home page content. It supports:
- Headings
- Lists
- Code blocks
- Links
- Bold/Italic text

---

## 📦 Example Workflow

Here's a complete example of adding a new course:

### 1. Create the file

\`\`\`
md/courses/python-basics/README.md
\`\`\`

Content:
\`\`\`markdown
# Python Basics

Learn Python programming from scratch!

## What You'll Learn
- Variables and data types
- Functions
- Loops and conditionals

## Getting Started
[Your content here...]
\`\`\`

### 2. Update config

Edit `config/courses.ts`:
\`\`\`typescript
{
  id: "python-basics",
  title: "Python Basics",
  description: "Learn Python programming from scratch",
  readmeFile: "md/courses/python-basics/README.md",
}
\`\`\`

### 3. Commit

\`\`\`bash
git add .
git commit -m "Add Python Basics course"
git push
\`\`\`

### 4. ✅ Done!

Your course appears in the sidebar and is live within 2 minutes!

---

## 🔧 Troubleshooting

**Course not showing in sidebar?**
- Check the `id` and `readmeFile` match
- Ensure README.md exists in the specified path
- Verify JSON syntax in `config/courses.ts`

**README not loading?**
- Check file path matches exactly
- Ensure file is `.md` (not `.txt` or `.markdown`)
- Verify folder structure matches config

**Changes not live?**
- Wait 2-3 minutes after push
- Refresh the page (Cmd+Shift+R or Ctrl+Shift+R)
- Check Vercel deployment status

---

## 📚 Markdown Features Supported

Your README files support:

\`\`\`markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
***Bold and italic***

- List item 1
- List item 2

1. Numbered item
2. Numbered item

[Link text](https://example.com)

\`\`\`javascript
// Code blocks with syntax highlighting
const hello = () => console.log("Hello!");
\`\`\`

> Blockquote text

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
\`\`\`

---

## ✨ Best Practices

1. **Organize courses logically** - Use parent/child relationships for related topics
2. **Keep titles short** - They appear in the sidebar
3. **Write clear descriptions** - Users see this in the course list
4. **Use consistent file structure** - Makes future edits easier
5. **Test locally before pushing** - Catch issues early
6. **Use meaningful commit messages** - Helps track changes

---

## 🎯 Next Steps

1. Create your first course by following "Example Workflow" above
2. Customize `md/home.md` with your branding
3. Add more courses with sub-topics
4. Deploy to Vercel
5. Share your platform with students!

Happy teaching! 🎓
