import { media, type Photo } from './media';

export type ChallengeMotif = 'hazard' | 'matrix' | 'grid' | 'loop';

export interface Challenge {
  id: string;
  /** Team number. Each team has already been assigned this challenge. */
  team: string;
  name: string;
  category: string;
  /** CSS custom property holding the challenge's livery colour. */
  accent: string;
  motif: ChallengeMotif;
  image: Photo;
  problem: string;
  objective: string;
  proof: string[];
  question: string;
}

export const challenges: Challenge[] = [
  {
    id: 'pitbox',
    team: '01',
    name: 'PITBOX',
    category: 'Physical Product',
    accent: 'var(--team-01)',
    motif: 'hazard',
    image: media.pitbox,
    problem:
      'In crowded pits and workshops, tools go missing and equipment goes untracked, turning routine jobs into searches.',
    objective:
      'Design a modular, portable pit-management and tool-organisation system for motorsports teams. Reduce tool-search time, improve equipment tracking, and make workshop operations more efficient.',
    proof: ['Physical mock-up', 'Manufacturing cost estimate', 'Competitor comparison', 'Timed demonstration'],
    question: 'Will teams pay for a system that measurably cuts tool-search time, and how much?',
  },
  {
    id: 'partspulse',
    team: '02',
    name: 'PARTSPULSE',
    category: 'Digital Product',
    accent: 'var(--team-02)',
    motif: 'matrix',
    image: media.partspulse,
    problem:
      'Teams lose track of the parts they own, how hard each component has been used, and when it is due for service.',
    objective:
      'Develop a low-cost inventory and maintenance-tracking solution using QR codes, a mobile-friendly dashboard, service reminders, and component histories.',
    proof: ['Working prototype or clickable demo', 'Sample inventory data', 'Sample maintenance records'],
    question:
      'Will teams switch from spreadsheets, notebooks or memory to your tool and pay to keep using it?',
  },
  {
    id: 'sponsorgrid',
    team: '03',
    name: 'SPONSORGRID',
    category: 'Marketing & Media',
    accent: 'var(--team-03)',
    motif: 'grid',
    image: media.sponsorgrid,
    problem:
      'College motorsport teams struggle to show sponsors measurable value, which makes sponsorship harder to win and to renew.',
    objective:
      'Develop a service that helps college motorsports teams demonstrate measurable sponsor value through event activations, QR engagement, content analytics, and lead generation.',
    proof: ['Sponsor proposal', 'Campaign mock-up', 'Reporting dashboard', 'Pricing model'],
    question:
      'Can you prove sponsor value well enough that the team or the sponsor will pay for the service?',
  },
  {
    id: 'redrive',
    team: '04',
    name: 'RE:DRIVE',
    category: 'Sustainability',
    accent: 'var(--team-04)',
    motif: 'loop',
    image: media.redrive,
    problem:
      'Workshops and teams throw away automotive materials that could still have value if they can be recovered safely and reliably.',
    objective:
      'Develop a circular-economy business around discarded automotive and workshop materials, creating useful products or services from suitable recovered materials.',
    proof: ['Product or service concept', 'Sourcing strategy', 'Quality-control process', 'Cost-versus-revenue analysis'],
    question: 'Can you source recovered materials reliably, keep quality consistent, and still sell at a profit?',
  },
];
