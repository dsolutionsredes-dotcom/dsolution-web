# Phase 33 - Process Steps Directus sync fix

Problem confirmed: Directus returns `process_steps.image` correctly and `/assets/{id}` opens in the browser, but the Home page still showed fallback content.

Fix:
- Added `/api/process-steps` Next.js route.
- The route fetches Directus server-side with `cache: no-store`.
- It requests `image.id` and returns a normalized `image_url` using the public Directus assets URL.
- `HomeClient` now fetches `/api/process-steps` from the same origin, avoiding browser CORS issues and stale fallback data.

Verification:
1. Deploy this ZIP.
2. Open `https://d-solution.org/api/process-steps`.
3. Confirm the JSON shows Directus titles and `image_url` values.
4. Change a title in Directus, refresh the page, and confirm it updates on the website.
