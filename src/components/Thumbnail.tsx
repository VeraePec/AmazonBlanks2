import React from 'react';
import { useResolvedImage } from '../hooks/useResolvedImage';

interface ThumbnailProps {
  source?: string | string[];
  alt: string;
  className?: string;
}

const pickCandidate = (source?: string | string[]): string => {
  if (Array.isArray(source)) {
    return source.length > 0 ? source[0] : '/placeholder.svg';
  }
  return source || '/placeholder.svg';
};

export const Thumbnail: React.FC<ThumbnailProps> = ({ source, alt, className }) => {
  const candidate = pickCandidate(source);
  const resolved = useResolvedImage(candidate);
  return (
    <img
      src={resolved}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
    />
  );
};

export default Thumbnail;


