import { useEffect } from 'react';

declare global {
  interface Window {
    __tvBooted?: boolean;
  }
}

/**
 * Reveals `[data-reveal]` elements as they enter the viewport.
 * Only active when the boot script in index.html added `.motion` to <html>
 * (JS available and no reduced-motion preference); otherwise content is
 * simply visible from the start.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    window.__tvBooted = true;
    const root = document.documentElement;
    if (!root.classList.contains('motion')) return;

    const pending = new Set(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])'));
    const reveal = (el: Element) => {
      el.setAttribute('data-revealed', '');
      pending.delete(el as HTMLElement);
      observer.unobserve(el);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Reveal on entry, and anything already scrolled past.
          if (entry.isIntersecting || entry.boundingClientRect.top <= 0) reveal(entry.target);
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0 },
    );
    pending.forEach((el) => observer.observe(el));

    // Safety sweep once scrolling settles: anchor jumps and very fast scrolls can
    // carry an element past the viewport between observer samples.
    let timer = 0;
    const sweep = () => {
      const fold = window.innerHeight * 0.94;
      for (const el of pending) if (el.getBoundingClientRect().top < fold) reveal(el);
    };
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(sweep, 120);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
}
