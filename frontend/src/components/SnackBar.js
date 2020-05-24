import React from 'react';
import styled from 'styled-components';
import { device } from 'constants/theme';

import SnackbarContent from '@bit/mui-org.material-ui.snackbar-content';

const SnackBar = styled(SnackbarContent)`
  width: 10em;
  @media ${device.tablet} {
    width: 3em;
  }
  padding-right: 3em;
  margin: 0.6em 0;
  max-width: 60vw;
`;

const LongTextSnackbar = () => {
  return (
    <div>
      <SnackBar message="Deleted weight." />
    </div>
  );
};

export default LongTextSnackbar;
