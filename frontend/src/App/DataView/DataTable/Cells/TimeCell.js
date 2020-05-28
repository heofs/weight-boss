import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const TimeCell = ({ cell }) => (
  <span>{dayjs(cell.value).format('DD/MM/YYYY - HH:mm')}</span>
);

TimeCell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.number,
  }).isRequired,
};

export default TimeCell;
