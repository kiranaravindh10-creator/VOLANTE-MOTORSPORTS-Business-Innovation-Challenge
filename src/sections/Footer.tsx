import { ArrowUp } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { photoCredits } from '../data/media';
import { allSections, site } from '../data/site';
import styles from './Footer.module.css';

const briefLinks = allSections.slice(0, 5);
const competeLinks = allSections.slice(5);

export function Footer() {
  return (
    <footer id="site-footer" className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <BrandLogo size="footer" />
            <p className={styles.event}>
              {site.eventName}: {site.eventType}
            </p>
            <p className={styles.org}>
              Organised by the {site.department}, {site.organisation}.
            </p>
          </div>

          <nav className={styles.nav} aria-label="Footer" data-print="hide">
            <div>
              <p className={styles.colTitle}>The brief</p>
              <ul role="list" className={styles.links}>
                {briefLinks.map((link) => (
                  <li key={link.id}>
                    <a href={`#${link.id}`}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={styles.colTitle}>Prepare &amp; compete</p>
              <ul role="list" className={styles.links}>
                {competeLinks.map((link) => (
                  <li key={link.id}>
                    <a href={`#${link.id}`}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className={styles.notes}>
            <p className={styles.colTitle}>Good to know</p>
            <ul role="list" className={styles.noteList}>
              <li>Nothing is submitted from this site. Checklist ticks stay in your own browser.</li>
              <li>Business Pitch Day is 22 October 2026. The other timeline milestones are suggestions.</li>
              <li>Figures on the snapshot template are placeholders, not data.</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {site.organisation}</p>
          <p className={styles.credits}>
            Photography via{' '}
            <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">
              Unsplash
            </a>
            :{' '}
            {photoCredits.map((credit, index) => (
              <span key={credit.photoUrl}>
                <a href={credit.photoUrl} target="_blank" rel="noopener noreferrer">
                  {credit.photographer}
                </a>
                {index < photoCredits.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
          <a href="#top" className={styles.toTop} data-print="hide">
            Back to top
            <ArrowUp size={16} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
