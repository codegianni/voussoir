# Voussoir CMS Setup - Complete

This document outlines the Eleventy-based CMS system that has been set up for the Voussoir project.

## What's Been Done

### 1. Configuration Updated
- **File**: `.eleventy.js` (88 lines)
- **Changes**:
  - Added passthrough copies for `src/css`, `src/img`, `src/js`
  - Added 6 filters for date formatting and topic mapping
  - Created 4 collections: `articles`, `reports`, `allContent`, `articoli` (legacy)

### 2. Directory Structure Created
```
src/
├── articles/
│   ├── articles.json
│   └── housing-paradox.md
├── reports/
│   ├── reports.json
│   └── energy-costs-italy.md
└── _includes/layouts/
    ├── article.njk
    └── report.njk
```

### 3. Collection Metadata Files
- `src/articles/articles.json`: Assigns layout and type for articles
- `src/reports/reports.json`: Assigns layout and type for reports

### 4. Layout Templates Created
- `src/_includes/layouts/article.njk` (27KB): Complete article template
- `src/_includes/layouts/report.njk` (23KB): Complete report template

Both templates include:
- Full HTML5 structure with dark mode support
- All CSS from original templates
- Responsive design
- Header with navigation overlay
- Related content sections
- Footer with multiple columns

### 5. Demo Content
Two example files demonstrating proper markdown formatting:
- `src/articles/housing-paradox.md`: 8-min article on housing policy
- `src/reports/energy-costs-italy.md`: 48-page policy report

### 6. Dynamic Archive
- Updated `src/voussoir-archive.html` to use Nunjucks loops
- Replaced hardcoded cards with dynamic collection iteration
- Results count now reflects actual content count

## How to Build

```bash
cd /sessions/trusting-festive-pascal/mnt/voussoir

# Install dependencies (requires internet)
npm install

# Build the static site
npm run build

# Local development with hot reload
npm start
```

After building, your static site will be in the `_site/` directory.

## How to Add Content

### Writing an Article

Create a new file in `src/articles/` with the naming format `slug.md`:

```markdown
---
title: "Article Title Here"
deck: "This is the subtitle/description that appears below the title"
date: 2026-03-15
topic: digital-governance
topicLabel: "Digital Governance"
category: "Optional Category"
readTime: 6
tags:
  - digital-governance
  - public-administration
  - eu-policy
---

Your article content in Markdown goes here.

## Subheadings work normally

Regular paragraphs work as expected. You can use **bold**, *italic*, [links](url), etc.

### Code blocks
Use standard markdown code blocks with language specification.

### Blockquotes
> This is a blockquote

### Custom HTML
You can also embed HTML divs for special styling:
<div class="pullquote">"This is a pullquote"</div>
```

**Required frontmatter fields**:
- `title`: Article title (string)
- `deck`: Short description for previews (string)
- `date`: Publication date in YYYY-MM-DD format (date)
- `topic`: Topic slug from the approved list (string)
- `topicLabel`: Human-readable topic name (string)
- `category`: Optional category (string)
- `readTime`: Estimated reading time in minutes (number)
- `tags`: Array of topic slugs for filtering (array)

**Topic slugs available**:
- `ai-regulation`
- `digital-governance`
- `data-privacy`
- `govtech`
- `public-administration`
- `eu-policy`
- `comparative-policy`

### Writing a Report

Create a new file in `src/reports/` with naming format `slug.md`:

```markdown
---
title: "Report Title Here"
deck: "This is the subtitle that appears below the title"
date: 2026-02-01
topic: eu-policy
topicLabel: "EU Policy"
additionalTopic: "Energy Policy · Industrial Economics"
reportNumber: "02"
reportYear: 2026
pages: 48
tags:
  - eu-policy
  - comparative-policy
---

Your report content in Markdown...

## Sections work as normal

Markdown content renders as expected.
```

**Required frontmatter fields**:
- `title`: Report title (string)
- `deck`: Short description (string)
- `date`: Publication date in YYYY-MM-DD format (date)
- `topic`: Topic slug (string)
- `topicLabel`: Human-readable topic name (string)
- `additionalTopic`: Subtopic/area description (string)
- `reportNumber`: Report number in series (string)
- `reportYear`: Year of publication (number)
- `pages`: Total page count (number)
- `tags`: Array of topic slugs (array)

## Available Filters in Templates

When editing templates, these filters are available:

**Date Formatting**:
- `{{ date | readableDate }}` → "14 March 2026"
- `{{ date | shortDate }}` → "14 Mar 2026"
- `{{ date | isoDate }}` → "2026-03-14"
- `{{ date | dataItaliana }}` → "14 marzo 2026" (legacy Italian)

**Topic Mapping**:
- `{{ "ai-regulation" | topicLabel }}` → "AI & Regulation"
- `{{ slug | topicLabel }}` → Maps any topic slug to display name

**Content**:
- `{{ content | safe }}` → Renders markdown as HTML
- `{{ text | lower }}` → Lowercase text

**Collection Access**:
- `collections.allContent` → All articles and reports, sorted by date (newest first)
- `collections.articles` → Articles only
- `collections.reports` → Reports only

**Nunjucks Filters**:
- `{{ items | length }}` → Count items
- `{% for item in items | slice(0,3) %}` → Get first N items
- `collections.allContent | reject('url', page.url)` → Exclude current page

## File Structure Explained

```
.eleventy.js              # Main configuration file
src/
├── voussoir-archive.html # Dynamic archive page (uses Nunjucks)
├── voussoir-article.html # Static article page (original)
├── voussoir-report.html  # Static report page (original)
├── index.html            # Homepage
├── css/                  # CSS files (copied to output)
├── img/                  # Images (copied to output)
├── js/                   # JavaScript (copied to output)
├── articles/
│   ├── articles.json     # Collection settings for articles
│   ├── housing-paradox.md
│   └── [more articles...]
├── reports/
│   ├── reports.json      # Collection settings for reports
│   ├── energy-costs-italy.md
│   └── [more reports...]
└── _includes/
    └── layouts/
        ├── article.njk   # Template for individual articles
        └── report.njk    # Template for individual reports

_site/                    # Output directory (created by build)
├── articles/
│   └── housing-paradox/
│       └── index.html
├── reports/
│   └── energy-costs-italy/
│       └── index.html
└── voussoir-archive/
    └── index.html
```

## Deployment to Cloudflare Pages

1. Push the repository to GitHub
2. Connect to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `_site`
5. Deploy

The site will automatically rebuild when you push changes.

## Troubleshooting

**Build fails with "eleventy: command not found"**
- Make sure you've run `npm install` first
- Or use `npx @11ty/eleventy` instead of `eleventy`

**Markdown not rendering**
- Check that your markdown file is in the correct directory (`src/articles/` or `src/reports/`)
- Verify frontmatter is valid YAML (dates must be in YYYY-MM-DD format)
- Check that topic slug matches one of the approved values

**Pages not appearing in archive**
- Make sure the markdown file has valid frontmatter
- Verify `date` field is in the correct format
- Check that `type` is being set by articles.json or reports.json

**Styling looks wrong**
- CSS files must be in `src/css/` and referenced correctly
- Check that images are in `src/img/`
- Verify passthrough copies in `.eleventy.js` are correct

## Notes

- All CSS and styling from original HTML files has been preserved
- The system supports both new English content and legacy Italian content
- Articles and reports are sorted by date (newest first)
- The archive page dynamically displays all content
- Reading time for articles is auto-calculated from word count
- Tags are mapped to human-readable topic labels automatically

## Contact

For questions about the setup or issues with the CMS, refer to the demo content files for examples of proper markdown formatting.
