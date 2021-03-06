import React from 'react';
import PropTypes from 'prop-types';
import { Route, } from 'react-router-dom';
import { withStyles, } from '@material-ui/core';

import AppHeader from 'components/AppHeader'
import DrawerLayout from 'components/ui/DrawerLayout'

import Dashboard from 'pages/dashboard/Dashboard';
import Instrument from 'pages/instrument/Instrument';
import { instrumentList } from 'data/InstrumentData';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    position: 'absolute',
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  flex: {
    flex: 1,
  },
  logoIcon: {
    padding: 5,
  }
});

class DrawerMenu extends React.Component {
  state = {
    drawerOpen: false,
    pageTitle: "",
  };

  changePageTitle = (pageTitle) => {
    this.setState({ pageTitle: pageTitle });
  }

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppHeader classes={classes}
          drawerToggle={this.handleDrawerToggle} />
        <DrawerLayout theme={classes.theme} classes={classes}
          drawerToggle={this.handleDrawerToggle}
          drawerOpen={this.state.drawerOpen}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route exact path="/" component={Dashboard} />
          {instrumentList.map(instrument => 
            <Route exact path={"/" + instrument} component={Instrument} />
          )}
        </main>
      </div>
    );
  }
}

DrawerMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DrawerMenu);