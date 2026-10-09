/**
 * 10-day preparation schedule. Days 01 to 09 are suggested milestones, not
 * deadlines. Day 10 is Business Pitch Day, fixed for 22 October 2026.
 */

export type Phase = 'Discover' | 'Define' | 'Build' | 'Rehearse' | 'Pitch';

export interface TimelineDay {
  day: string;
  title: string;
  phase: Phase;
  /** Confirmed calendar date, shown only where one has been set. */
  date?: { label: string; iso: string };
}

export const timeline: TimelineDay[] = [
  { day: '01', title: 'Challenge briefing and problem statement', phase: 'Discover' },
  { day: '02', title: 'Market research and competitor analysis', phase: 'Discover' },
  { day: '03', title: 'Target audience and market sizing', phase: 'Discover' },
  { day: '04', title: 'RFP and initial concept', phase: 'Define' },
  { day: '05', title: 'One-page snapshot and business model', phase: 'Define' },
  { day: '06', title: 'Prototype and financial model', phase: 'Build' },
  { day: '07', title: 'Pitch deck and media campaign', phase: 'Build' },
  { day: '08', title: 'Risk register, roadmap, and evidence appendix', phase: 'Build' },
  { day: '09', title: 'Internal review and mock investor questions', phase: 'Rehearse' },
  {
    day: '10',
    title: 'Business Pitch Day: final presentation and judging',
    phase: 'Pitch',
    date: { label: '22 October 2026', iso: '2026-10-22' },
  },
];

export const phases: { name: Phase; from: number; to: number }[] = [
  { name: 'Discover', from: 1, to: 3 },
  { name: 'Define', from: 4, to: 5 },
  { name: 'Build', from: 6, to: 8 },
  { name: 'Rehearse', from: 9, to: 9 },
  { name: 'Pitch', from: 10, to: 10 },
];
