import React from 'react';
import styled from 'styled-components';
import { colors, animations, sizes } from 'constants/theme';

const Button = styled.a`
  font-size: ${sizes.smallerText};
  margin: 0.8em 0;
  cursor: pointer;
  color: ${colors.primary};
  :hover {
    transition: all ${animations.speed} ease 0s;
    text-decoration: underline;
  }
`;

const LinkButton = ({ onClick, children }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default LinkButton;
