export interface Rule {
  title: string;
  text: string;
}

export const rules: Rule[] = [
  { title: 'Submit the full package', text: 'Every team must submit all required documents.' },
  {
    title: 'Show your working',
    text: 'Financial projections must be traceable to calculations and assumptions.',
  },
  {
    title: 'Credible research',
    text: 'Support your proposal with relevant market research: public research, competitor analysis, industry reports, product comparisons, informal feedback or other credible evidence. Customer interviews are optional.',
  },
  { title: 'No fabrication', text: 'Unsupported claims and fabricated evidence are prohibited.' },
  {
    title: 'AI assists. You decide.',
    text: 'AI may assist with research, ideation and design, but you must understand and be able to defend your work.',
  },
  { title: 'Everyone contributes', text: 'Every member must contribute meaningfully.' },
  { title: 'Prove it works', text: 'The product must have a credible proof of concept.' },
  {
    title: 'Safety and compliance',
    text: 'Identify the product safety and compliance considerations relevant to your product or service.',
  },
  { title: 'Speak human', text: 'The final pitch must be understandable to a non-engineer.' },
  { title: 'Penalties apply', text: 'Missing deliverables may incur penalties under the published rubric.' },
];

/**
 * Financial penalty and disqualification provisions.
 *
 * Paste these EXACTLY as worded in the official competition brief. Do not
 * paraphrase or invent provisions. The "Penalties & disqualification" panel only
 * appears on the site once at least one provision is listed here.
 */
export const penaltyProvisions: string[] = [];
