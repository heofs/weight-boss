import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@bit/mui-org.material-ui.styles';
import SnackbarContent from '@bit/mui-org.material-ui.snackbar-content';

const styles = (theme) => ({
  snackbar: {
    width: '3em',
    paddingRight: '3em',
    margin: '0.6em 0',
  },
});

function LongTextSnackbar(props) {
  const { classes } = props;

  return (
    <div>
      <SnackbarContent className={classes.snackbar} message="Deleted weight." />
    </div>
  );
}

LongTextSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LongTextSnackbar);
