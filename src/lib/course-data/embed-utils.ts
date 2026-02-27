const YOUTUBE_REGEX =
  /(?:youtube.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu.be\/)([^"&?/\s]{11})/;

const DRIVE_FILE_REGEX = /drive\.google\.com\/file\/d\/([^/]+)/;

export const getEmbedUrl = (url: string | undefined): string | null => {
  if (!url || url === '#') return null;

  const driveFile = url.match(DRIVE_FILE_REGEX);
  if (driveFile?.[1]) {
    return `https://drive.google.com/file/d/${driveFile[1]}/preview`;
  }

  if (url.includes('docs.google.com') && url.includes('/edit')) {
    return `${url.split('/edit')[0]}/embed?start=false&loop=false&delayms=3000`;
  }

  const youtubeMatch = url.match(YOUTUBE_REGEX);
  if (youtubeMatch?.[1]) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&rel=0`;
  }

  return url;
};
