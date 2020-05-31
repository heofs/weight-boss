import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const roundNumber = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload) {
    const message = `${roundNumber(payload[0].value)}kg at ${dayjs(label).format(
      'DD/MM/YY - HH:mm'
    )}`;

    return <p>{message}</p>;
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool.isRequired,
  // eslint-disable-next-line
  payload: PropTypes.array.isRequired,
  label: PropTypes.number,
};

CustomTooltip.defaultProps = {
  label: 0,
};

export default CustomTooltip;
