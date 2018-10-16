import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  // Typography,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  // Assignment as MainIcon,
} from '@material-ui/icons';

const styles = {
  topBanner: {
    textTransform: "none",
    fontWeight: "normal",
    fontSize: 20,
    fontStyle: "italic",
    margin: "0",
    position: "relative",
    left: -8,
  },
  topBannerFirst: {
    fontWeight: "bold",
  },
  topPageTitle: {
    fontFamily: "Roboto",
    textTransform: "none",
    fontWeight: "normal",
    fontSize: 20,
    marginLeft: "1em",
  },
};

class AppHeader extends React.Component {
  render() {
    const { classes, drawerToggle, pageTitle } = this.props;
    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            <div className={classes.logoIcon}>
              {/* <img src="/images/"
                alt="Heroes &amp; Empires"
                style={{ height: 33 }} /> */}
                LOGO
            </div>

            <h3 style={styles.topBanner}>
              Narimono
            </h3>
          </Button>
          <div id="pageTitle" style={styles.topPageTitle}>{pageTitle}</div>
          <div className={classes.flex} />
          {/* <LoginButton /> */}
        </Toolbar>
      </AppBar>
    );
  };
}
export default AppHeader;