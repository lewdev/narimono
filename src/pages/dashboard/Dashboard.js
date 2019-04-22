import React, { Fragment } from 'react';
import { withRouter, Route, Redirect, Link } from 'react-router-dom';
import {
  withStyles, Typography, Button,
  Card, CardContent, CardActions,
  Modal, Grid, List, ListItem, ListItemText,
} from '@material-ui/core';
// import {
//   Add as AddIcon,
//   // Delete as DeleteIcon,
//   // Accessibility as PersonIcon,
//   AccountCircle as ProfileIcon,
// } from '@material-ui/icons';
import { find } from 'lodash';
import { compose } from 'recompose';

import { instrumentList } from 'data/InstrumentData';
import BasePage from 'pages/BasePage';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridRoot: {
    flexGrow: 1,
    minWidth: 650,
    margin: "0 auto",
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  parentMenu: {
    display: "inline-flex",
    //padding: 10,
    marginTop: 5,
  },
  instrumentMenu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Dashboard extends BasePage {
  componentDidMount() {
    this.setPageTitle("Dashboard");
    this.loadData();
  }

  componentWillUnmount() {
    this.saveData();
  }

  loadData() {
    const stringData = localStorage.getItem("narimono");
    if (stringData) {
      const data = JSON.parse(stringData);
    }
  }

  saveData = () => {
    const data = {
    }
    localStorage.setItem("narimono", JSON.stringify(data));
  }

  renderPostDelete = ({ match: { params: { id } } }) => {
    if (this.state.loading) return null;
    const person = find(this.state.persons, { id: Number(id) });

    if (!person && id !== 'new') return <Redirect to="/person" />;

    return (
      <Modal className={styles.modal} onClose={() => this.props.history.push('/person')} open>
        <Card className={styles.modalCard}>
          <CardContent className={styles.modalCardContent}>
            Are you sure you want to delete "{person.title}"?
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => this.deletePostGo(person)}>Yes</Button>
            <Button size="small" onClick={() => this.props.history.push('/person')}>No</Button>
          </CardActions>
        </Card>
      </Modal>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Grid container className={classes.gridRoot}>
          <Grid key="mainCol1">
            <Grid>
              <Typography variant="display1">Instruments</Typography>
            </Grid>
            <Grid className={classes.instrumentMenu}>
              <List component="nav">
                {instrumentList.map(instrument => 
                  <ListItem key={'instrument-' + instrument} button component={Link} to={'/' + instrument}>
                    <ListItemText primary={instrument} />
                  </ListItem>
                )}
              </List>
            </Grid>
          </Grid>
          <Grid key="mainCol2" className={classes.mainCol}>
            <Typography variant="display1">Options</Typography>
            <Grid className={classes.parentMenu}>
              <List component="nav">
                <ListItem button>
                  <ListItemText primary="Stats" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
)(Dashboard);