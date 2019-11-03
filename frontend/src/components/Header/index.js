import React from 'react';
import styled from 'styled-components';
import { colors } from 'constants/theme';
import { useAuth } from 'enhancers/useAuth';

const Wrapper = styled.header`
  display: flex;
`;

const LogOutButton = styled.a`
  position: absolute;
  margin-left: 20em;
  padding-top: 0.4em;
  :hover {
    cursor: pointer;
    color: ${colors.secondary};
  }
`;

const Header = () => {
  const { user, signout } = useAuth();

  return (
    <Wrapper>
      <h1>Weight Boss</h1>
      {user && <LogOutButton onClick={() => signout()}>Log out</LogOutButton>}
    </Wrapper>
  );
};

export default Header;
