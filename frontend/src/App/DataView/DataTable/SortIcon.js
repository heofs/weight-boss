import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ReactComponent as IconSort } from 'images/icon_sort.svg';
import { colors } from 'constants/theme';

const Icon = styled.span`
  margin: 0;
  height: 1em;
  vertical-align: middle;
  svg {
    height: 1em;
    padding: 0 1em;
    .arrow-up {
      fill: ${(props) => (props.sort === 'up' ? colors.grey : colors.dark)};
    }
    .arrow-down {
      fill: ${(props) => (props.sort === 'down' ? colors.grey : colors.dark)};
    }
  }
`;

const SortIcon = ({ sort }) => (
  <Icon sort={sort}>
    <IconSort />
  </Icon>
);

SortIcon.propTypes = {
  sort: PropTypes.string,
};

export default SortIcon;
