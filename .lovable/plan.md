# Fix: AI Music Generator example shows text instead of audio

## What's wrong

The two audio tracks are wired up correctly, but the AI Music Generator page has a "Hide sample media" setting switched on. With that on, the page skips the audio player entirely and only animates the written description — which is exactly what you're seeing.

## The fix

1. Turn off "Hide sample media" for the AI Music Generator so both example tabs show a real audio player.
2. Check whether the same setting was saved as an override in the content manager for this tool, and clear it there too if present, so the page setting actually takes effect.
3. Verify in the preview that both tabs ("Product ad bed" and "Course and podcast bed") show a play control and each plays its own distinct track.

## Technical notes

- `src/data/tools-platform.ts`: remove `hideDemoVideo: true` from the `ai-music-generator` entry.
- `src/routes/$slug.tsx` returns no demo media when `hideDemoVideo` is set, which is why `toolDemoMedia["ai-music-generator"]` (two `kind: "audio"` entries) is never passed to `AnimatedExample`.
- Confirm no CMS row for this tool sets `hideDemoVideo`; if one does, clear that field.
- No changes to the audio files, other tools, or unrelated copy.
