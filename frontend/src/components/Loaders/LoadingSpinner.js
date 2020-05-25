import React from 'react';
import styled from 'styled-components';

import { ReactComponent as SpinnerIcon } from 'images/spinner.svg';

const Wrapper = styled.div`
  margin: 2em auto;
  svg {
    height: 2em;
    animation: loading 1s linear infinite;
  }
`;

const LoadingSpinner = () => {
  return (
    <Wrapper>
      <SpinnerIcon />
    </Wrapper>
  );
};

export default LoadingSpinner;
