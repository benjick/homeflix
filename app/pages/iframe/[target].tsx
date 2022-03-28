import { useRef } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { services } from '../../src/services';

const Iframe: NextPage<{ link: string }> = ({ link }) => {
  const router = useRouter();
  const { target } = router.query;

  const iframe = useRef<HTMLIFrameElement>(null);

  function onIframeLoad() {
    if (iframe.current?.contentWindow) {
      iframe.current.style.height =
        iframe.current.contentWindow.document.documentElement.scrollHeight +
        20 +
        'px';
    }
  }

  return (
    <iframe
      className="-mt-6 w-full"
      ref={iframe}
      src={link}
      onLoad={onIframeLoad}
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
  const service = services.find((service) => service.link === `/${target}/`);
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
