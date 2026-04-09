interface VideoEmbedProps {
  url: string;
  caption?: string;
}

function getEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;
  }

  // Vimeo
  const vimeoMatch = url.match(
    /(?:vimeo\.com\/)(\d+)/
  );
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return null;
}

export default function VideoEmbed({ url, caption }: VideoEmbedProps) {
  const embedUrl = getEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <div>
      <div className="relative w-full overflow-hidden bg-ink" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={embedUrl}
          title={caption || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {caption && (
        <p className="mt-3 text-sm text-muted text-center">{caption}</p>
      )}
    </div>
  );
}
