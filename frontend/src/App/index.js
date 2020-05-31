import React, { useState, useEffect } from 'react';
import { useAuth } from 'enhancers/useAuth';
import styled from 'styled-components';

import { colors } from 'constants/theme';

import LoadingSpinner from 'components/Loaders/LoadingSpinner';
import ContentWrapper from 'components/ContentWrapper';

import Header from './Header';
import FrontPage from './FrontPage';
import InputForm from './InputForm';
import Footer from './Footer';

import DataView from './DataView';

import 'styles/index.scss';

const Wrapper = styled(ContentWrapper)`
  color: ${colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
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
    <>
      <Header />
      <Wrapper>
        {(() => {
          if (isLoading) {
            return <LoadingSpinner />;
          }
          if (!user) {
            return <FrontPage />;
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
    </>
  );
};

export default App;
