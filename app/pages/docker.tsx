import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { Container, ContainerStatus } from '../src/models/Docker';
import { LoadingSpinner } from '../components/LoadingSpinner';
import TimeAgo from 'timeago-react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Status: React.FC<{ status: ContainerStatus }> = ({ status }) => {
  let colors = '';
  switch (status) {
    case 'running':
      colors = 'bg-green-100 text-green-800';
      break;

    case 'missing':
    case 'unknown':
      colors = 'bg-red-100 text-red-800';
      break;

    case 'exited':
      colors = 'bg-blue-100 text-blue-800';
      break;

    default:
      break;
  }
  return (
    <div className="flex-shrink-0 flex">
      <p
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors}`}
      >
        {status}
      </p>
    </div>
  );
};

const Docker: NextPage<{ containers: Container[] }> = (props) => {
  const [loading, setLoading] = useState(false);
  const checkbox = useRef<any>();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [containers, setContainers] = useState<Container[]>(
    () => props.containers,
  );
  const [selectedContainers, setSelectedContainers] = useState<Container[]>([]);

  async function getContainers() {
    const res = await fetch('/api/docker');
    const json = await res.json();
    setContainers(json.containers);
  }

  async function containerAction(action: 'restart' | 'stop' | 'start') {
    setLoading(true);
    await fetch('/api/docker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
        containers: selectedContainers.map((container) => container.id),
      }),
    });
    await getContainers();
    setLoading(false);
  }

  useEffect(() => {
    getContainers();
    const interval = setInterval(() => {
      getContainers();
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedContainers.length > 0 &&
      selectedContainers.length < containers.length;
    setChecked(selectedContainers.length === containers.length);
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedContainers, containers]);

  function toggleAll() {
    setSelectedContainers(checked || indeterminate ? [] : containers);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Docker containers
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the docker images present in docker-compose.yml.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {selectedContainers.length > 0 && (
                <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => containerAction('restart')}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2.5 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Restart
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => containerAction('start')}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2.5 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Start
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => containerAction('stop')}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2.5 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Stop
                  </button>
                  {loading ? <LoadingSpinner color="text-indigo" /> : undefined}
                </div>
              )}
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="relative w-12 px-6 sm:w-16 sm:px-8"
                    >
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Started
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {containers.map((container) => {
                    const isSelected = selectedContainers.some(
                      (_container) => container.id === _container.id,
                    );
                    return (
                      <tr
                        key={container.id}
                        className={isSelected ? 'bg-gray-50' : undefined}
                        onClick={(e) => {
                          setSelectedContainers((state) =>
                            !isSelected
                              ? [...state, container]
                              : state.filter((p) => p.id !== container.id),
                          );
                        }}
                      >
                        <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                          {isSelected && (
                            <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                          )}
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30 focus:ring-indigo-500 sm:left-6"
                            value={container.id}
                            checked={isSelected}
                            disabled={loading}
                          />
                        </td>
                        <td
                          className={classNames(
                            'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                            isSelected ? 'text-indigo-600' : 'text-gray-900',
                          )}
                        >
                          {container.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <Status status={container.status} />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {container.isBuild ? '🔨' : '☁️'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {container.started ? (
                            <TimeAgo datetime={container.started} />
                          ) : undefined}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('http://localhost:3000/api/docker');
  const props = await res.json();
  return {
    props,
  };
};

export default Docker;
