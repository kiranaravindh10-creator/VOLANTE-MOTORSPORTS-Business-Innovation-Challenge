import { TrendingDown, TrendingUp, UserX, Wallet } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { crisisScenarios, rubric, rubricMax, rubricTotal, type CrisisIcon } from '../data/judging';
import { cssVars } from '../lib/cssVars';
import styles from './Judging.module.css';

const crisisIcons: Record<CrisisIcon, typeof TrendingUp> = {
  cost: TrendingUp,
  reject: UserX,
  undercut: TrendingDown,
  budget: Wallet,
};

const crisisCriterion = rubric.find((criterion) => /crisis/i.test(criterion.label));

export function Judging() {
  return (
    <section id="judging" className={styles.section} aria-labelledby="judging-title">
      <div className="container">
        <SectionHeader
          turn="08"
          label="Judging"
          titleId="judging-title"
          title={['Ideas are easy.', 'Proof is everything.']}
          lede={`Your team is scored out of ${rubricTotal} across ${rubric.length} criteria. Every point is earned with evidence.`}
        />

        {/* Proportional overview of where the points are. */}
        <div className={styles.overview} aria-hidden="true" data-reveal="">
          {rubric.map((criterion) => (
            <span
              key={criterion.number}
              className={styles.chunk}
              data-heavy={criterion.points === rubricMax || undefined}
              style={cssVars({ '--w': criterion.points })}
            >
              <span className={styles.chunkNum}>{criterion.number}</span>
              <span className={styles.chunkPts}>{criterion.points}</span>
            </span>
          ))}
        </div>
        <p className={styles.scale} aria-hidden="true">
          <span>0</span>
          <span>{rubricTotal} pts</span>
        </p>

        <div className={styles.layout}>
          <div className={styles.scorecard}>
            <div className={styles.scoreHead} aria-hidden="true">
              <span>#</span>
              <span>Criterion</span>
              <span className={styles.headWeight}>Weight</span>
              <span>Points</span>
            </div>
            <ol role="list" className={styles.rows}>
              {rubric.map((criterion, index) => (
                <li
                  key={criterion.number}
                  className={styles.row}
                  data-heavy={criterion.points === rubricMax || undefined}
                  data-reveal=""
                  style={cssVars({ '--reveal-delay': `${index * 40}ms` })}
                >
                  <span className={styles.rowNum} aria-hidden="true">
                    {criterion.number}
                  </span>
                  <span className={styles.rowLabel}>{criterion.label}</span>
                  <span className={styles.pips} aria-hidden="true">
                    {Array.from({ length: rubricMax }, (_, pip) => (
                      <span key={pip} data-on={pip < criterion.points || undefined} />
                    ))}
                  </span>
                  <span className={styles.rowPts}>
                    {criterion.points}
                    <span className={styles.ptsUnit} aria-hidden="true">
                      pts
                    </span>
                    <span className="visually-hidden"> points</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className={styles.total}>
              <span>Total</span>{' '}
              <span className={styles.totalNum}>
                {rubricTotal}
                <span className={styles.ptsUnit} aria-hidden="true">
                  pts
                </span>
                <span className="visually-hidden"> points</span>
              </span>
            </p>
          </div>

          <aside className={styles.crisis} aria-labelledby="crisis-title" data-reveal="">
            <div className={styles.flag} aria-hidden="true" />
            <div className={styles.crisisBody}>
              <p className={styles.rc}>Race control · Final event</p>
              <h3 id="crisis-title" className={styles.crisisTitle}>
                Surprise crisis challenge
              </h3>
              <p className={styles.crisisIntro}>
                A separate round at the final event: your team is handed an unexpected scenario and must respond on
                the spot. Possible scenarios include:
              </p>
              <ul role="list" className={styles.scenarios}>
                {crisisScenarios.map((scenario) => {
                  const Icon = crisisIcons[scenario.icon];
                  return (
                    <li key={scenario.title}>
                      <span className={styles.scIcon}>
                        <Icon size={20} strokeWidth={2} aria-hidden="true" />
                      </span>
                      <span>
                        <span className={styles.scTitle}>{scenario.title}</span>{' '}
                        <span className={styles.scDetail}>{scenario.detail}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              {crisisCriterion ? (
                <p className={styles.scored}>
                  Scored under <strong>{crisisCriterion.label}</strong> ({crisisCriterion.points} points).
                </p>
              ) : null}
              <p className={styles.prep}>
                <strong>Prepare now:</strong> stress-test your financial model. Know your margins, your alternative
                suppliers, and which costs you could cut.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
