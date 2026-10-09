import type { SectionId } from './site';

export interface Deliverable {
  id: string;
  number: string;
  title: string;
  summary: string;
  format: string;
  /** What the deliverable must contain, taken from the competition brief. */
  contents: string[];
  /** Optional guidance shown under the contents list. */
  note?: string;
  /** Which member leads it, derived from the role responsibilities. `null` = shared by the team. */
  lead: { member: string; role: string } | null;
  related?: { id: SectionId; label: string };
}

const strategist = { member: '01', role: 'Business Strategist' };
const finance = { member: '02', role: 'Finance & Operations Lead' };
const media = { member: '03', role: 'Product & Media Lead' };

export const deliverables: Deliverable[] = [
  {
    id: 'pitch-deck',
    number: '01',
    title: 'Business Pitch Deck',
    summary: 'The deck you present to the judging panel.',
    format: 'PDF · 12-15 slides',
    contents: ['12-15 slides', 'Submitted in PDF format'],
    lead: media,
    related: { id: 'playbook', label: 'See the recommended 15-slide structure' },
  },
  {
    id: 'snapshot',
    number: '02',
    title: 'One-Page Business Snapshot',
    summary: 'A single-page executive summary of the entire business.',
    format: 'Single page',
    contents: [
      'Product or brand name and one-line promise',
      'Problem, solution, target customer and competitive advantage',
      'Unit cost, selling price, contribution margin and monthly break-even quantity',
      'Funding required, business model, use of funds and milestones',
    ],
    lead: media,
    related: { id: 'snapshot', label: 'Open the snapshot template' },
  },
  {
    id: 'rfp',
    number: '03',
    title: 'Customer Problem Statement & RFP',
    summary: "The customer's need, written up as a formal request for proposal.",
    format: 'Document',
    contents: ['Customer needs', 'Requirements', 'Constraints', 'Deliverables', 'Acceptance criteria'],
    lead: strategist,
  },
  {
    id: 'market-research',
    number: '04',
    title: 'Market Research Report',
    summary: 'The evidence that the problem is real and the market is worth entering.',
    format: 'Report',
    contents: [
      'The problem, existing solutions and target audience',
      'Competitor analysis and product comparisons',
      'Demand evidence and the commercial opportunity',
      'TAM / SAM / SOM calculations',
    ],
    note: 'Use publicly available research, industry reports, product comparisons, informal feedback or other credible evidence. Customer interviews and other primary research are optional.',
    lead: strategist,
  },
  {
    id: 'prototype',
    number: '05',
    title: 'Product Prototype',
    summary: 'A meaningful proof of concept the panel can see working.',
    format: 'Mock-up · CAD · demo',
    contents: [
      'A physical mock-up, CAD model, digital demo, workflow, or other meaningful proof of concept',
      "Must meet your challenge's required proof of concept",
    ],
    lead: media,
    related: { id: 'challenges', label: "Check your challenge's required proof" },
  },
  {
    id: 'financial-model',
    number: '06',
    title: 'Financial Model',
    summary: 'The numbers behind every claim in your pitch.',
    format: 'Editable spreadsheet',
    contents: [
      'Bill of materials (BOM)',
      'Pricing and unit economics',
      'Margins and break-even',
      'Cash flow',
      'Scenario analysis',
    ],
    lead: finance,
    related: { id: 'playbook', label: 'Review the financial formulas' },
  },
  {
    id: 'branding-media',
    number: '07',
    title: 'Branding & Media Plan',
    summary: 'How the business looks, sounds and reaches its customers.',
    format: 'Plan + ad mock-up',
    contents: ['Brand identity', 'Advertisement mock-up', 'Content plan', 'Measurable marketing KPIs'],
    lead: media,
  },
  {
    id: 'roadmap',
    number: '08',
    title: 'Execution Roadmap',
    summary: 'What happens in the first 90 days, and who makes it happen.',
    format: '30 / 60 / 90-day plan',
    contents: ['30 / 60 / 90-day milestones', 'Responsibilities', 'Dependencies', 'Suppliers'],
    lead: finance,
  },
  {
    id: 'risk-register',
    number: '09',
    title: 'Risk Register',
    summary: 'What could go wrong, and what you will do about it.',
    format: 'Register (table)',
    contents: ['Risk', 'Probability', 'Impact', 'Mitigation', 'Contingency'],
    lead: finance,
  },
  {
    id: 'evidence-appendix',
    number: '10',
    title: 'Evidence Appendix',
    summary: 'The proof behind your research, numbers and claims.',
    format: 'Appendix',
    contents: ['Market research evidence', 'Supplier quotations', 'Sources', 'Calculations', 'Assumptions'],
    lead: null,
  },
];
