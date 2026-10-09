import { useCallback, useEffect, useState } from 'react';

export type StorageStatus = 'pending' | 'available' | 'unavailable';

function readSaved(key: string, validIds: readonly string[]): Record<string, boolean> {
  const raw = window.localStorage.getItem(key);
  if (!raw) return {};
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== 'object') return {};
  const result: Record<string, boolean> = {};
  for (const id of validIds) {
    if ((parsed as Record<string, unknown>)[id] === true) result[id] = true;
  }
  return result;
}

/**
 * Completion ticks stored in this browser's localStorage only. Nothing is
 * synced across devices or shared with anyone. State starts empty on both the
 * server and the first client render (so hydration matches), then loads.
 */
export function useChecklist(key: string, validIds: readonly string[]) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [storage, setStorage] = useState<StorageStatus>('pending');

  useEffect(() => {
    try {
      setDone(readSaved(key, validIds));
      setStorage('available');
    } catch {
      setStorage('unavailable');
    }

    // Keep multiple open tabs in step.
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      try {
        setDone(readSaved(key, validIds));
      } catch {
        /* ignore */
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key, validIds]);

  useEffect(() => {
    if (storage !== 'available') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(done));
    } catch {
      /* storage full or blocked; ticks still work for this visit */
    }
  }, [done, key, storage]);

  const toggle = useCallback((id: string) => {
    setDone((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  }, []);

  const clear = useCallback(() => setDone({}), []);

  return { done, toggle, clear, storage };
}
