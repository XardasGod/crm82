import { forwardRef } from "react";

interface OptimizedImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}

export const OptimizedImage = forwardRef<HTMLPictureElement, OptimizedImageProps>(({
  src,
  webpSrc,
  alt,
  className,
  width,
  height,
  loading = "lazy",
  fetchPriority,
}, ref) => {
  return (
    <picture ref={ref}>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding={loading === "eager" ? "sync" : "async"}
        {...(fetchPriority ? { fetchPriority } : {})}
      />
    </picture>
  );
});
OptimizedImage.displayName = "OptimizedImage";
