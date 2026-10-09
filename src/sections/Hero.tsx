import { ArrowDown, ArrowRight } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { PhotoImg } from '../components/PhotoImg';
import { challenges } from '../data/challenges';
import { media } from '../data/media';
import { site } from '../data/site';
import { cssVars } from '../lib/cssVars';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media} aria-hidden="true" data-print="hide">
        <PhotoImg photo={media.heroDust} sizes="100vw" priority className={styles.photo} />
        <div className={styles.scrim} />
      </div>
      <div className={`container ${styles.columns}`} aria-hidden="true" data-print="hide" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.topline}>
          <span className={styles.lights} aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} style={cssVars({ '--i': i })} />
            ))}
          </span>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowMain}>{site.eventType}</span>{' '}
            <span className={styles.eyebrowSub}>Organised by the {site.department}</span>
          </p>
          <div className={styles.host}>
            <span className="label">Presented by</span>
            <BrandLogo size="nav" />
          </div>
        </div>

        <h1 id="hero-title" className={styles.title}>
          <span className={styles.line} style={cssVars({ '--l': 0 })}>
            <span>Beyond</span>
          </span>{' '}
          <span className={`${styles.line} ${styles.lineIndent}`} style={cssVars({ '--l': 1 })}>
            <span>
              the Buggy<span className={styles.stop}>.</span>
            </span>
          </span>
        </h1>

        <div className={styles.lower}>
          <div className={styles.copy}>
            <p className={styles.lede}>Four teams. Four business ideas. One winning pitch.</p>
            <p className={styles.mantra}>
              <span>Think like founders.</span>{' '}
              <span>Build like engineers.</span>{' '}
              <span>Pitch like investors.</span>
            </p>
            <div className={styles.actions}>
              <a href="#challenges" className="btn btn--primary">
                Explore the Challenge
                <ArrowRight size={20} strokeWidth={2.25} className="nudge-x" aria-hidden="true" />
              </a>
              <a href="#deliverables" className="btn btn--ghost">
                View Submission Rules
                <ArrowDown size={18} strokeWidth={2.25} className="nudge-y" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav className={styles.grid} aria-labelledby="grid-title">
            <p id="grid-title" className={styles.gridTitle}>
              <span>Starting grid</span>{' '}
              <span className={styles.gridNote}>Challenges are pre-assigned</span>
            </p>
            <ol role="list" className={styles.slots}>
              {challenges.map((challenge, index) => (
                <li
                  key={challenge.id}
                  className={styles.slotItem}
                  style={cssVars({ '--accent': challenge.accent, '--s': index })}
                >
                  <a href={`#challenge-${challenge.id}`} className={styles.slot}>
                    <span className={styles.slotTeam}>Team {challenge.team}</span>{' '}
                    <span className={styles.slotName}>{challenge.name}</span>{' '}
                    <span className={styles.slotCat}>{challenge.category}</span>
                    <ArrowRight size={16} strokeWidth={2.25} className={styles.slotArrow} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
