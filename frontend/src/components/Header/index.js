import React from 'react';
import styled from 'styled-components';
import { colors, sizes } from 'constants/theme';
import { useAuth } from 'enhancers/useAuth';

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;

  width: 100%;
  color: ${colors.text};
  margin-bottom: 2em;
`;

const LogOutContainer = styled.div`
  display: flex;
  margin: 0;
  justify-content: flex-end;
`;

const LogOutButton = styled.a`
  margin: 0.2em 0.5em;
  font-size: ${sizes.textSize};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  :hover {
    cursor: pointer;
    color: ${colors.secondary};
  }
`;

const LogoText = styled.h1`
  font-size: 3.3rem;
  margin: 0;
  font-weight: 600;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  svg {
    height: 1.1em;
    margin: 1em;
    transform: rotate(-35deg);
  }
`;

const Header = () => {
  const { user, signout } = useAuth();

  return (
    <Wrapper>
      <LogOutContainer>
        <LogOutButton onClick={() => signout()} visible={user}>
          Log out
        </LogOutButton>
      </LogOutContainer>
      <LogoWrapper>
        <LogoText>Weight Boss</LogoText>
      </LogoWrapper>
    </Wrapper>
  );
};

export default Header;
