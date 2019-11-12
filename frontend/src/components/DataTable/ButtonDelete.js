import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors, animations } from 'constants/theme';

import { ReactComponent as IconTrash } from 'images/icon-trash.svg';

const Button = styled.button`
  /* padding: 1em; */
  background: none;
  border: none;
  svg {
    height: 2em;
    transition: all ${animations.speed} ease 0s;
    :hover {
      height: 3em;
      transition: all ${animations.speed} ease 0s;
    }
  }
`;

const Delete = styled.button`
  color: ${colors.text};
  background-color: ${colors.danger};
  border-color: ${colors.danger};
  display: inline-block;
  font-weight: 400;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const ButtonDelete = ({ onConfirm }) => {
  const [isClicked, setClicked] = useState();

  if (isClicked) {
    return <Delete onClick={onConfirm}>DELETE</Delete>;
  }

  return (
    <Button onClick={() => setClicked(true)}>
      <IconTrash />
    </Button>
  );
};

ButtonDelete.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

export default ButtonDelete;
