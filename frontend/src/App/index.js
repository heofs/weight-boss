import React, { useState, useEffect } from 'react';
import { useAuth } from 'enhancers/useAuth';
import styled from 'styled-components';

import { colors } from 'constants/theme';

import LoginPage from 'components/LoginPage/index.js';
import LoadingPage from 'components/LoadingPage';
import DataTable from 'components/DataTable';
import Header from 'components/Header';
import InputForm from 'components/InputForm';
import Graph from 'components/Graph';

import 'styles/index.scss';

const Wrapper = styled.div`
  color: ${colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 30em;
  margin: 0 auto;
  padding: 0 1em;
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
            <Graph height={300} width={500} />
            <DataTable />
          </>
        );
      })()}
    </Wrapper>
  );
};

export default App;
