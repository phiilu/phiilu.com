// Bluesky: https://docs.bsky.app/docs/advanced-guides/intent-links
// The compose intent only takes `text`, so the URL has to live inside it.
export function blueskyShareUrl(title: string, url: string) {
  const params = new URLSearchParams({ text: `${title} by @phiilu.com\n\n${url}` });
  return `https://bsky.app/intent/compose?${params}`;
}

// X: https://docs.x.com/x-for-websites/post-button/guides/web-intent
export function xShareUrl(title: string, url: string) {
  const params = new URLSearchParams({ text: title, url, via: 'phiilu' });
  return `https://x.com/intent/tweet?${params}`;
}
