export interface Slide {
  number: string;
  title: string;
  /** One-line guidance on what the slide must achieve. */
  goal: string;
}

export const slides: Slide[] = [
  { number: '01', title: 'The Hook', goal: 'Open with a moment, fact or question the panel will remember.' },
  { number: '02', title: 'The Problem', goal: 'Who is hurting, how often, and what it costs them.' },
  { number: '03', title: 'The Customer', goal: 'Who buys or uses your product, backed by your research.' },
  { number: '04', title: 'Existing Alternatives', goal: 'What customers use today, and where it falls short.' },
  { number: '05', title: 'Meet the Product', goal: 'What it is and how it works, in plain language.' },
  { number: '06', title: 'Competitive Advantage', goal: 'Why customers will choose you over the alternatives.' },
  { number: '07', title: 'Market Opportunity', goal: 'TAM, SAM and SOM, with your sources and method.' },
  { number: '08', title: 'Business Model', goal: 'Who pays, what they pay for, and how often.' },
  { number: '09', title: 'Cost and Profitability', goal: 'Unit cost, price, margin and break-even.' },
  { number: '10', title: 'Marketing and Media', goal: 'How customers will find you, trust you and buy.' },
  { number: '11', title: 'Manufacturing and Operations', goal: 'How it gets made or delivered, and by whom.' },
  { number: '12', title: 'Risks and Contingencies', goal: 'Your biggest risks and your plan for each.' },
  { number: '13', title: '90-Day Roadmap', goal: 'Milestones for the first 30, 60 and 90 days.' },
  { number: '14', title: 'Investment Ask', goal: 'How much you need and exactly what it unlocks.' },
  { number: '15', title: 'The Close', goal: 'The one line the panel should repeat after you leave.' },
];

export interface FormatSegment {
  label: string;
  minutes: number;
  detail: string;
  tone: 'primary' | 'secondary' | 'tertiary';
}

/** Recommended final-event format. */
export const eventFormat: FormatSegment[] = [
  { label: 'Pitch', minutes: 7, detail: 'Your deck, your story, your numbers.', tone: 'primary' },
  { label: 'Demonstration', minutes: 3, detail: 'Show the proof of concept working.', tone: 'secondary' },
  { label: 'Investor Q&A', minutes: 5, detail: 'Every member answers, including outside their role.', tone: 'tertiary' },
];

export const crisisRound = {
  label: 'Surprise crisis challenge',
  detail: 'A separate round. Your team responds to an unexpected scenario.',
};

export interface Formula {
  symbol: string;
  name: string;
  expression: string;
  plain: string;
  unit?: string;
}

export const formulas: Formula[] = [
  {
    symbol: 'C',
    name: 'Contribution per unit',
    expression: 'P - V',
    plain: 'Selling price - Variable cost per unit',
  },
  {
    symbol: 'CM',
    name: 'Contribution margin',
    expression: 'C ÷ P × 100',
    plain: 'Contribution per unit ÷ Selling price × 100',
    unit: '%',
  },
  {
    symbol: 'BEQ',
    name: 'Break-even quantity',
    expression: 'F ÷ C',
    plain: 'Monthly fixed costs ÷ Contribution per unit',
    unit: 'units / month',
  },
];

export const formulaKey = [
  { symbol: 'P', meaning: 'Selling price per unit' },
  { symbol: 'V', meaning: 'Variable cost per unit' },
  { symbol: 'F', meaning: 'Monthly fixed costs' },
];
