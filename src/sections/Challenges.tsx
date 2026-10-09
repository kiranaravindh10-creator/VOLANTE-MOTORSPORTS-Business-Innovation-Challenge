import { useEffect, useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Collapse } from '../components/Collapse';
import { Motif } from '../components/Motif';
import { PhotoImg } from '../components/PhotoImg';
import { SectionHeader } from '../components/SectionHeader';
import { challenges, type Challenge } from '../data/challenges';
import { cssVars } from '../lib/cssVars';
import styles from './Challenges.module.css';

function ChallengeCard({ challenge, index }: { challenge: Challenge; index: number }) {
  const [open, setOpen] = useState(false);
  const cardId = `challenge-${challenge.id}`;
  const titleId = `${cardId}-title`;
  const detailId = `${cardId}-detail`;

  // Arriving from the hero's starting grid (e.g. #challenge-pitbox) opens that brief.
  useEffect(() => {
    const openIfTargeted = () => {
      if (window.location.hash === `#${cardId}`) setOpen(true);
    };
    openIfTargeted();
    window.addEventListener('hashchange', openIfTargeted);
    return () => window.removeEventListener('hashchange', openIfTargeted);
  }, [cardId]);

  return (
    <article
      id={cardId}
      className={styles.card}
      aria-labelledby={titleId}
      data-open={open || undefined}
      data-reveal=""
      style={cssVars({ '--accent': challenge.accent, '--reveal-delay': `${(index % 2) * 120}ms` })}
    >
      <div className={styles.media}>
        <PhotoImg photo={challenge.image} sizes="(min-width: 960px) 46vw, 100vw" className={styles.photo} />
        <span className={styles.tint} aria-hidden="true" />
        <span className={styles.shade} aria-hidden="true" />
        <div className={styles.mediaTop}>
          <span className={styles.teamTag}>Team {challenge.team}</span>
          <span className={styles.motif}>
            <Motif type={challenge.motif} />
          </span>
        </div>
        <span className={styles.bigNum} aria-hidden="true">
          {challenge.team}
        </span>
      </div>

      <div className={styles.body}>
        <p className={styles.kicker}>
          <span>Challenge {challenge.team}</span>{' '}
          <span className={styles.category}>{challenge.category}</span>
        </p>
        <h3 id={titleId} className={styles.title}>
          {challenge.name}
        </h3>

        <p className={styles.fieldLabel}>The problem</p>
        <p className={styles.problem}>{challenge.problem}</p>

        <div className={styles.question}>
          <p className={styles.fieldLabel}>Primary business question</p>
          <p className={styles.questionText}>{challenge.question}</p>
        </div>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={detailId}
          onClick={() => setOpen((value) => !value)}
        >
          <span>
            {open ? 'Hide challenge' : 'View challenge'}
            <span className="visually-hidden">: {challenge.name}</span>
          </span>
          <Plus size={22} strokeWidth={2} className={styles.toggleIcon} aria-hidden="true" />
        </button>

        <Collapse id={detailId} open={open}>
          <div className={styles.detail}>
            <div>
              <h4 className={styles.fieldLabel}>Core objective</h4>
              <p className={styles.objective}>{challenge.objective}</p>
            </div>
            <div>
              <h4 className={styles.fieldLabel}>Required proof of concept</h4>
              <ul role="list" className={styles.proof}>
                {challenge.proof.map((item) => (
                  <li key={item}>
                    <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Collapse>
      </div>
    </article>
  );
}

export function Challenges() {
  return (
    <section id="challenges" className={styles.section} aria-labelledby="challenges-title">
      <div className="container">
        <SectionHeader
          turn="02"
          label="Challenges"
          titleId="challenges-title"
          title={['Four teams.', 'Four briefs.']}
          lede="Every team has already been assigned its challenge, so your brief is fixed. Your job is to turn it into a business worth backing."
        />
        <div className={styles.grid}>
          {challenges.map((challenge, index) => (
            <ChallengeCard key={challenge.id} challenge={challenge} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
