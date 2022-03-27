const sharedConfig = {
  EnableSsl: 'False',
  LaunchBrowser: 'False',
  AuthenticationMethod: 'None',
  UpdateMechanism: 'Docker',
  AnalyticsEnabled: 'False',
}

interface Config {
  host: string;
  categories: number[];
  path: string;
  db?: {
    filename: string;
    paths: Record<string, string>;
    table: string;
  };
  xml: Record<string, string|number>
}

export const configs: Record<string, Config> = {
  radarr: {
    host: 'radarr:7878',
    categories: [2000, 2010, 2020, 2030, 2040, 2045, 2050, 2060],
    db: {
      filename: '/config/radarr/radarr.db',
      table: 'Movies',
      paths: {
        'E:\\Warez\\Movies\\': '/warez/e/Movies/',
        'G:\\Warez\\Movies\\': '/warez/g/Movies/'
      }
    },
    path: '/config/radarr/config.xml',
    xml: {
      UrlBase: '/radarr',
      Port: 7878,
      ...sharedConfig,
    }
  },
  sonarr: {
    host: 'sonarr:8989',
    categories: [5030, 5040],
    db: {
      filename: '/config/sonarr/sonarr.db',
      table: 'Series',
      paths: {
        'E:\\Warez\\TV\\': '/warez/e/TV/',
        'F:\\Warez\\TV\\': '/warez/f/TV/',
        'G:\\Warez\\TV\\': '/warez/g/TV/'
      }
    },
    path: '/config/sonarr/config.xml',
    xml: {
      UrlBase: '/sonarr',
      Port: 8989,
      ...sharedConfig,
    }
  },
}