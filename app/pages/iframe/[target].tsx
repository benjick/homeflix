import { useEffect } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { services } from '../../src/services';

const Iframe: NextPage<{ link: string }> = ({ link }) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, []);

  return (
    <iframe
      className="-my-6 w-full"
      style={{ height: 'calc(100vh - 52px)' }}
      src={link}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const target = context.params?.target;
  if (target === 'test') {
    return {
      props: {
        link: '/iframe-test.html',
      },
    };
  }
  const service = services.find((service) => service.id === target);
  if (!service) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      link: service.link,
    },
  };
};

export default Iframe;
