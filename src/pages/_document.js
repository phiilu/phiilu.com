import Document, { Html, Head, Main, NextScript } from 'next/document';
import Scripts from '@components/Scripts/Scripts';
import AnalyticsWrapper from '@components/Analytics/Analytics';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <Scripts />
          <AnalyticsWrapper />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
