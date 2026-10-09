import { CalendarClock } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { phases, timeline } from '../data/timeline';
import { cssVars } from '../lib/cssVars';
import styles from './Timeline.module.css';

export function Timeline() {
  return (
    <section id="timeline" className={styles.section} aria-labelledby="timeline-title">
      <div className="container">
        <SectionHeader
          turn="07"
          label="Timeline"
          titleId="timeline-title"
          title={['Ten days', 'to pitch day.']}
          lede="A suggested pace for your team: what to finish each day, so nothing is left for the last night."
        />

        <div className={styles.phases} aria-hidden="true">
          {phases.map((phase) => (
            <span key={phase.name} className={styles.phase} style={{ gridColumn: `${phase.from} / ${phase.to + 1}` }}>
              {phase.name}
            </span>
          ))}
        </div>

        <ol role="list" className={styles.track}>
          {timeline.map((day, index) => (
            <li
              key={day.day}
              className={styles.day}
              data-final={index === timeline.length - 1 || undefined}
              data-reveal=""
              style={cssVars({ '--reveal-delay': `${(index % 5) * 70}ms` })}
            >
              <span className={styles.node} aria-hidden="true" />
              <p className={styles.dayLabel}>
                <span className={styles.dayWord}>Day</span>{' '}
                <span className={styles.dayNum}>{day.day}</span>
              </p>
              <p className={styles.dayPhase}>{day.phase}</p>
              <h3 className={styles.dayTitle}>{day.title}</h3>
              {day.date ? (
                <p className={styles.dayDate}>
                  <time dateTime={day.date.iso}>{day.date.label}</time>
                </p>
              ) : null}
            </li>
          ))}
        </ol>

        <p className={styles.disclaimer}>
          <CalendarClock size={20} strokeWidth={1.75} aria-hidden="true" />
          <span>
            <strong>Business Pitch Day is on 22 October 2026.</strong> Days 01 to 09 are suggested milestones to
            pace your team, not deadlines.
          </span>
        </p>
      </div>
    </section>
  );
}
