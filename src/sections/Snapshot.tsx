import type { ReactNode } from 'react';
import { Printer } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { snapshot, type SnapshotField } from '../data/snapshot';
import { site } from '../data/site';
import styles from './Snapshot.module.css';

/** A clearly-marked blank to be replaced with the team's own content. */
function Blank({ children, block = false }: { children: ReactNode; block?: boolean }) {
  return <span className={`${styles.blank} ${block ? styles.blankBlock : ''}`}>{children}</span>;
}

function Field({ field, block = true }: { field: SnapshotField; block?: boolean }) {
  return (
    <div className={styles.field}>
      <dt className={styles.fieldLabel}>{field.label}</dt>
      <dd className={styles.fieldValue}>
        <Blank block={block}>{field.placeholder}</Blank>{' '}
        <span className={styles.hint}>{field.hint}</span>
      </dd>
    </div>
  );
}

/** Print only the snapshot sheet (the rest of the page is hidden for the print run). */
function printSnapshot() {
  const root = document.documentElement;
  const cleanup = () => {
    root.classList.remove('print-snapshot');
    window.removeEventListener('afterprint', cleanup);
  };
  root.classList.add('print-snapshot');
  window.addEventListener('afterprint', cleanup);
  window.print();
}

export function Snapshot() {
  return (
    <section id="snapshot" className={styles.section} aria-labelledby="snapshot-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.aside}>
          <SectionHeader
            turn="05"
            label="One-Page Snapshot"
            titleId="snapshot-title"
            title={['The whole', 'business.', 'One page.']}
            layout="stack"
            size="compact"
            lede="This template shows what your one-page business snapshot must contain. Every dashed box is a placeholder for your own researched content. Nothing on it is real data."
          />

          <ol role="list" className={styles.steps} data-reveal="">
            <li>
              <span className={styles.stepNum}>01</span>{' '}
              Fill every field. No blanks, no "TBC".
            </li>
            <li>
              <span className={styles.stepNum}>02</span>{' '}
              Every number must trace back to your financial model.
            </li>
            <li>
              <span className={styles.stepNum}>03</span>{' '}
              Keep it to one page. If it doesn't fit, cut words, not facts.
            </li>
          </ol>

          <div className={styles.printBox} data-reveal="" data-print="hide">
            <button type="button" className="btn btn--primary" onClick={printSnapshot}>
              <Printer size={20} strokeWidth={2} aria-hidden="true" />
              Print / Save as PDF
            </button>
            <p className={styles.printNote}>
              Opens your browser's print dialog with just the template. Choose "Save as PDF" to keep a blank copy.
            </p>
          </div>
        </div>

        <article className={styles.sheet} data-print-sheet="" aria-labelledby="snapshot-sheet-title" data-reveal="">
          <header className={styles.sheetHead}>
            <div>
              <p className={styles.sheetKicker}>
                {site.eventName} · {site.eventType}
              </p>
              <h3 id="snapshot-sheet-title" className={styles.sheetTitle}>
                One-Page Business Snapshot
              </h3>
            </div>
            <dl className={styles.sheetMeta}>
              <div>
                <dt>Team</dt>
                <dd>
                  <Blank>No.</Blank>
                </dd>
              </div>
              <div>
                <dt>Challenge</dt>
                <dd>
                  <Blank>Name</Blank>
                </dd>
              </div>
            </dl>
          </header>

          <dl className={styles.identity}>
            <div className={styles.field}>
              <dt className={styles.fieldLabel}>{snapshot.name.label}</dt>
              <dd className={styles.brandName}>
                <Blank>{snapshot.name.placeholder}</Blank>
              </dd>
            </div>
            <div className={styles.field}>
              <dt className={styles.fieldLabel}>{snapshot.promise.label}</dt>
              <dd className={styles.fieldValue}>
                <Blank block>{snapshot.promise.placeholder}</Blank>{' '}
                <span className={styles.hint}>{snapshot.promise.hint}</span>
              </dd>
            </div>
          </dl>

          <dl className={styles.story}>
            {snapshot.story.map((field) => (
              <Field key={field.label} field={field} />
            ))}
          </dl>

          <dl className={styles.economics}>
            {snapshot.economics.map((field) => (
              <Field key={field.label} field={field} block={false} />
            ))}
          </dl>

          <dl className={styles.funding}>
            {snapshot.funding.map((field) => (
              <Field key={field.label} field={field} block={field.label !== 'Funding required'} />
            ))}
          </dl>

          <div className={styles.funds}>
            <p className={styles.fieldLabel} id="snapshot-funds-label">
              {snapshot.funds.label}
            </p>
            <table className={styles.table} aria-labelledby="snapshot-funds-label">
              <thead>
                <tr>
                  {snapshot.funds.columns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: snapshot.funds.rows }, (_, row) => (
                  <tr key={row}>
                    <td>
                      <Blank>Item</Blank>
                    </td>
                    <td>
                      <Blank>Amount</Blank>
                    </td>
                    <td>
                      <Blank>Milestone</Blank>
                    </td>
                    <td>
                      <Blank>{snapshot.funds.targetPlaceholder}</Blank>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <footer className={styles.sheetFoot}>
            <p>
              All values are placeholders. Replace each with your own figures and show the working in your financial
              model.
            </p>
            <p className={styles.titleBlock} aria-hidden="true">
              <span>Doc · Snapshot</span>
              <span>Rev A</span>
              <span>Sheet 1 / 1</span>
            </p>
          </footer>
        </article>
      </div>
    </section>
  );
}
