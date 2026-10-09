export type RoleIcon = 'strategy' | 'finance' | 'media';

export interface Role {
  member: string;
  title: [string, string];
  icon: RoleIcon;
  summary: string;
  leads: string[];
}

export const roles: Role[] = [
  {
    member: '01',
    title: ['Business', 'Strategist'],
    icon: 'strategy',
    summary: 'Proves the problem is real and that customers will pay to solve it.',
    leads: [
      'Customer problem and validation',
      'Market research and competitor analysis',
      'Market sizing and positioning',
      'RFP and business model',
      'Customer demand and commercial justification',
    ],
  },
  {
    member: '02',
    title: ['Finance &', 'Operations Lead'],
    icon: 'finance',
    summary: 'Proves the numbers work and that the plan can actually be delivered.',
    leads: [
      'Bill of materials',
      'Manufacturing and operating costs',
      'Selling price and profitability',
      'Break-even analysis and cash flow',
      'Suppliers, execution roadmap, and risk register',
    ],
  },
  {
    member: '03',
    title: ['Product &', 'Media Lead'],
    icon: 'media',
    summary: 'Proves the product works and makes people want it.',
    leads: [
      'Product concept and prototype coordination',
      'Brand identity and visual communication',
      'Pitch deck and one-page snapshot',
      'Advertising campaign and launch strategy',
      'Presentation and product demonstration',
    ],
  },
];
