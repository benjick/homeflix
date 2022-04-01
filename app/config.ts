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
  // { label: 'C:\\', path: '/mnt/c' },
  // { label: 'D:\\', path: '/mnt/d' },
  { label: 'E:\\', path: '/mnt/e' },
  { label: 'F:\\', path: '/mnt/f' },
  { label: 'G:\\', path: '/mnt/g' },
];

export function getPaths(): Path[] {
  if (production) {
    return paths;
  }
  return devPaths;
}
