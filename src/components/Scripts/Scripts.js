function Scripts() {
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  return (
    <>
      {/* Splitbee */}
      {/* <script async defer src="https://bee.phiilu.com/sb.js"></script> */}
      <script async data-api="/_hive" src="/bee.js"></script>
    </>
  );
}

export default Scripts;
