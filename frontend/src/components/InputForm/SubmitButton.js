import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  margin: 2em;
  padding: 0.5em;
`;

const SubmitButton = props => {
  return <Button {...props}>{props.children}</Button>;
};

SubmitButton.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SubmitButton;
