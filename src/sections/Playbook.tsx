import { useId, useState } from 'react';
import { FileSearch, RotateCcw, Siren } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { crisisRound, eventFormat, formulaKey, formulas, slides } from '../data/pitch';
import { cssVars } from '../lib/cssVars';
import styles from './Playbook.module.css';

const totalMinutes = eventFormat.reduce((sum, segment) => sum + segment.minutes, 0);
const pitchMinutes = eventFormat[0]?.minutes ?? 0;
const secondsPerSlide = Math.round((pitchMinutes * 60) / slides.length);

function FormatChart() {
  let elapsed = 0;
  const ticks = [0, ...eventFormat.map((segment) => (elapsed += segment.minutes))];

  return (
    <div className={styles.format} data-reveal="">
      <div className={styles.blockHead}>
        <h3 className={styles.blockTitle}>Recommended final event format</h3>
        <p className={styles.blockMeta}>{totalMinutes} minutes on stage + a separate crisis round</p>
      </div>

      <div className={styles.bars} aria-hidden="true">
        {eventFormat.map((segment) => (
          <span key={segment.label} className={styles.bar} data-tone={segment.tone} style={cssVars({ '--grow': segment.minutes })} />
        ))}
      </div>
      <div className={styles.ticks} aria-hidden="true">
        {ticks.map((minute) => (
          <span key={minute} style={cssVars({ '--at': minute / totalMinutes })}>
            {minute}:00
          </span>
        ))}
      </div>

      <ol role="list" className={styles.segments}>
        {eventFormat.map((segment) => (
          <li key={segment.label} className={styles.segment} data-tone={segment.tone} style={cssVars({ '--grow': segment.minutes })}>
            <span className={styles.segTime}>
              {segment.minutes}
              <span> min</span>
            </span>{' '}
            <span className={styles.segLabel}>{segment.label}</span>{' '}
            <span className={styles.segDetail}>{segment.detail}</span>
          </li>
        ))}
      </ol>

      <p className={styles.crisis}>
        <Siren size={20} strokeWidth={2} aria-hidden="true" />
        <span>
          <strong>Plus: {crisisRound.label}.</strong> {crisisRound.detail}{' '}
          <a href="#judging" className="text-link">
            How it's scored
          </a>
        </span>
      </p>
    </div>
  );
}

function Deck() {
  return (
    <div className={styles.deck}>
      <div className={styles.blockHead} data-reveal="">
        <h3 className={styles.blockTitle}>The recommended 15-slide structure</h3>
        <p className={styles.blockMeta}>
          Your deck must be 12-15 slides. Merge slides if you need fewer. Using all 15 in a {pitchMinutes}-minute
          pitch gives you about {secondsPerSlide} seconds per slide.
        </p>
      </div>
      <ol role="list" className={styles.slides}>
        {slides.map((slide, index) => (
          <li
            key={slide.number}
            className={styles.slide}
            data-reveal=""
            style={cssVars({ '--reveal-delay': `${(index % 5) * 50}ms`, '--p': (index + 1) / slides.length })}
          >
            <span className={styles.slideNum}>
              <span className="visually-hidden">Slide </span>
              {slide.number}
            </span>
            <h4 className={styles.slideTitle}>{slide.title}</h4>
            <p className={styles.slideGoal}>{slide.goal}</p>
            <span className={styles.slideProgress} aria-hidden="true" />
          </li>
        ))}
      </ol>
    </div>
  );
}

type CalcField = 'price' | 'variable' | 'fixed';

function parseAmount(raw: string): number | null | 'invalid' {
  const cleaned = raw.replace(/[,\s]/g, '');
  if (cleaned === '') return null;
  const value = Number(cleaned);
  return Number.isFinite(value) && value >= 0 ? value : 'invalid';
}

const formatNumber = (value: number, digits = 2) =>
  value.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: 0 });

