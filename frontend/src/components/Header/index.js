import React from 'react';
import styled from 'styled-components';
import { colors } from 'constants/theme';
import { useAuth } from 'enhancers/useAuth';

import { ReactComponent as Logo } from 'images/logo-weightboss.svg';

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${colors.text};
  margin-bottom: 2em;
`;

const LogOutContainer = styled.div`
  display: flex;
  align-items: right;
  margin: 0;
  justify-content: space-between;
  svg {
    visibility: hidden;
    height: 35px;
    margin: 1em;
    transform: rotate(-35deg);
  }
`;

const LogOutButton = styled.a`
  margin: 0.2em 0.5em;
  font-size: 1em;
  :hover {
    cursor: pointer;
    color: ${colors.secondary};
  }
`;

const LogoText = styled.h1`
  /* margin-top: 0.5em; */
  margin-top: 0;
`;

const LogoWrapper = styled.div`
  display: flex;
  /* svg {
    height: 60px;
    margin: 0.2em 2em;
  } */
  svg {
    height: 35px;
    margin: 1em;
    transform: rotate(-35deg);
  }
`;

const Header = () => {
  const { signout } = useAuth();

  return (
    <Wrapper>
      <LogOutContainer>
        <Logo />
        <LogOutButton onClick={() => signout()}>Log out</LogOutButton>
      </LogOutContainer>
      <LogoWrapper>
        <Logo />
        <LogoText>Weight Boss</LogoText>
      </LogoWrapper>
    </Wrapper>
  );
};

export default Header;
