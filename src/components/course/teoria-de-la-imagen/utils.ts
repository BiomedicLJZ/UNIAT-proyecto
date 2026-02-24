export const getEmbedUrl = (url: string | undefined): string | null => {
  if (!url || url === '#') return null;

  // 1. Google Drive: view -> preview
  if (url.includes('drive.google.com') && url.includes('/view')) {
    return url.replace('/view', '/preview');
  }

  // Google Slides/Docs: edit -> embed
  if (url.includes('docs.google.com') && url.includes('/edit')) {
    return url.replace('/edit', '/embed?start=false&loop=false&delayms=3000');
  }

  // 2. YouTube (Shorts, Watch, Embed, youtu.be) - Robust Regex
  const youtubeRegex =
    /(?:youtube.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu.be\/)([^"&?/\s]{11})/;
  const match = url.match(youtubeRegex);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
  }

  return url;
};
