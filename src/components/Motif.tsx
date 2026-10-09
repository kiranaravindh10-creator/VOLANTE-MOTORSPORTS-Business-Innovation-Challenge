import type { ChallengeMotif } from '../data/challenges';

/** Small technical glyphs that give each challenge its own livery mark. */
const matrix = ['11101', '10101', '11100', '00011', '10110'];

export function Motif({ type }: { type: ChallengeMotif }) {
  switch (type) {
    // Hazard stripes: workshop floor markings (PITBOX).
    case 'hazard':
      return (
        <svg viewBox="0 0 72 18" width="72" height="18" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <path key={i} d={`M${i * 12 - 9} 18 L${i * 12} 0 H${i * 12 + 6} L${i * 12 - 3} 18 Z`} fill="currentColor" />
          ))}
        </svg>
      );
    // Data-matrix code: scanning parts (PARTSPULSE).
    case 'matrix':
      return (
        <svg viewBox="0 0 25 25" width="28" height="28" aria-hidden="true">
          {matrix.flatMap((row, y) =>
            [...row].map((cell, x) =>
              cell === '1' ? <rect key={`${x}-${y}`} x={x * 5} y={y * 5} width="4" height="4" fill="currentColor" /> : null,
            ),
          )}
        </svg>
      );
    // Sponsor panel grid: inventory of brand placements (SPONSORGRID).
    case 'grid':
      return (
        <svg viewBox="0 0 41 27" width="44" height="29" fill="none" aria-hidden="true">
          {[0, 1, 2].flatMap((x) =>
            [0, 1].map((y) => (
              <rect
                key={`${x}-${y}`}
                x={x * 14 + 0.75}
                y={y * 13.5 + 0.75}
                width="11.5"
                height="11"
                stroke="currentColor"
                strokeWidth="1.5"
                fill={x === 2 && y === 0 ? 'currentColor' : 'none'}
              />
            )),
          )}
        </svg>
      );
    // Closed loop: circular economy (RE:DRIVE).
    case 'loop':
      return (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M26 16a10 10 0 0 1-17.6 6.5" />
          <path d="M6 16A10 10 0 0 1 23.6 9.5" />
          <path d="M24.5 4.5v5.5H19" />
          <path d="M7.5 27.5V22H13" />
        </svg>
      );
  }
}
