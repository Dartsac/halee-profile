# Next steps

Open items from the November 2026 site update. Delete each item once it is done.

## 1. Domain is down (urgent)

`haleemccray.com` is no longer registered. The `.com` registry has no record of it, so the main site is unreachable. GitHub Pages still redirects to it, so `dartsac.github.io/halee-profile` is broken too.

The site itself deploys fine. The current version is live at https://haleemccray.netlify.app.

Pick one:

- **Register `haleedobson.com` (recommended).** It matches Halee's new name, and it was unregistered as of 2026-11-13. Point its DNS at GitHub Pages, then update the domain in the code (list below).
- **Re-register `haleemccray.com`.** Old links work again with no code changes. Registering both and redirecting the old domain to the new one keeps both benefits.
- **Use the Netlify address for now.** This needs the code updated to `haleemccray.netlify.app`.

Places the domain appears in the code: the `homepage` field in `package.json`, `cname` in `.github/workflows/deploy.yml`, `siteUrl` in `src/hooks/pageMetadata.json`, `public/index.html` (canonical and share tags), `public/robots.txt`, `public/_headers`, and `src/hooks/redirectLegacyHashUrl.js`, and two test files. `public/sitemap.xml` regenerates on build. Run `rg -i "haleemccray\.com"` to confirm.

## 2. Test the contact form for real

The automated tests never send a real email. Submit the form once on the live site and confirm the message reaches `haleemccray41@gmail.com`.

## 3. Halee's own updates

- Update her name in the resume's original Google Doc. The site's PDF was edited directly, so the next export from the Doc would bring back "McCray".
- Read the rewritten site copy, since it is in her voice.
- Check the email and SMS sample transcripts against her original copy.
- If her LinkedIn URL or email changes, update `src/components/Contact/index.js` and `src/components/Sidebar/index.js`.

## 4. Smaller fixes

- **GitHub Actions:** the workflows run on Node 18, which no longer gets security updates. Move them to Node 20 or later. GitHub also warns that `actions/checkout@v4` and `actions/setup-node@v4` are being retired, so upgrade those too. Moving to Node 20 also allows a newer `@playwright/test`, which is pinned to `~1.61.1` because of Node 18.
- **Blog posts:** each post shows its title twice as a main heading, once from the page and once from the markdown.
- **Projects page:** the E-Commerce card links to `/projects/ecom/` with a trailing slash. The other cards don't.
- **Blog tag filters:** they don't tell screen readers which tag is selected. Add `aria-pressed`.
- **Unused styles:** `animate.css` is imported in `src/App.scss` but appears unused.
- **Optional:** use sentence case for page headings, for example "About the project" instead of "About the Project".
