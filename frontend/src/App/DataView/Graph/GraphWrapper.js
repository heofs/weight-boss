import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, sizes, device } from 'constants/theme';
import {
  contentWidthXs,
  contentWidthTablet,
  contentWidthDesktop,
  contentWidthDesktopLg,
} from 'components/ContentWrapper';

const graphHeight = 20;

const Wrapper = styled.div`
  color: ${colors.text};
  background-color: ${colors.lightBackground};
  border-radius: ${sizes.cornerRadius} ${sizes.cornerRadius} 0 0;
  margin: 0;
  margin-bottom: 1em;
  width: 554px;
  padding: 1em 0;
  height: ${graphHeight}rem;

  .recharts-wrapper {
    width: 554px;
    background-color: ${colors.lightBackground};
    padding-bottom: 0.8em;
    border-radius: 0 0 ${sizes.cornerRadius} ${sizes.cornerRadius};
  }
  svg.recharts-surface {
    width: 93%;
    height: ${graphHeight}rem;
  }
  p {
    height: 1em;
    margin: 0;
  }

  width: ${contentWidthXs};
  .recharts-wrapper {
    width: ${contentWidthXs};
  }
  @media ${device.tablet} {
    width: ${contentWidthTablet};
    .recharts-wrapper {
      width: ${contentWidthTablet};
    }
  }
  @media ${device.desktop} {
    width: ${contentWidthDesktop};
    .recharts-wrapper {
      width: ${contentWidthDesktop};
    }
  }

  @media ${device.desktopLg} {
    width: ${contentWidthDesktopLg};
    .recharts-wrapper {
      width: ${contentWidthDesktopLg};
    }
  }
`;

const GraphWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

GraphWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GraphWrapper;
