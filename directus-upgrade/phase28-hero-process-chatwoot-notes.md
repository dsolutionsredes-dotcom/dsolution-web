# Phase 28 notes

## Hero video from Directus
Home Page should include:
- `hero_video` (File, videos)
- `hero_video_poster` (Image, images)

The frontend prioritizes Directus media and falls back to `/hero-dsolution-loop.mp4` if empty.

## Process Steps from Directus
The home Process section reads `process_steps` with:
- `title`
- `description`
- `image`
- `icon`
- `sort`
- `is_published`

It requests `image.*`, sorts by `sort`, shows only published items, and falls back per card if a Directus item or image is missing.

Recommended icon values:
- `message`
- `target`
- `clapperboard`
- `chart`

Required public permissions:
- `process_steps`: Read
- `directus_files`: Read
- `home_page`: Read

## Chatwoot reset
The custom reset control is now smaller and positioned next to the floating chat group. It only calls `window.$chatwoot.reset()` and does not resolve conversations in Chatwoot.
