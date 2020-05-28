import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { animations } from 'constants/theme';
import { ReactComponent as IconTrash } from 'images/icon-trash.svg';

const Button = styled.button`
  background: none;
  border: none;
  height: 3em;
  cursor: pointer;
  svg {
    padding: 0;
    margin: 0;
    height: 2em;
    transition: all ${animations.speed} ease-in 0s;

    :hover {
      height: 2.3em;
      transition: all ${animations.speed} ease 0s;
    }
  }
`;

const ButtonDelete = ({ onConfirm }) => {
  return (
    <Button onClick={onConfirm}>
      <IconTrash />
    </Button>
  );
};

ButtonDelete.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

export default ButtonDelete;