function Calculator() {
  const id = useId();
  const [values, setValues] = useState<Record<CalcField, string>>({ price: '', variable: '', fixed: '' });

  const parsed = {
    price: parseAmount(values.price),
    variable: parseAmount(values.variable),
    fixed: parseAmount(values.fixed),
  };
  const num = (v: number | null | 'invalid') => (typeof v === 'number' ? v : null);
  const price = num(parsed.price);
  const variable = num(parsed.variable);
  const fixed = num(parsed.fixed);

  const contribution = price !== null && variable !== null ? price - variable : null;
  const margin = contribution !== null && price !== null && price > 0 ? (contribution / price) * 100 : null;
  const noBreakEven = contribution !== null && contribution <= 0;
  const breakEven = contribution !== null && contribution > 0 && fixed !== null ? Math.ceil(fixed / contribution) : null;

  const fields: { key: CalcField; label: string; symbol: string }[] = [
    { key: 'price', label: 'Selling price per unit', symbol: 'P' },
    { key: 'variable', label: 'Variable cost per unit', symbol: 'V' },
    { key: 'fixed', label: 'Monthly fixed costs', symbol: 'F' },
  ];

  return (
    <div className={styles.calc} data-reveal="" data-print="hide">
      <div className={styles.calcHead}>
        <h3 className={styles.blockTitle}>Check your maths</h3>
        <button
          type="button"
          className={styles.reset}
          onClick={() => setValues({ price: '', variable: '', fixed: '' })}
          disabled={!values.price && !values.variable && !values.fixed}
        >
          <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />
          Reset
        </button>
      </div>
      <p className={styles.calcNote}>Enter your own figures in any one currency. Nothing is saved or sent anywhere.</p>

      <div className={styles.inputs}>
        {fields.map((field) => {
          const invalid = parsed[field.key] === 'invalid';
          return (
            <div key={field.key}>
              <label htmlFor={`${id}-${field.key}`} className={styles.inputLabel}>
                <span className={styles.symbol} aria-hidden="true">
                  {field.symbol}
                </span>
                {field.label}
              </label>
              <input
                id={`${id}-${field.key}`}
                className={styles.input}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                spellCheck={false}
                placeholder="0"
                value={values[field.key]}
                aria-invalid={invalid || undefined}
                aria-describedby={invalid ? `${id}-${field.key}-error` : undefined}
                onChange={(event) => setValues((prev) => ({ ...prev, [field.key]: event.target.value }))}
              />
              {invalid ? (
                <p id={`${id}-${field.key}-error`} className={styles.inputError}>
                  Enter a positive number.
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <dl className={styles.results}>
        <div className={styles.result}>
          <dt>
            <span className={styles.symbol} aria-hidden="true">
              C
            </span>
            Contribution per unit
          </dt>
          <dd>
            <output htmlFor={`${id}-price ${id}-variable`}>
              {contribution === null ? '-' : formatNumber(contribution)}
            </output>
          </dd>
        </div>
        <div className={styles.result}>
          <dt>
            <span className={styles.symbol} aria-hidden="true">
              CM
            </span>
            Contribution margin
          </dt>
          <dd>
            <output htmlFor={`${id}-price ${id}-variable`}>{margin === null ? '-' : `${formatNumber(margin, 1)}%`}</output>
          </dd>
        </div>
        <div className={`${styles.result} ${styles.resultKey}`}>
          <dt>
            <span className={styles.symbol} aria-hidden="true">
              BEQ
            </span>
            Break-even quantity
          </dt>
          <dd>
            <output htmlFor={`${id}-price ${id}-variable ${id}-fixed`}>
              {noBreakEven ? 'No break-even' : breakEven === null ? '-' : `${formatNumber(breakEven, 0)} units / month`}
            </output>
          </dd>
        </div>
      </dl>
      {noBreakEven ? (
        <p className={styles.warning} role="status">
          Your price does not cover your variable cost, so every sale loses money. Raise the price or cut the cost.
        </p>
      ) : (
        <p className={styles.calcFoot}>Break-even is rounded up to whole units.</p>
      )}
    </div>
  );
}

export function Playbook() {
  return (
    <section id="playbook" className={styles.section} aria-labelledby="playbook-title">
      <div className="container">
        <SectionHeader
          turn="06"
          label="Pitch Playbook"
          titleId="playbook-title"
          title={['Your 7 minutes', 'start now.']}
          lede="How the final event runs, how to structure your deck, and the maths every number on your slides must survive."
        />

        <FormatChart />
        <Deck />

        <div className={styles.money}>
          <div className={styles.formulas} data-reveal="">
            <div className={styles.blockHead}>
              <h3 className={styles.blockTitle}>The formulas</h3>
              <p className={styles.blockMeta}>Use these exact definitions in your financial model and on your slides.</p>
            </div>
            <dl>
              {formulas.map((formula, index) => (
                <div key={formula.symbol} className={styles.formula}>
                  <dt className={styles.formulaName}>
                    <span className={styles.formulaIndex} aria-hidden="true">
                      F{index + 1}
                    </span>
                    {formula.name}
                    {formula.unit ? <span className={styles.formulaUnit}> · {formula.unit}</span> : null}
                  </dt>
                  <dd className={styles.formulaBody}>
                    <span className={styles.expr} aria-hidden="true">
                      <b>{formula.symbol}</b> = {formula.expression}
                    </span>
                    <span className={styles.plain}>
                      {formula.name} = {formula.plain}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className={styles.key}>
              {formulaKey.map((entry) => (
                <span key={entry.symbol}>
                  <b>{entry.symbol}</b> {entry.meaning}{' '}
                </span>
              ))}
            </p>
          </div>
          <Calculator />
        </div>

        <aside className={styles.evidence} data-reveal="" aria-label="Evidence requirement">
          <span className={styles.evidenceIcon}>
            <FileSearch size={24} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <div>
            <p className={styles.evidenceTitle}>Show your working.</p>
            <p className={styles.evidenceText}>
              Assumptions must be transparent and supported by evidence. For every number on a slide, be ready to
              show where it came from: a published source, an industry report, a supplier quotation, or a calculation
              in your financial model.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
