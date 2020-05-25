import React from 'react';
import styled from 'styled-components';
import { colors } from 'constants/theme';
import { useAuth } from 'enhancers/useAuth';

import ContentWrapper from 'components/ContentWrapper';

import { ReactComponent as TextLogo } from 'images/logotext_weightboss.svg';
import { ReactComponent as IconLogo } from 'images/logoicon_weightboss.svg';

const Bar = styled.header`
  background-color: ${colors.dark};
  padding: 0 1em;
`;

const Content = styled(ContentWrapper)`
  display: flex;
  align-items: center;
  margin: 0 auto;
  color: ${colors.text};
  margin-bottom: 1em;
`;

const LogOutButton = styled.a`
  color: ${colors.text};
  margin-left: auto;
  font-size: 1em;
  font-weight: 400;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  :hover {
    cursor: pointer;
    color: ${colors.primary};
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    height: 1em;
    margin: 0.5em 0;
    margin-right: 1em;
  }
  svg:nth-child(2) {
    height: 1.5em;
  }
`;

const Header = () => {
  const { user, signout } = useAuth();

  return (
    <Bar>
      <Content>
        <LogoWrapper>
          <IconLogo />
          <TextLogo />
        </LogoWrapper>
        <LogOutButton onClick={() => signout()} visible={user}>
          Log out
        </LogOutButton>
      </Content>
    </Bar>
  );
};

export default Header;
