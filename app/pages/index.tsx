import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import homeflix from '../public/images/homeflix.png';
import sabnzbd from '../public/images/sabnzbd-gs.png';
import sonarr from '../public/images/sonarr-gs.png';
import radarr from '../public/images/radarr-gs.png';
import nzbhydra2 from '../public/images/nzbhydra2-gs.png';
import tautulli from '../public/images/tautulli-gs.png';

const links = {
  sonarr,
  radarr,
  sabnzbd,
  nzbhydra2,
  tautulli,
};

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
          {Object.entries(links).map(([key, image]) => (
            <a key={key} href={`/${key}/`} className="w-auto block px-12 py-2">
              <Image src={image} alt="logo" />
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
