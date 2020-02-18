import React from 'react';
import styled from 'styled-components';
import { colors } from 'constants/theme';
import { useDatabase } from 'enhancers/useDatabase';

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2em;
  background-color: ${colors.danger};
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Anchor = styled.a`
  margin-left: 1em;
  color: blue;
`;

const OfflineBanner = (props) => {
  const { isOffline } = useDatabase();

  if (!isOffline) {
    return (
      <Wrapper>
        <p>You appear to be offline. Changes will not be saved. </p>
        <Anchor href="/">Try again</Anchor>
      </Wrapper>
    );
  }

  return null;
};

export default OfflineBanner;
