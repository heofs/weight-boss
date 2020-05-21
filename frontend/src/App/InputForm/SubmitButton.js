import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from 'constants/theme';
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

const SubmitButton = ({
  addWeight,
  weight,
  dateTime,
  children,
  ...otherProps
}) => {
  const [state, setState] = useState('ready');

  const onClick = () => {
    if (weight === '' || weight.includes(',')) {
      setState('error');
      return;
    }
    setState('loading');
    addWeight(weight, dateTime.getTime()).then((x) => {
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
    case 'error':
      setReady();
      return (
        <Button {...otherProps} disabled={true} warning={true}>
          Enter weight correctly
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
  addWeight: PropTypes.func,
  weight: PropTypes.string,
  dateTime: PropTypes.object,
};

export default SubmitButton;
