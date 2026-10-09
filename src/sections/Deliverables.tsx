import { useEffect, useState } from 'react';
import { ArrowRight, Check, Lock, Plus, RotateCcw } from 'lucide-react';
import { Collapse } from '../components/Collapse';
import { SectionHeader } from '../components/SectionHeader';
import { deliverables, type Deliverable } from '../data/deliverables';
import { useChecklist } from '../hooks/useChecklist';
import styles from './Deliverables.module.css';

const STORAGE_KEY = 'tv-bic:deliverables:v1';
const deliverableIds = deliverables.map((d) => d.id);

interface ItemProps {
  item: Deliverable;
  done: boolean;
  open: boolean;
  onToggleDone: () => void;
  onToggleOpen: () => void;
}

function DeliverableItem({ item, done, open, onToggleDone, onToggleOpen }: ItemProps) {
  const detailId = `deliverable-${item.id}-detail`;
  const titleId = `deliverable-${item.id}-title`;

  return (
    <li className={styles.item} data-done={done || undefined}>
      <div className={styles.row}>
        <span className={styles.num} aria-hidden="true">
          {done ? <Check size={18} strokeWidth={3} /> : item.number}
        </span>

        <div className={styles.main}>
          <h3 id={titleId} className={styles.title}>
            {item.title}
          </h3>
          <p className={styles.summary}>{item.summary}</p>
          <p className={styles.meta}>
            <span className={styles.format}>
              <span className="visually-hidden">Format: </span>
              {item.format}
            </span>{' '}
            <span className={styles.lead}>
              {item.lead ? (
                <>
                  Lead · Member {item.lead.member}
                  <span className="visually-hidden">, {item.lead.role}</span>
                </>
              ) : (
                'Whole team'
              )}
            </span>
            {done ? <span className={styles.doneTag}>Done</span> : null}
          </p>
        </div>

        <div className={styles.controls}>
          <label className={styles.check}>
            <input type="checkbox" checked={done} onChange={onToggleDone} className={styles.checkInput} />
            <span className={styles.checkBox} aria-hidden="true">
              <Check size={16} strokeWidth={3} />
            </span>
            <span>
              Done<span className="visually-hidden">: {item.title}</span>
            </span>
          </label>
          <button
            type="button"
            className={styles.more}
            aria-expanded={open}
            aria-controls={detailId}
            onClick={onToggleOpen}
          >
            <span>
              Details<span className="visually-hidden"> for {item.title}</span>
            </span>
            <Plus size={18} strokeWidth={2} className={styles.moreIcon} aria-hidden="true" />
          </button>
        </div>
      </div>

      <Collapse id={detailId} open={open}>
        <div className={styles.detail}>
          <p className={styles.detailLabel}>Must include</p>
          <ul role="list" className={styles.contents}>
            {item.contents.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
          {item.note ? <p className={styles.note}>{item.note}</p> : null}
          <p className={styles.owner}>
            {item.lead
              ? `Led by Member ${item.lead.member}, ${item.lead.role}. The whole team contributes and must be able to explain it.`
              : 'Built by the whole team as evidence is gathered.'}
          </p>
          {item.related ? (
            <a href={`#${item.related.id}`} className="text-link">
              {item.related.label}
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </Collapse>
    </li>
  );
}

export function Deliverables() {
  const { done, toggle, clear, storage } = useChecklist(STORAGE_KEY, deliverableIds);
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set());
  const [confirming, setConfirming] = useState(false);

  const total = deliverableIds.length;
  const completed = deliverableIds.filter((id) => done[id]).length;
  const remaining = total - completed;
  const allOpen = openIds.size === total;

  useEffect(() => {
    if (!confirming) return;
    const timer = window.setTimeout(() => setConfirming(false), 4000);
    return () => window.clearTimeout(timer);
  }, [confirming]);

  const toggleOpen = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const onClear = () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    clear();
    setConfirming(false);
  };

  return (
    <section id="deliverables" className={styles.section} aria-labelledby="deliverables-title">
      <div className="container">
        <SectionHeader
          turn="04"
          label="Deliverables"
          titleId="deliverables-title"
          title={['No shortcuts.', 'Complete the package.']}
          lede="Ten deliverables make up a complete submission. Every team submits all ten. Missing items may incur penalties under the published rubric."
        />

        <div className={styles.layout}>
          <aside className={styles.status} aria-labelledby="package-status-title" data-print="hide">
            <div className={styles.statusInner}>
              <h3 id="package-status-title" className={styles.statusTitle}>
                Package status
              </h3>
              <p className={styles.count} aria-hidden="true">
                <span className={styles.countNum}>{String(completed).padStart(2, '0')}</span>
                <span className={styles.countOf}>/ {total}</span>
              </p>
              <div
                className={styles.bar}
                role="progressbar"
                aria-label="Deliverables marked done"
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuenow={completed}
                aria-valuetext={`${completed} of ${total} done`}
              >
                {deliverableIds.map((id, index) => (
                  <span key={id} className={styles.segment} data-on={index < completed || undefined} />
                ))}
              </div>
              <p className={styles.statusText} aria-live="polite">
                {completed === total
                  ? 'Package complete. Every deliverable is ticked.'
                  : `${completed} of ${total} done · ${remaining} to go`}
              </p>

              <p className={styles.privacy}>
                <Lock size={16} strokeWidth={2} aria-hidden="true" />
                <span>
                  {storage === 'unavailable'
                    ? 'This browser is not saving ticks, so they will reset when you leave the page. Nothing is sent anywhere.'
                    : 'Ticks are saved in this browser on this device only. They are not shared with your team or sent to the organisers.'}
                </span>
              </p>

              <div className={styles.statusActions}>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => setOpenIds(allOpen ? new Set() : new Set(deliverableIds))}>
                  {allOpen ? 'Collapse all' : 'Expand all'}
                </button>
                <button
                  type="button"
                  className={`btn btn--ghost btn--sm ${confirming ? styles.confirm : ''}`}
                  onClick={onClear}
                  disabled={completed === 0 && !confirming}
                >
                  <RotateCcw size={16} strokeWidth={2} aria-hidden="true" />
                  {confirming ? 'Confirm: clear all' : 'Clear ticks'}
                </button>
              </div>
            </div>
          </aside>

          <ol role="list" className={styles.list}>
            {deliverables.map((item) => (
              <DeliverableItem
                key={item.id}
                item={item}
                done={Boolean(done[item.id])}
                open={openIds.has(item.id)}
                onToggleDone={() => toggle(item.id)}
                onToggleOpen={() => toggleOpen(item.id)}
              />
            ))}
          </ol>

          {/* Small screens: progress stays pinned to the bottom while scrolling the list. */}
          <div className={styles.miniBar} aria-hidden="true" data-print="hide">
            <span className={styles.miniCount}>
              {String(completed).padStart(2, '0')}
              <span>/{total}</span>
            </span>
            <span className={styles.miniSegments}>
              {deliverableIds.map((id, index) => (
                <span key={id} className={styles.segment} data-on={index < completed || undefined} />
              ))}
            </span>
            <span className={styles.miniLabel}>Done</span>
          </div>
        </div>
      </div>
    </section>
  );
}
