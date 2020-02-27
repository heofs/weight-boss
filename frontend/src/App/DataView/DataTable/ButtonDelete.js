import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';

import { animations } from 'constants/theme';
import { ReactComponent as IconTrash } from 'images/icon-trash.svg';

const Button = styled.button`
  background: none;
  border: none;
  height: 3em;
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
  const { addToast } = useToasts();

  const onDelete = () => {
    onConfirm().then(() => {
      addToast('Saved Successfully', { appearance: 'success' });
    });
  };
  return (
    <Button onClick={onDelete}>
      <IconTrash />
    </Button>
  );
};

ButtonDelete.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

export default ButtonDelete;
