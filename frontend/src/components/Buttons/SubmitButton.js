import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BaseButton from 'components/Buttons/BaseButton';

const Button = styled(BaseButton)`
  text-transform: uppercase;
  margin: 2rem 0em;
  padding: 1em 2em;
  width: 65%;
`;

const SubmitButton = ({ onSubmit, children, ...otherProps }) => {
  const [state, setState] = useState('ready');

  const onClick = () => {
    setState('loading');
    onSubmit().then(() => setState('ready'));
  };

  switch (state) {
    case 'loading':
      return (
        <Button {...otherProps} disabled={true}>
          Saving...
        </Button>
      );
    default:
      return (
        <Button {...otherProps} onClick={onClick}>
          {children}
        </Button>
      );
  }
};

SubmitButton.propTypes = {
  children: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
};

export default SubmitButton;
