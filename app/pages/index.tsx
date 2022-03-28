import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { DownloadHistory } from '../components/DownloadHistory';
import { DownloadStats } from '../components/DownloadStats';
import { History } from '../src/models/History';
import { services } from '../src/services';

const Home: NextPage<{ history: History }> = ({ history }) => {
  return (
    <div>
      <Head>
        <title>Homeflix</title>
        <meta name="description" content="Homeflix" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <DownloadStats
          day_size={history.day_size}
          total_size={history.total_size}
          month_size={history.month_size}
        />
        <DownloadHistory history={history} />
        <div className="grid grid-cols-1 md:grid-cols-3">
          {services.map(({ name, image, link }) => (
            <Link key={name} href={`/iframe${link}`}>
              <a className="w-auto block px-12 py-2">
                <Image src={image} alt="logo" />
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('http://localhost:3000/api/sabnzbd');
  const props = await res.json();
  return {
    props,
  };
};

export default Home;
