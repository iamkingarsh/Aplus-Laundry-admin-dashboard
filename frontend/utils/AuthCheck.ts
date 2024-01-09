import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthCheck = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('AplusToken');

    if (!token) {
      if (router.pathname !== '/login') {
        router.push('/login');
      }
    }
  }, [router.pathname]); // Add router.pathname as a dependency

  return {children};
};

export default AuthCheck;
