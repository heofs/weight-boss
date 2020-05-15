import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, animations } from 'constants/theme';
import BaseButton from 'components/Buttons/BaseButton';

const Button = styled(BaseButton)`
  text-transform: uppercase;
  margin: 2rem 0em;
  padding: 1em 2em;
  width: 65%;
  ::-moz-focus-inner {
    border: 0;
  }
  ${(props) => props.warning && `color: ${colors.danger};`};
`;

const SubmitButton = ({ onSubmit, children, ...otherProps }) => {
  const [state, setState] = useState('ready');

  const onClick = () => {
    setState('loading');
    onSubmit().then((x) => {
      if (x === 'missing-weight') {
        setState(x);
        return;
      }
      setState('ready');
    });
  };

  const setReady = () => {
    setTimeout(() => setState('ready'), 1600);
  };

  switch (state) {
    case 'loading':
      return (
        <Button {...otherProps} disabled={true}>
          Saving...
        </Button>
      );
    case 'missing-weight':
      setReady();
      return (
        <Button {...otherProps} disabled={true} warning={true}>
          No weight added
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
