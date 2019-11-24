import React, { useState, useEffect } from 'react';
import { useAuth } from 'enhancers/useAuth';
import styled from 'styled-components';

import { colors } from 'constants/theme';

import Header from './Header';
import LoginPage from './LoginPage';
import DataTable from './DataTable';
import InputForm from './InputForm';
import Graph from './Graph';

import LoadingPage from 'components/LoadingPage';

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
