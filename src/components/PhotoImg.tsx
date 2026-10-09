import { useState } from 'react';
import type { Photo } from '../data/media';

interface PhotoImgProps {
  photo: Photo;
  sizes: string;
  className?: string;
  /** Above-the-fold imagery: load eagerly with high priority. */
  priority?: boolean;
}

/**
 * Responsive photo. If a file fails to load, the image hides itself and the
 * container's own background and layout remain, so nothing breaks.
 */
export function PhotoImg({ photo, sizes, className, priority = false }: PhotoImgProps) {
  const [failed, setFailed] = useState(false);

  const img = (
    <img
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      className={className}
      style={failed ? { visibility: 'hidden' } : undefined}
      onError={() => setFailed(true)}
    />
  );

  if (!photo.portrait) return img;

  return (
    <picture style={{ display: 'contents' }}>
      <source
        media="(max-aspect-ratio: 4/5)"
        srcSet={photo.portrait.srcSet}
        sizes={sizes}
        width={photo.portrait.width}
        height={photo.portrait.height}
      />
      {img}
    </picture>
  );
}
