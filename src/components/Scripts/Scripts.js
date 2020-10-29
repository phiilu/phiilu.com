function Scripts() {
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  return (
    <>
      {/* Umami Analytics */}
      <script
        async
        defer
        data-do-not-track="true"
        data-domains="phiilu.com"
        data-website-id={process.env.UMAMI_WEBSITE_ID}
        src="https://u.phiilu.com/umami.js"></script>
      {/* Plausible Analytics */}
      <script
        async
        defer
        data-domain="phiilu.com"
        src="https://p.phiilu.com/js/plausible.js"></script>
      {/* Splitbee */}
      <script async defer src="https://cdn.splitbee.io/sb.js"></script>
      {/* Simple Analytics */}
      <script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
      <noscript>
        <img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" />
      </noscript>
      {/* Fathom is in _app.js */}
    </>
  );
}

export default Scripts;
