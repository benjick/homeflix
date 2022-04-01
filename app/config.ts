const production = process.env.NODE_ENV === 'production';

export interface Path {
  label: string;
  path: string;
}

export interface PathWithData extends Path {
  free: number;
  size: number;
}

const devPaths: Path[] = [
  {
    label: 'G:',
    path: '/',
  },
  {
    label: 'E:',
    path: '/',
  },
];

const paths: Path[] = [
  { label: 'E:\\', path: '/warez/e' },
  { label: 'F:\\', path: '/warez/f' },
  { label: 'G:\\', path: '/warez/g' },
];

export function getPaths(): Path[] {
  if (production) {
    return paths;
  }
  return devPaths;
}
