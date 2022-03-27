import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import homeflix from '../public/images/homeflix.png';
import sabnzbd from '../public/images/sabnzbd-gs.png';
import sonarr from '../public/images/sonarr-gs.png';
import radarr from '../public/images/radarr-gs.png';
import nzbhydra2 from '../public/images/nzbhydra2-gs.png';
import tautulli from '../public/images/tautulli-gs.png';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Homeflix</title>
        <meta name="description" content="Homeflix" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Image src={homeflix} alt="logo" className="w-auto" />

        <div>
          <ul>
            <li>
              <a href="/sabnzbd/" className="w-auto block px-8 py-2">
                <Image src={sabnzbd} alt="logo" />
              </a>
            </li>
            <li>
              <a href="/sonarr/" className="w-auto block px-8 py-2">
                <Image src={sonarr} alt="logo" />
              </a>
            </li>
            <li>
              <a href="/radarr/" className="w-auto block px-8 py-2">
                <Image src={radarr} alt="logo" />
              </a>
            </li>
            <li>
              <a href="/nzbhydra2/" className="w-auto block px-8 py-2">
                <Image src={nzbhydra2} alt="logo" />
              </a>
            </li>
            <li>
              <a href="/tautulli/" className="w-auto block px-8 py-2">
                <Image src={tautulli} alt="logo" />
              </a>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Home;
