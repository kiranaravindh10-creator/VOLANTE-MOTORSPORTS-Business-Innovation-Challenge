export interface Criterion {
  number: string;
  label: string;
  points: number;
}

export const rubric: Criterion[] = [
  { number: '01', label: 'Problem validation and customer research', points: 15 },
  { number: '02', label: 'Originality and product usefulness', points: 15 },
  { number: '03', label: 'Market and competitor research', points: 10 },
  { number: '04', label: 'Financial feasibility', points: 15 },
  { number: '05', label: 'Business model and go-to-market strategy', points: 10 },
  { number: '06', label: 'Prototype and demonstration', points: 10 },
  { number: '07', label: 'Execution roadmap and risk management', points: 10 },
  { number: '08', label: 'Presentation quality', points: 5 },
  { number: '09', label: 'Q&A and crisis response', points: 10 },
];

export const rubricTotal = rubric.reduce((sum, c) => sum + c.points, 0);
export const rubricMax = Math.max(...rubric.map((c) => c.points));

export type CrisisIcon = 'cost' | 'reject' | 'undercut' | 'budget';

export const crisisScenarios: { icon: CrisisIcon; title: string; detail: string }[] = [
  { icon: 'cost', title: 'Supplier costs increase', detail: 'Your unit cost rises. Does the business still work?' },
  { icon: 'reject', title: 'A customer rejects the product', detail: 'Your first buyer says no. What changes?' },
  { icon: 'undercut', title: 'A competitor undercuts your price', detail: 'Someone sells cheaper. How do you respond?' },
  { icon: 'budget', title: 'Your available budget is reduced', detail: 'You get less funding. What do you cut first?' },
];
