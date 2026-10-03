HCM Trip PWA v0.8.2

Changes:
- Removed Schedule tab from home shortcuts and bottom navigation.
- Removed schedule page and schedule rendering code.
- Service Worker cache version bumped to v0.8.2.
- Network-first strategy for HTML, app.js, style.css, restaurants.js, shopping.js, and manifest.json.
- Old caches are automatically deleted on activation.
- skipWaiting() + clients.claim() allow new service workers to take control promptly.
- Data JS files are placed in repository root to match GitHub web upload workflow.

GitHub upload:
Upload ALL files/folders inside this directory to the repository root. Do not upload the ZIP itself.
