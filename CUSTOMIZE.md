# Customize this site

This is Sijia's personalized version of Brittany Chiang's Gatsby portfolio template.

## Main places to edit

- `src/config.js`: email, social links, navigation labels, and theme colors.
- `gatsby-config.js`: site title, description, URL, and analytics ID.
- `src/components/sections/hero.js`: first screen headline and call-to-action.
- `src/components/sections/about.js`: bio, skills, and headshot image.
- `src/components/sections/contact.js`: contact copy.
- `content/jobs/*/index.md`: experience entries.
- `content/featured/*/index.md`: large featured project entries.
- `content/projects/Sijia/*.md`: smaller project cards and archive entries.
- If you want a public CV button later, add your current CV PDF under `static/` and re-enable the nav link.
- `src/images/me.jpg`: replace this with your headshot.

## Important content rule

Only markdown files with `personalized: true` appear in the homepage project and experience sections.

## Run locally

```bash
yarn
yarn develop
```

Then open `http://localhost:8000`.

## Publish to GitHub

Create a GitHub repository, then run:

```bash
git remote set-url origin YOUR_REPOSITORY_URL
git add .
git commit -m "Customize personal website"
git push -u origin main
```
