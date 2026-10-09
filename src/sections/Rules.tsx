import { Gavel } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { penaltyProvisions, rules } from '../data/rules';
import { cssVars } from '../lib/cssVars';
import styles from './Rules.module.css';

export function Rules() {
  return (
    <section id="rules" className={styles.section} aria-labelledby="rules-title">
      <div className="container">
        <SectionHeader
          turn="09"
          label="Rules & Expectations"
          titleId="rules-title"
          title={['Play fair.', 'Prove everything.']}
          lede="The regulations every team competes under. Read them as a team before Day 01."
        />

        <ol role="list" className={styles.articles}>
          {rules.map((rule, index) => (
            <li
              key={rule.title}
              className={styles.article}
              data-reveal=""
              style={cssVars({ '--reveal-delay': `${(index % 2) * 80}ms` })}
            >
              <span className={styles.art}>Art. {String(index + 1).padStart(2, '0')}</span>
              <h3 className={styles.title}>{rule.title}</h3>
              <p className={styles.text}>{rule.text}</p>
            </li>
          ))}
        </ol>

        {penaltyProvisions.length > 0 ? (
          <aside className={styles.penalties} aria-labelledby="penalties-title" data-reveal="">
            <span className={styles.penaltiesIcon}>
              <Gavel size={22} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div>
              <h3 id="penalties-title" className={styles.penaltiesTitle}>
                Penalties &amp; disqualification
              </h3>
              <ul role="list" className={styles.penaltyList}>
                {penaltyProvisions.map((provision) => (
                  <li key={provision}>{provision}</li>
                ))}
              </ul>
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
