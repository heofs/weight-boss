import React, { useState, useEffect } from 'react';
import 'styles/index.css';
import { useAuth } from 'enhancers/useAuth';

import styled from 'styled-components';
import { colors } from './constants/theme';

import LoginPage from 'components/LoginPage';
import LoadingPage from 'components/LoadingPage';
import DataTable from 'components/DataTable';
import Header from 'components/Header';
import InputForm from 'components/InputForm';

const Wrapper = styled.div`
  color: ${colors.primary};
  background-color: ${colors.background};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* min-height: 100vh; */
  font-size: calc(10px + 2vmin);
`;

const App = () => {
  const { user } = useAuth();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== null && isLoading) {
      setLoading(false);
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Wrapper>
      <Header />
      <InputForm />
      <DataTable />
    </Wrapper>
  );
};

export default App;
