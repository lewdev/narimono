import React, { Fragment } from 'react';
//import { Route } from 'react-router-dom';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';

import Notifier from 'components/ui/Notifier';
import DrawerMenu from 'components/ui/DrawerMenu';

const styles = theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  main: {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      padding: 2 * theme.spacing.unit,
    },
  },
});

const App = () => (
  <Fragment>
    <CssBaseline />
    <DrawerMenu />
    <Notifier />
  </Fragment>
);

export default withStyles(styles)(App);