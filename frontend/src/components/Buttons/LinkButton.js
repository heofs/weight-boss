import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  font-weight: 400;
  color: #007bff;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;

  :hover {
    color: #0056b3;
    text-decoration: underline;
  }

  :focus {
    border: none;
    outline: none;
    text-decoration: underline;
    box-shadow: none;
  }

  :disabled {
    color: #6c757d;
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
