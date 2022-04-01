import { PathWithData } from '../config';

function humanFileSize(size: number) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    Number((size / Math.pow(1024, i)).toFixed(0)) * 1 +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  );
}

export const Diskfree: React.FC<{ paths: PathWithData[] }> = ({ paths }) => {
  return (
    <div className="pt-10 sm:px-10">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-8">
        Disk usage
      </h3>
      {paths.map((path) => {
        const percentage = path.free / path.size;
        const percentageString = `${Math.round(percentage * 100)}%`;
        const background =
          percentage > 0.8
            ? 'bg-red-600'
            : percentage < 0.5
            ? 'bg-green-600'
            : 'bg-blue-600';
        return (
          <div key={path.label} className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-base font-medium text-gray-600">
                {path.label}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {humanFileSize(path.free)} / {humanFileSize(path.size)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`${background} h-2.5 rounded-full`}
                style={{ width: percentageString }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
