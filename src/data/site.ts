/**
 * Site-wide settings. Everything an organiser is likely to change lives here.
 */
export const site = {
  eventName: 'Beyond the Buggy',
  eventType: 'Business Innovation Challenge',
  organisation: 'Team Volante Motorsports',
  department: 'Management & Media Department',

  /**
   * Official submission location (e.g. a form or shared folder).
   * Leave as `null` until it is published. The site then shows a clearly
   * non-clickable "link not yet published" notice instead of a fake button.
   */
  submissionUrl: null as string | null,
  submissionLabel: 'Open the submission portal',
};

export type SectionId =
  | 'top'
  | 'overview'
  | 'challenges'
  | 'roles'
  | 'deliverables'
  | 'snapshot'
  | 'playbook'
  | 'timeline'
  | 'judging'
  | 'rules'
  | 'finish';

export interface NavItem {
  id: SectionId;
  label: string;
}

export const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'roles', label: 'Team Roles' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'judging', label: 'Judging' },
];

/** Sections without their own nav link highlight the closest parent link. */
export const navParent: Partial<Record<SectionId, SectionId>> = {
  snapshot: 'deliverables',
  playbook: 'deliverables',
  rules: 'judging',
};

/** Every section in page order, used by the mobile menu and footer. */
export const allSections: NavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'roles', label: 'Team Roles' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'snapshot', label: 'One-Page Snapshot' },
  { id: 'playbook', label: 'Pitch Playbook' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'judging', label: 'Judging' },
  { id: 'rules', label: 'Rules & Expectations' },
];

/** Sections observed for the active-link highlight, in page order. */
export const trackedSections: SectionId[] = [...allSections.map((s) => s.id), 'finish'];
