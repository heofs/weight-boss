import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BaseButton from 'components/Buttons/BaseButton';

const Button = styled(BaseButton)`
  text-transform: uppercase;
  margin: 3em 0em;
  padding: 1em 2em;
  width: 65%;
`;

const SubmitButton = (props) => {
  return <Button {...props}>{props.children}</Button>;
};

SubmitButton.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SubmitButton;
