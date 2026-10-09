# Brand assets

The site picks these files up automatically at build time:

| File | Used for |
| --- | --- |
| `team-volante-logo.png` | Full supplied lockup (V emblem and tagline). Finale and footer. |
| `team-volante-mark.png` | The V emblem on its own. Navigation bar and hero. |

Both are scaled by height only, so their proportions never change. You can swap in `.svg` or `.webp`
versions with the same names.

These were produced from the logo supplied on 9 October 2026. That file arrived flattened onto a white
background (no transparency), so the white background was removed to restore transparency. Nothing else was
redrawn or recoloured.

If the original logo includes a white wordmark (for example "VOLANTE MOTORSPORTS" between the emblem and the
tagline), it did not survive the flattening. Export the original as a transparent PNG or SVG, save it here as
`team-volante-logo.png` (or `.svg`), and rebuild.
