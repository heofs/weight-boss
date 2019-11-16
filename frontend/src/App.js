import React, { useState, useEffect } from 'react';
import 'styles/index.scss';
import { useAuth } from 'enhancers/useAuth';

import styled from 'styled-components';
import { colors } from './constants/theme';

import LoginPage from 'components/LoginPage/index.js';
import LoadingPage from 'components/LoadingPage';
import DataTable from 'components/DataTable';
import Header from 'components/Header';
import InputForm from 'components/InputForm';
import Graph from 'components/Graph';

const Wrapper = styled.div`
  color: ${colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 30em;
  margin: 0 auto;
`;

const App = () => {
  const { user } = useAuth();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== null && isLoading) {
      setLoading(false);
    }
  }, [user, isLoading]);

  return (
    <Wrapper>
      <Header />
      {(() => {
        if (isLoading) {
          return <LoadingPage />;
        }
        if (!user) {
          return <LoginPage />;
        }
        return (
          <>
            <InputForm />
            <Graph />
            <DataTable />
          </>
        );
      })()}
    </Wrapper>
  );
};

export default App;
