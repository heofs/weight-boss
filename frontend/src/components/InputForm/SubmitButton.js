import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BaseButton from 'components/Buttons/BaseButton';

const Button = styled(BaseButton)`
  margin: 2em;
  padding: 0.5em;
`;

const SubmitButton = (props) => {
  return <Button {...props}>{props.children}</Button>;
};

SubmitButton.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SubmitButton;
