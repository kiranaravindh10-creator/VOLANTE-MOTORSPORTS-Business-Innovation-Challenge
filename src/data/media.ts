/**
 * Photography. All images are from Unsplash and used under the Unsplash License
 * (free for commercial and non-commercial use, no permission needed). Credits are
 * shown in the footer as a courtesy. Files live in src/assets/images, pre-sized
 * and converted to WebP; Vite fingerprints them for safe long-term caching.
 */

const files = import.meta.glob<string>('../assets/images/*.webp', { eager: true, query: '?url', import: 'default' });

function url(file: string): string {
  const resolved = files[`../assets/images/${file}`];
  if (!resolved) throw new Error(`Missing image: src/assets/images/${file}`);
  return resolved;
}

export interface Credit {
  photographer: string;
  profileUrl: string;
  photoUrl: string;
}

export interface Photo {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  /** Empty string = decorative (background atmosphere only). */
  alt: string;
  credit: Credit;
  /** Optional portrait crop served to tall, narrow screens. */
  portrait?: { srcSet: string; width: number; height: number };
}

const set = (base: string, widths: number[]) => widths.map((w) => `${url(`${base}-${w}.webp`)} ${w}w`).join(', ');

export const media = {
  heroDust: {
    src: url('hero-dust-1600.webp'),
    srcSet: set('hero-dust', [960, 1600, 2400]),
    width: 1600,
    height: 1067,
    alt: '',
    portrait: { srcSet: set('hero-dust-portrait', [800, 1200]), width: 1200, height: 1600 },
    credit: {
      photographer: 'Mike Newbry',
      profileUrl: 'https://unsplash.com/@mikenewbry',
      photoUrl: 'https://unsplash.com/photos/1C-UpeGrgoA',
    },
  },
  missionBuggy: {
    src: url('mission-buggy-1400.webp'),
    srcSet: set('mission-buggy', [800, 1400]),
    width: 1400,
    height: 933,
    alt: 'A driver in a helmet steering a tube-frame off-road buggy across a dirt track.',
    credit: {
      photographer: 'Kirill Sh',
      profileUrl: 'https://unsplash.com/@kirill2020',
      photoUrl: 'https://unsplash.com/photos/r7IXFwpGsNg',
    },
  },
  pitbox: {
    src: url('pitbox-1280.webp'),
    srcSet: set('pitbox', [720, 1280]),
    width: 1280,
    height: 800,
    alt: 'A tool tray overflowing with loose, unsorted spanners and wrenches.',
    credit: {
      photographer: 'Alexander Schimmeck',
      profileUrl: 'https://unsplash.com/@alschim',
      photoUrl: 'https://unsplash.com/photos/1N5jjLyBafc',
    },
  },
  partspulse: {
    src: url('partspulse-1280.webp'),
    srcSet: set('partspulse', [720, 1280]),
    width: 1280,
    height: 800,
    alt: 'A dense pile of assorted gears, sprockets and mechanical components.',
    credit: {
      photographer: 'Pavel Neznanov',
      profileUrl: 'https://unsplash.com/@npi',
      photoUrl: 'https://unsplash.com/photos/w95Fb7EEcjE',
    },
  },
  sponsorgrid: {
    src: url('sponsorgrid-1280.webp'),
    srcSet: set('sponsorgrid', [720, 1280]),
    width: 1280,
    height: 800,
    alt: 'A camera operator filming a trackside crowd at a motorsport event.',
    credit: {
      photographer: 'PJ Wallace',
      profileUrl: 'https://unsplash.com/@pjdoesvideo',
      photoUrl: 'https://unsplash.com/photos/30oAlZM0LVs',
    },
  },
  redrive: {
    src: url('redrive-1280.webp'),
    srcSet: set('redrive', [720, 1280]),
    width: 1280,
    height: 800,
    alt: 'Stacks of worn, discarded vehicle tyres.',
    credit: {
      photographer: 'engin akyurt',
      profileUrl: 'https://unsplash.com/@enginakyurt',
      photoUrl: 'https://unsplash.com/photos/KEaZffWNhyM',
    },
  },
  finaleSparks: {
    src: url('finale-sparks-1600.webp'),
    srcSet: set('finale-sparks', [960, 1600, 2400]),
    width: 1600,
    height: 1067,
    alt: '',
    credit: {
      photographer: 'Josh Beech',
      profileUrl: 'https://unsplash.com/@ig_joshabeech',
      photoUrl: 'https://unsplash.com/photos/tXJhAFVOHVk',
    },
  },
} satisfies Record<string, Photo>;

export const photoCredits: Credit[] = Object.values(media).map((photo) => photo.credit);
