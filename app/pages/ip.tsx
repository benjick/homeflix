import { useEffect, useRef, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { XCircleIcon } from '@heroicons/react/solid';
import { CheckCircleIcon } from '@heroicons/react/solid';
import absoluteUrl from 'next-absolute-url';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Alert: React.FC<{ title: string; text: string }> = ({ title, text }) => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <div className="mt-2 text-sm text-red-700">{text}</div>
        </div>
      </div>
    </div>
  );
};

const Success: React.FC<{ title: string; text: string }> = ({
  title,
  text,
}) => {
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">{title}</h3>
          <div className="mt-2 text-sm text-green-700">{text}</div>
        </div>
      </div>
    </div>
  );
};

const Ip: NextPage<{
  server: string;
  wireguard: string;
  logs?: string;
}> = ({ server, wireguard, logs }) => {
  const pre = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (pre.current) {
      pre.current.scroll({
        top: pre.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  function renderInfoBox() {
    if (wireguard === 'error') {
      return (
        <Alert
          text="Could probably not start the container, you might need to create it."
          title="Wireguard error"
        />
      );
    }
    if (wireguard === server) {
      return (
        <Alert
          text="IP address are matching which means Wireguard probably isn't working. Check the logs."
          title="Wireguard error"
        />
      );
    }
    return (
      <Success
        text="It seems like everything is working!"
        title="Wireguard success"
      />
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {renderInfoBox()}
      <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">
        IP addresses
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            Server IP address
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            <code>{server}</code>
          </dd>
        </div>
        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            Wireguard IP address
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            <code>{wireguard}</code>
          </dd>
        </div>
      </dl>
      {logs ? (
        <>
          <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">
            Wireguard container logs
          </h3>
          <pre
            ref={pre}
            className="mt-5 h-96 text-sm overflow-scroll bg-black text-white p-2 rounded-lg"
          >
            {logs}
          </pre>
        </>
      ) : undefined}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('http://localhost:3000/api/ip');
  const props = await res.json();
  return {
    props,
  };
};

export default Ip;
