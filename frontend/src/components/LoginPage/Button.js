import React from 'react';
import styled from 'styled-components';
import BaseButton from 'components/Buttons/BaseButton';

const StyledButton = styled(BaseButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2.5em;
  margin: 1em 0;
  font-size: 1em;
  white-space: nowrap;
  svg {
    height: 2em;
    margin-right: 0.6em;
  }
`;

const Button = ({ children, onClick, icon: Icon }) => {
  return (
    <StyledButton onClick={onClick}>
      {Icon && <Icon />}
      {children}
    </StyledButton>
  );
};

export default Button;
