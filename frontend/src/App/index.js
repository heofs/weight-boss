import React, { useState, useEffect } from 'react';
import { useAuth } from 'enhancers/useAuth';
import styled from 'styled-components';

import { colors, device } from 'constants/theme';

import Header from './Header';
import LoginPage from './LoginPage';
import InputForm from './InputForm';
import Footer from './Footer';

import LoadingPage from 'components/LoadingPage';
import DataView from './DataView';

import 'styles/index.scss';

const Wrapper = styled.div`
  color: ${colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 0 1em;
  max-width: 90vw;
  @media ${device.tablet} {
    max-width: 65vw;
  }
  @media ${device.desktop} {
    max-width: 55vw;
  }
  @media ${device.desktopLg} {
    max-width: 40vw;
  }
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
            <DataView />
          </>
        );
      })()}
      <Footer />
    </Wrapper>
  );
};

export default App;
