import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BaseButton from 'components/Buttons/BaseButton';
import { colors, animations } from 'constants/theme';

const Button = styled(BaseButton)`
  color: ${colors.text};
  background: ${colors.primary};
  font-size: 0.7em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 1em 2em;
  width: 65%;
  margin: 3em 0em;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all ${animations.speed} ease 0s;
  :hover {
    background: #434343;
    /* letter-spacing: 1px; */
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all ${animations.speed} ease 0s;
  }
`;

const SubmitButton = (props) => {
  return <Button {...props}>{props.children}</Button>;
};

SubmitButton.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SubmitButton;
