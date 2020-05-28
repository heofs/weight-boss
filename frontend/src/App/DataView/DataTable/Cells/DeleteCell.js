import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ButtonDelete from '../ButtonDelete';

const Wrapper = styled.div`
  text-align: center;
`;

const deleteCell = (deleteWeight, addToast) => ({ cell }) => (
  <Wrapper>
    <ButtonDelete
      onConfirm={() => {
        deleteWeight(cell.value);
        addToast();
      }}
    />
  </Wrapper>
);

deleteCell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.number,
  }).isRequired,
  deleteWeight: PropTypes.func.isRequired,
  addToast: PropTypes.func.isRequired,
};

export default deleteCell;
