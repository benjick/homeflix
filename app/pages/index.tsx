import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { services } from '../src/services';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Homeflix</title>
        <meta name="description" content="Homeflix" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {services.map(({ name, image, link }) => (
            <a key={name} href={link} className="w-auto block px-12 py-2">
              <Image src={image} alt="logo" />
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
