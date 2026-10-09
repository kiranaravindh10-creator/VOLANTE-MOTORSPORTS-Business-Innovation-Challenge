import { TriangleAlert } from 'lucide-react';
import { PhotoImg } from '../components/PhotoImg';
import { SectionHeader } from '../components/SectionHeader';
import { media } from '../data/media';
import { cssVars } from '../lib/cssVars';
import styles from './Mission.module.css';

const demands = [
  'Identify a genuine customer problem.',
  'Develop a product or service.',
  'Validate market demand.',
  'Build a realistic financial model.',
  'Create a brand and marketing strategy.',
  'Demonstrate a proof of concept.',
  'Defend your business decisions before a judging panel.',
];

export function Mission() {
  return (
    <section id="overview" className={styles.section} aria-labelledby="overview-title">
      <div className="container">
        <SectionHeader
          turn="01"
          label="Overview"
          titleId="overview-title"
          title={["This isn't just", 'a presentation.']}
          lede="It's a business. Each team must create a commercially viable product or service that solves a real problem in the motorsports ecosystem or a related market."
        />

        <div className={styles.body}>
          <div className={styles.intro}>
            <p className={styles.lead} data-reveal="">
              You will research a real problem, build a proof of concept, model the finances and defend every
              decision before a judging panel, the way founders pitch to investors.
            </p>

            <aside className={styles.warning} data-reveal="" aria-label="Important">
              <TriangleAlert size={22} strokeWidth={2} aria-hidden="true" className={styles.warningIcon} />
              <p>
                <strong>Looks alone won't score.</strong> A visually attractive presentation without research and
                commercial logic is insufficient.
              </p>
            </aside>

            <figure className={styles.figure} data-reveal="">
              <div className={styles.frame}>
                <PhotoImg
                  photo={media.missionBuggy}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className={styles.photo}
                />
              </div>
              <figcaption className={styles.caption}>
                <span className={styles.fig}>Fig. 01</span>{' '}
                The buggy is where you start, not what you sell.
              </figcaption>
            </figure>
          </div>

          <div className={styles.demands}>
            <h3 className={styles.demandsTitle} data-reveal="fade">
              The challenge requires you to
            </h3>
            <ol role="list">
              {demands.map((item, index) => (
                <li
                  key={item}
                  className={styles.item}
                  data-reveal=""
                  style={cssVars({ '--reveal-delay': `${index * 60}ms` })}
                >
                  <span className={styles.num} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.itemText}>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className={styles.stats} aria-label="The competition in numbers">
          <div className={styles.equation} data-reveal="">
            <p className={styles.stat}>
              <span className={styles.statNum}>4</span>{' '}
              <span className={styles.statLabel}>Teams</span>
            </p>
            <span className={styles.op} aria-hidden="true">
              ×
            </span>
            <p className={styles.stat}>
              <span className={styles.statNum}>3</span>{' '}
              <span className={styles.statLabel}>Members per team</span>
            </p>
            <span className={styles.op} aria-hidden="true">
              =
            </span>
            <p className={`${styles.stat} ${styles.statTotal}`}>
              <span className={styles.statNum}>12</span>{' '}
              <span className={styles.statLabel}>Participants</span>
            </p>
          </div>
          <div className={styles.pair}>
            <p className={styles.wide} data-reveal="">
              <span className={styles.statNum}>10</span>{' '}
              <span className={styles.statLabel}>
                Day suggested
                <br />
                preparation schedule
              </span>
            </p>
            <p className={styles.wide} data-reveal="" style={cssVars({ '--reveal-delay': '100ms' })}>
              <span className={styles.statNum}>100</span>{' '}
              <span className={styles.statLabel}>
                Point judging
                <br />
                system
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
