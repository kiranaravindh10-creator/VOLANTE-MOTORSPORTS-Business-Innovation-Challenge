import { useRevealOnScroll } from './hooks/useRevealOnScroll';
import { Challenges } from './sections/Challenges';
import { Deliverables } from './sections/Deliverables';
import { Finale } from './sections/Finale';
import { Footer } from './sections/Footer';
import { Hero } from './sections/Hero';
import { Judging } from './sections/Judging';
import { Mission } from './sections/Mission';
import { Nav } from './sections/Nav';
import { Playbook } from './sections/Playbook';
import { Roles } from './sections/Roles';
import { Rules } from './sections/Rules';
import { Snapshot } from './sections/Snapshot';
import { Timeline } from './sections/Timeline';

export function App() {
  useRevealOnScroll();

  return (
    <>
      <a className="skip-link" href="#overview">
        Skip to the brief
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Mission />
        <Challenges />
        <Roles />
        <Deliverables />
        <Snapshot />
        <Playbook />
        <Timeline />
        <Judging />
        <Rules />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
