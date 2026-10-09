import { Fragment, type ReactNode } from 'react';
import { cssVars } from '../lib/cssVars';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  /** Wayfinding number. Sections are "turns" on the lap from grid to finish. */
  turn: string;
  label: string;
  titleId: string;
  /** Each entry renders as its own line at large sizes. */
  title: string[];
  lede?: ReactNode;
  layout?: 'stack' | 'split';
  /** `compact` suits headers that sit in a narrow column. */
  size?: 'full' | 'compact';
}

export function SectionHeader({ turn, label, titleId, title, lede, layout = 'split', size = 'full' }: SectionHeaderProps) {
  const classes = [styles.header, layout === 'split' ? styles.split : '', size === 'compact' ? styles.compact : '']
    .filter(Boolean)
    .join(' ');
  return (
    <header className={classes}>
      <p className={styles.meta} data-reveal="fade">
        <span className={styles.turn}>Turn {turn}</span>{' '}
        <span className={styles.sep} aria-hidden="true">
          /
        </span>{' '}
        <span className={styles.label}>{label}</span>
        <span className={styles.rule} aria-hidden="true" />
      </p>
      <h2 id={titleId} className={styles.title} data-reveal="">
        {title.map((line, index) => (
          <Fragment key={line}>
            {index > 0 ? ' ' : null}
            <span className={styles.line}>{line}</span>
          </Fragment>
        ))}
      </h2>
      {lede ? (
        <p className={styles.lede} data-reveal="" style={cssVars({ '--reveal-delay': '120ms' })}>
          {lede}
        </p>
      ) : null}
    </header>
  );
}
