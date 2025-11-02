"use client"

interface YouTubeEmbedProps {
  url: string
  title: string
}

export function YouTubeEmbed({ url, title }: YouTubeEmbedProps) {
  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = ""

    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1]?.split("&")[0] || ""
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] || ""
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : ""
  }

  const embedUrl = getYouTubeEmbedUrl(url)

  if (!embedUrl) {
    return <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">Invalid YouTube URL</div>
  }

  return (
    <div className="aspect-video rounded-lg overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
