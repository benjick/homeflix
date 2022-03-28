import Link from 'next/link';
import {
  HomeIcon,
  AdjustmentsIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import homeflix from '../public/images/homeflix.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSidebar } from '../src/state/global';
import { services } from '../src/services';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Docker', href: '/docker', icon: AdjustmentsIcon },
  { name: 'IP addresses', href: '/ip', icon: InformationCircleIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const Sidebar: React.FC = () => {
  const { setSidebarOpen } = useSidebar();
  const { pathname, query } = useRouter();

  return (
    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
      <div className="flex-shrink-0 flex items-center px-4">
        <div className="w-full px-16">
          <Image src={homeflix} alt="Homeflix" />
        </div>
      </div>
      <nav>
        <div className="mt-5 px-2 space-y-1">
          {navigation.map((item) => {
            const current = pathname === item.href;
            return (
              <Link href={item.href} key={item.name}>
                <a
                  onClick={() => setSidebarOpen(false)}
                  className={classNames(
                    current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                  )}
                >
                  <item.icon
                    className={classNames(
                      current
                        ? 'text-gray-300'
                        : 'text-gray-400 group-hover:text-gray-300',
                      'mr-4 flex-shrink-0 h-6 w-6',
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              </Link>
            );
          })}
        </div>
        <div className="mt-5 px-2 space-y-1">
          <h3
            className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            id="projects-headline"
          >
            Services
          </h3>
          <div>
            {services.map((item) => {
              const current =
                pathname === '/iframe/[target]' && query?.target === item.id;
              return (
                <Link href={`/iframe/${item.id}`} key={item.name}>
                  <a
                    key={item.name}
                    onClick={() => setSidebarOpen(false)}
                    className={classNames(
                      current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-3 py-2 text-sm font-medium rounded-md',
                    )}
                  >
                    <span className="truncate">{item.name}</span>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};
