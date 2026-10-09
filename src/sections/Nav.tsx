import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { ArrowRight } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { useActiveSection } from '../hooks/useActiveSection';
import { allSections, navItems, navParent, site, trackedSections, type SectionId } from '../data/site';
import styles from './Nav.module.css';

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const active = useActiveSection(trackedSections) as SectionId | null;
  const activeNav = active ? (navParent[active] ?? active) : null;

  // Solid bar once the page leaves the top, plus a reading-progress line.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progressRef.current?.style.setProperty('--progress', progress.toFixed(4));
      setScrolled(window.scrollY > 24);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  // While the mobile menu is open the page behind it is inert and can't scroll.
  useEffect(() => {
    if (!open) return;
    const behind = [document.getElementById('main'), document.getElementById('site-footer')];
    behind.forEach((el) => el?.setAttribute('inert', ''));
    document.documentElement.setAttribute('data-menu-open', '');
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onBreakpoint);

    return () => {
      behind.forEach((el) => el?.removeAttribute('inert'));
      document.documentElement.removeAttribute('data-menu-open');
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [open]);

  // Restore the page synchronously so the link's own jump lands on live content.
  const closeForNavigation = () => flushSync(() => setOpen(false));

  return (
    <header className={styles.nav} data-scrolled={scrolled || open || undefined} data-print="hide">
      <div className={`container ${styles.bar}`}>
        <a href="#top" className={styles.brand} aria-label={`${site.organisation}, back to top`}>
          <BrandLogo size="nav" decorative />
        </a>

        <nav className={styles.primary} aria-label="Primary">
          <ul role="list" className={styles.links}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={styles.link}
                  aria-current={activeNav === item.id ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#overview" className={`btn btn--primary btn--sm ${styles.cta}`}>
          Read the Brief
          <ArrowRight size={18} strokeWidth={2.25} className="nudge-x" aria-hidden="true" />
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className={styles.toggleText}>{open ? 'Close' : 'Menu'}</span>
          <span className={styles.burger} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <span ref={progressRef} className={styles.progress} aria-hidden="true" />

      <div id="site-menu" ref={panelRef} className={styles.panel} data-open={open || undefined} inert={!open}>
        <nav aria-label="All sections">
          <ol role="list" className={styles.menuList}>
            {allSections.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={styles.menuLink}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={closeForNavigation}
                >
                  <span className={styles.menuNum} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className={styles.menuFoot}>
          <a href="#overview" className="btn btn--primary" onClick={closeForNavigation}>
            Read the Brief
            <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
          </a>
          <p className="label">
            {site.eventName} · {site.eventType}
          </p>
        </div>
      </div>
    </header>
  );
}
