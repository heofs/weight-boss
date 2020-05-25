import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from 'constants/theme';
import BaseButton from 'components/Buttons/BaseButton';

import { ReactComponent as SpinnerIcon } from 'images/spinner.svg';
import { ReactComponent as CheckedIcon } from 'images/checked.svg';

const Button = styled(BaseButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  margin: 2em auto;
  margin-bottom: 1.2em;
  padding: 0.5em 2em;
  width: 65%;
  height: 3em;
  font-weight: 500;
  ::-moz-focus-inner {
    border: 0;
  }

  svg {
    height: 1em;
    padding: 0;
  }
`;

const LoadingButton = styled(Button)`
  background-color: ${colors.darkPrimary};
  :hover {
    background-color: ${colors.darkPrimary};
    cursor: default;
  }
  svg {
    animation: loading 1s linear infinite;
  }
`;

const FinishedButton = styled(Button)`
  background-color: ${(props) => props.color};
  :hover {
    background-color: ${(props) => props.color};
    cursor: default;
  }

  span {
    display: block !important;
    font-size: 24px;
    animation: scale 0.5s linear;

    i {
      transform-origin: center center;
    }
  }

  svg {
    height: 0.8em;
  }
`;
const ErrorButton = styled(Button)`
  color: black;
  background-color: ${(props) => props.color};
  :hover {
    background-color: ${(props) => props.color};
    cursor: default;
  }
`;

const SubmitButton = ({
  addWeight,
  weight,
  dateTime,
  children,
  ...otherProps
}) => {
  const [state, setState] = useState('ready');
  const [text, setText] = useState('');

  const onClick = () => {
    if (weight === '') {
      setState('error');
      setText('Enter weight');
      return;
    }
    setState('loading');
    addWeight(weight, dateTime.getTime()).then(() => {
      setState('finished');
    });
  };

  const setReady = () => setTimeout(() => setState('ready'), 1600);

  switch (state) {
    case 'loading':
      return (
        <LoadingButton {...otherProps} disabled color="#57cc99">
          <SpinnerIcon />
        </LoadingButton>
      );
    case 'finished':
      setReady();
      return (
        <FinishedButton {...otherProps} disabled color="#3bb273">
          <span>
            <CheckedIcon />
          </span>
        </FinishedButton>
      );
    case 'error':
      setReady();
      return (
        <ErrorButton {...otherProps} disabled color="#f95738">
          {text}
        </ErrorButton>
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
  addWeight: PropTypes.func.isRequired,
  weight: PropTypes.string.isRequired,
  dateTime: PropTypes.instanceOf(Date).isRequired,
};

export default SubmitButton;
