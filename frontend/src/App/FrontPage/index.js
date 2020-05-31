import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

import LoginPage from 'App/LoginPage';

const Text = styled.h2`
  margin: 1em;
  margin-top: 1.5em;
`;

const Wrapper = styled.div`
  margin-top: 0;
`;

const PlayerWrapper = styled.div`
  max-width: 90vw;
  .react-player {
    max-width: 90vw;
  }
`;

export const Frontpage = () => {
  return (
    <Wrapper>
      <Text>Sign in to start logging your weight</Text>
      <LoginPage />
      <Text>See how it works</Text>
      <PlayerWrapper>
        <ReactPlayer
          className="react-player"
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
        />
      </PlayerWrapper>
    </Wrapper>
  );
};

export default Frontpage;
