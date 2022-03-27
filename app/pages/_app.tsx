import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Layout } from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/images/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/images/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
