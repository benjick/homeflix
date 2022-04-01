import checkDiskSpace from 'check-disk-space';
import { getPaths, PathWithData } from '../config';

export function getPathsWithData(): Promise<PathWithData[]> {
  const paths = getPaths();
  const promises = paths.map(async (path) => {
    const res = await checkDiskSpace(path.path);
    return {
      ...path,
      free: res.free,
      size: res.size,
    };
  });
  return Promise.all(promises);
}
