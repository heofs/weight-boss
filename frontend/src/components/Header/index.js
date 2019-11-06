import React from 'react';
import styled from 'styled-components';
import { colors } from 'constants/theme';
import { useAuth } from 'enhancers/useAuth';

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LogOutContainer = styled.div`
  display: flex;
  align-items: right;
  margin: 0;
  justify-content: flex-end;
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
  margin-top: 0.5em;
`;

const Header = () => {
  const { user, signout } = useAuth();

  return (
    <Wrapper>
      {user && (
        <LogOutContainer>
          <LogOutButton onClick={() => signout()}>Log out</LogOutButton>
        </LogOutContainer>
      )}
      {/* <LogoText>Weight Boss</LogoText> */}
    </Wrapper>
  );
};

export default Header;
