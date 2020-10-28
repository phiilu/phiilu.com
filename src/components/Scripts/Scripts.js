function Scripts() {
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  return (
    <>
      <script
        async
        defer
        data-do-not-track="true"
        data-domains="phiilu.com"
        data-website-id={process.env.UMAMI_WEBSITE_ID}
        src="https://u.phiilu.com/umami.js"></script>
      <script
        async
        defer
        data-domain="phiilu.com"
        src="https://p.phiilu.com/js/plausible.js"></script>
      <script async defer src="https://cdn.splitbee.io/sb.js"></script>
    </>
  );
}

export default Scripts;
