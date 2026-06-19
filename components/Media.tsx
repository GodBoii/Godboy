import { cx } from "@/lib/utils";
import { WebGLImage } from "./WebGLImage";

export function Media({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const isVideo = src.endsWith(".mp4");
  return (
    <div className={cx("media-mask", className)}>
      {isVideo ? (
        <video src={src} autoPlay muted loop playsInline preload="metadata" />
      ) : (
        <WebGLImage src={src} alt={alt} />
      )}
    </div>
  );
}
