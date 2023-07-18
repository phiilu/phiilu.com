export default function middleware(request) {
  const url = new URL(request.url);
  // You can retrieve IP location or cookies here.

  if (url.pathname === '/rss/feed.xml') {
    url.pathname = '/rss.xml';
    return Response.redirect(url);
  }

  if (url.pathname === '/rss/feed.json' || url.pathname === '/rss/atom.xml') {
    url.pathname = '/';
    return Response.redirect(url);
  }
}
