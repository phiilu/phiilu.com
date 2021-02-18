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
        src="https://p.phiilu.com/js/plausible.outbound-links.js"></script>
      {/* Splitbee */}
      {/* <script async defer src="https://bee.phiilu.com/sb.js"></script> */}
      <script async data-api="/_hive" src="/bee.js"></script>
    </>
  );
}

export default Scripts;
