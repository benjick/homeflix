import {
  CheckIcon,
  XIcon,
  ClockIcon,
  FolderOpenIcon,
} from '@heroicons/react/solid';
import TimeAgo from 'timeago-react';
import { History } from '../src/models/History';

export const DownloadHistory: React.FC<{ history: History }> = ({
  history,
}) => {
  if (history.slots.length === 0) {
    return null;
  }
  function renderIcon(status: string) {
    if (status === 'Completed') {
      return (
        <span className="bg-green-700 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-gray-100">
          <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
      );
    }
    if (status === 'Failed') {
      return (
        <span className="bg-red-700 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-gray-100">
          <XIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
      );
    }
    if (status === 'Queued') {
      return (
        <span className="bg-blue-700 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-gray-100">
          <ClockIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
      );
    }
    if (status === 'Extracting') {
      return (
        <span className="animate-bounce bg-blue-700 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-gray-100">
          <FolderOpenIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
      );
    }
  }
  return (
    <div className="py-8 overflow-x-auto overflow-y-hidden">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-8">
        Download history
      </h3>
      <ul role="list" className="-mb-8">
        {history.slots.map((slot, idx) => (
          <li key={slot.id}>
            <div className="relative pb-8">
              {idx === history.slots.length - 1 ? undefined : (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-300"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>{renderIcon(slot.status)}</div>
                <div className="min-w-0 flex-1 pt-1.5">
                  <p className="text-sm text-gray-500 break-words">
                    {slot.name}
                  </p>
                  <div className="text-right text-sm whitespace-nowrap text-gray-400">
                    <TimeAgo datetime={slot.completed * 1000} />
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
