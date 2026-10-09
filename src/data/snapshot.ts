/**
 * The one-page snapshot template. Every value is a placeholder: the template
 * deliberately contains no example figures.
 */

export interface SnapshotField {
  label: string;
  placeholder: string;
  hint: string;
}

export const snapshot = {
  name: {
    label: 'Product or brand name',
    placeholder: 'Product / brand name',
    hint: 'Short, memorable, and easy to say out loud.',
  },
  promise: {
    label: 'One-line product promise',
    placeholder: 'One sentence: what it does, for whom, and why it matters',
    hint: 'If the panel remembers one line, it should be this one.',
  },
  story: [
    {
      label: 'Problem',
      placeholder: 'Who has the problem, how often, and what it costs them',
      hint: 'Back it up with your market research.',
    },
    {
      label: 'Solution',
      placeholder: 'What you offer and how it solves the problem',
      hint: 'Plain language a non-engineer understands.',
    },
    {
      label: 'Target customer',
      placeholder: 'The specific customer who buys first',
      hint: 'Be specific. "Everyone" is not a customer.',
    },
    {
      label: 'Competitive advantage',
      placeholder: "Why customers choose you over today's alternatives",
      hint: 'Compare against the alternatives you researched.',
    },
  ] satisfies SnapshotField[],
  economics: [
    { label: 'Unit cost', placeholder: 'Amount', hint: 'Variable cost per unit' },
    { label: 'Selling price', placeholder: 'Amount', hint: 'Per unit' },
    { label: 'Contribution margin', placeholder: '%', hint: '(Price - cost) ÷ price × 100' },
    { label: 'Monthly break-even', placeholder: 'Units', hint: 'Fixed costs ÷ contribution' },
  ] satisfies SnapshotField[],
  funding: [
    {
      label: 'Funding required',
      placeholder: 'Amount',
      hint: 'The total you are asking for.',
    },
    {
      label: 'Business model',
      placeholder: 'Who pays, for what, and how often',
      hint: 'e.g. one-off sale, subscription, service fee.',
    },
  ] satisfies SnapshotField[],
  funds: {
    label: 'Proposed use of funds & expected milestones',
    columns: ['Use of funds', 'Amount', 'Milestone it unlocks', 'Target'],
    rows: 3,
    targetPlaceholder: 'Day 30 / 60 / 90',
  },
};
