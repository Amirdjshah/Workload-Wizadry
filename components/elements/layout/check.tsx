import { useEffect } from 'react';
import { useRouter } from 'next/router';

const CheckAccessToken = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
    //   router.push('/login'); // Redirect to the login page if accessToken is not present
    }
  }, []);

  return null; // This component doesn't render anything, it's just for handling the check and redirection
};

export default CheckAccessToken;