import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import homeflix from '../public/images/homeflix.png';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { Footer } from './Footer';
import { useSidebar } from '../src/state/global';
import { Sidebar } from './Sidebar';
import { useRouter } from 'next/router';

export const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  const isIframe = pathname.startsWith('/iframe');
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const handlers = useSwipeable({
    onSwipedRight: (event) => {
      if (event.initial[0] < window.innerWidth / 3) {
        setSidebarOpen(true);
      }
    },
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <Sidebar />
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        <div className="flex flex-col flex-1" {...handlers}>
          <div className="sticky top-0 z-10 pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100 flex">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="h-12 max-h-12 w-full text-center mr-12">
              <Image
                src={homeflix}
                width="290px"
                height="48px"
                objectFit="contain"
                alt="Homeflix"
              />
            </div>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div
                className={classNames(
                  'mx-auto',
                  !isIframe ? 'max-w-7xl px-4 sm:px-6 md:px-8' : '',
                )}
              >
                {children}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};
