import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RootPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/blog');
  }, [router]);

  return <div />;
};

export default RootPage;
