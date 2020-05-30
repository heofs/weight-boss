import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from 'constants/theme';

const Button = styled.button`
  font-weight: 400;
  color: ${colors.violet};
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;

  :hover {
    color: #a3a3a3;
    text-decoration: underline;
  }

  /* Remove dotter line around focued element */
  /* ::-moz-focus-inner {
    border: 0;
  } */

  :focus {
    border: none;
    outline: none;
    text-decoration: none;
    box-shadow: none;
  }

  :disabled {
    color: ${colors.darkSecondary};
    font-weight: bold;
    pointer-events: none;
  }
`;

const LinkButton = ({ children, ...otherProps }) => {
  return <Button {...otherProps}>{children}</Button>;
};

LinkButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LinkButton;
