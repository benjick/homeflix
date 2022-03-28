export const DownloadStats: React.FC<{
  total_size: string;
  month_size: string;
  day_size: string;
}> = ({ total_size, month_size, day_size }) => {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Amount downloaded
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Total</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {total_size}B
          </dd>
        </div>
        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            This month
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {month_size}B
          </dd>
        </div>
        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Today</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {day_size}B
          </dd>
        </div>
      </dl>
    </div>
  );
};
