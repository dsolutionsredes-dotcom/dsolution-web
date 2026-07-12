# Phase 27 notes

## Directus: Process Steps

The Home page now reads the collection `process_steps` when it exists and is publicly readable.

Recommended fields:

- `title` — string/input
- `description` — text/textarea
- `image` — image/file
- `icon` — string/input. Suggested values: `message`, `target`, `clapperboard`, `chart`
- `sort` — integer. Use 1, 2, 3, 4
- `is_published` — boolean/toggle

The frontend filters `is_published !== false`, sorts by `sort`, and falls back to the hardcoded process cards if Directus has no process items.

Public permissions required:

- `process_steps`: read
- `directus_files`: read

## Chatwoot local reset

A visible button “Nuevo chat / Soy otra persona” was added near the floating chat widgets.

It only calls:

```js
window.$chatwoot.reset();
```

It does not call the Chatwoot API and does not mark the conversation as resolved.

There is also a 30-minute frontend inactivity timeout that calls `window.$chatwoot.reset()` to free only the local browser session.

No private API tokens or HMAC secrets are exposed in the frontend.
