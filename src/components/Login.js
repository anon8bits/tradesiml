import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import styles from './css/Login.module.css';
import Loading from './Loading.js';

const Login = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    if (!isLoading && !isAuthenticated) {
      timer = setTimeout(() => {
        loginWithRedirect();
      }, 2000);
    }

    if (!isLoading && isAuthenticated) {
      navigate('/');
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAuthenticated, isLoading, loginWithRedirect, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <label>{isAuthenticated ? 'Redirecting...' : 'Redirecting to login...'}</label>
        <div className={styles.loading}></div>
      </div>
    </div>
  );
};

export default Login;