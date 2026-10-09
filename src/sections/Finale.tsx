import { ArrowRight, ArrowUp, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { PhotoImg } from '../components/PhotoImg';
import { media } from '../data/media';
import { site } from '../data/site';
import { cssVars } from '../lib/cssVars';
import styles from './Finale.module.css';

const steps = [
  { verb: 'Research', rest: 'the problem.' },
  { verb: 'Engineer', rest: 'the solution.' },
  { verb: 'Prove', rest: 'the business.' },
  { verb: 'Own', rest: 'the pitch.' },
];

export function Finale() {
  return (
    <section id="finish" className={styles.section} aria-labelledby="finish-title">
      <div className={styles.media} aria-hidden="true" data-print="hide">
        <PhotoImg photo={media.finaleSparks} sizes="100vw" className={styles.photo} />
        <div className={styles.scrim} />
      </div>

      <div className="container">
        <p className={styles.flagRow} data-reveal="fade">
          <span className={styles.checker} aria-hidden="true" />
          Finish
        </p>
        <h2 id="finish-title" className={styles.title} data-reveal="">
          <span>Build something</span>{' '}
          <span>
            worth backing<span className={styles.stop}>.</span>
          </span>
        </h2>

        <ol role="list" className={styles.steps}>
          {steps.map((step, index) => (
            <li
              key={step.verb}
              className={styles.step}
              data-reveal=""
              style={cssVars({ '--reveal-delay': `${index * 90}ms` })}
            >
              <span className={styles.stepNum} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={styles.stepText}>
                <strong>{step.verb}</strong> {step.rest}
              </span>
            </li>
          ))}
        </ol>

        <div className={styles.actions} data-reveal="" data-print="hide">
          <a href="#deliverables" className="btn btn--primary">
            Review All Deliverables
            <ArrowRight size={20} strokeWidth={2.25} className="nudge-x" aria-hidden="true" />
          </a>
          <a href="#challenges" className="btn btn--ghost">
            Return to Challenges
            <ArrowUp size={18} strokeWidth={2.25} aria-hidden="true" />
          </a>
        </div>

        <div className={styles.submission} data-reveal="">
          {site.submissionUrl ? (
            <a className={styles.submitLink} href={site.submissionUrl} target="_blank" rel="noopener noreferrer">
              <span className={styles.submitLabel}>Submission</span>{' '}
              <span className={styles.submitText}>{site.submissionLabel}</span>
              <ArrowUpRight size={20} strokeWidth={2} aria-hidden="true" />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          ) : (
            <p className={styles.pending}>
              <span className={styles.pendingDot} aria-hidden="true" />
              <span className={styles.submitLabel}>Submission link</span>{' '}
              <span className={styles.submitText}>
                Not published yet. The organisers will share where to submit.
              </span>
            </p>
          )}
        </div>

        <div className={styles.host}>
          <span className="label">Presented by</span>
          <BrandLogo size="feature" />
        </div>
      </div>
    </section>
  );
}
