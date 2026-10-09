import type { ReactNode } from 'react';
import styles from './Collapse.module.css';

interface CollapseProps {
  id: string;
  open: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Animated disclosure region. Pair with a button that has
 * `aria-expanded` and `aria-controls={id}`. Closed content is `inert`, so it
 * is skipped by keyboard and assistive tech; it is always expanded in print.
 */
export function Collapse({ id, open, children, className }: CollapseProps) {
  return (
    <div id={id} className={`${styles.collapse} ${className ?? ''}`} data-collapse="" data-open={open || undefined}>
      <div className={styles.inner} inert={!open}>
        {children}
      </div>
    </div>
  );
}
