import { useEffect, useState } from 'react';

/**
 * Returns the id of the section crossing a thin band just above the middle of
 * the viewport, which is the one the reader is looking at.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        setActive(ids.find((id) => visible.get(id)) ?? null);
      },
      { rootMargin: '-42% 0px -56% 0px', threshold: 0 },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
