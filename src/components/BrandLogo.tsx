import styles from './BrandLogo.module.css';

/**
 * Official brand assets, picked up automatically from src/assets/brand/:
 *  - team-volante-logo.(svg|png|webp)  full supplied lockup (V emblem + tagline)
 *  - team-volante-mark.(svg|png|webp)  the V emblem on its own, for compact spaces
 * Both are scaled by height only, so their proportions are never changed.
 */
const pick = (files: Record<string, string>) => Object.values(files)[0] ?? null;

export const logoSrc = pick(
  import.meta.glob<string>('../assets/brand/team-volante-logo.{svg,png,webp}', { eager: true, query: '?url', import: 'default' }),
);
export const markSrc = pick(
  import.meta.glob<string>('../assets/brand/team-volante-mark.{svg,png,webp}', { eager: true, query: '?url', import: 'default' }),
);

const NAME = 'Team Volante Motorsports';

type LogoSize = 'nav' | 'feature' | 'footer';

interface BrandLogoProps {
  size?: LogoSize;
  /** Set when the surrounding link already names the brand, to avoid announcing it twice. */
  decorative?: boolean;
}

export function BrandLogo({ size = 'nav', decorative = false }: BrandLogoProps) {
  // Larger placements show the full supplied lockup.
  if (size !== 'nav' && logoSrc) {
    return (
      <img
        src={logoSrc}
        alt={decorative ? '' : `${NAME}. Fueled by passion. Driven to win.`}
        className={`${styles.lockup} ${styles[size]}`}
        decoding="async"
      />
    );
  }

  // Compact placements: the V emblem beside the team name.
  return (
    <span
      className={`${styles.compact} ${styles[size]}`}
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': NAME })}
    >
      {markSrc ? <img src={markSrc} alt="" className={styles.mark} decoding="async" /> : null}
      <span className={styles.wordmark}>
        <span className={styles.team}>Team Volante</span>{' '}
        <span className={styles.sub}>Motorsports</span>
      </span>
    </span>
  );
}
