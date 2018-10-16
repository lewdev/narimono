import React, { Fragment } from 'react';
import { withRouter, Route, Redirect, Link } from 'react-router-dom';
import {
  IconButton,
  Table, TableBody, TableRow, TableCell,
  withStyles,
  Typography, FormLabel,
  Button,
  Card, CardContent, CardActions,
  Modal,
  Paper,
  List,
  Grid, ListSubheader,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Accessibility as PersonIcon,
  AccountCircle as ProfileIcon,
} from '@material-ui/icons';
import { find, orderBy } from 'lodash';
import { compose } from 'recompose';

import { generateName } from '../utils/NameGenerator';
import Notifier, { notify } from '../components/ui/Notifier';
import { getRandomInt, getRandomBool } from '../utils/NumberUtils';
import BasePage from './BasePage';

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
  button: {
    margin: theme.spacing.unit,
  },
  inventoryMenu: {
    backgroundColor: "#fffda5",
  },
  galleyMenu: {
    backgroundColor: "#ededed",
  },
  alertsMenu: {
    backgroundColor: "#ffbaba",
  },
  listIcon: {
    marginRight: 0,
  },
});

class Dashboard extends BasePage {
  state = {
    currentUser: null,
    personTable: { index: 0, price: { food: 10 }, list: [] },
    homeTable: { index: 0, price: { wood: 10 }, list: [] },
    farmTable: { index: 0, price: { wood: 10 }, list: [] },
    selectedPerson: null,
    kingdom: null,
  };

  componentDidMount() {
    console.log('  componentDidMount()');
    this.setPageTitle("Introduction");
    this.loadData();
    window.addEventListener("beforeunload", this.saveData, false);
    this.collectionInterval = setInterval({

    }, 100)
  }

  componentWillUnmount() {
    this.saveData();
  }

  addResource = (resource) => {
    let kingdom = this.state.kingdom;
    addResource(kingdom, resource);
    this.setState({ kingdom });
  }

  buyPerson = () => {
    const { personTable, kingdom } = this.state;
    buyPerson(kingdom, personTable);
    this.setState({ kingdom, personTable })
  }

  generatePerson() {
    return {
      name: generateName(),
      age: 18 + getRandomInt(10),
      gender: getRandomBool() ? 'male' : 'female',
      strength: getRandomInt(100),
      intelligence: getRandomInt(100),
      charisma: getRandomInt(100),
      assignedRole: null,
      experience: 0,
    }
  }

  loadData() {
    const stringData = localStorage.getItem("populous");
    if (stringData) {
      const data = JSON.parse(stringData);
      let currentUser = data.currentUser;
      let personTable = data.personTable;
      let kingdom = data.kingdom;
      if (!currentUser) {
        currentUser = {
          name: generateName() + " " + generateName(),
        };
        //localStorage.
      }
      if (!personTable) {
        personTable = { index: 0, list: [] };
      }
      if (!kingdom) {
        kingdom = {
          name: generateName() + " Kingdom",
          food: 0,
          wood: 0,
          stone: 0,
        };
      }
      this.setState({ currentUser: currentUser, personTable: personTable,
        kingdom: kingdom,
        //food: kingdom.food, wood: kingdom.wood, stone: kingdom.stone,
      });
    }
  }

  saveData = () => {
    console.log("||||||||||||| saveData = () => {");
    const { currentUser, personTable, kingdom } = this.state;
    const data = {
      currentUser,
      personTable,
      // kingdom: { name: kingdom.name, food, wood, stone, },
      kingdom,
    }
    localStorage.setItem("populous", JSON.stringify(data));
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
    const { loading, personTable, kingdom, } = this.state;

    return (
      <Fragment>
        <Grid container className={classes.gridRoot}>
          <Grid key="headerRow" container className={classes.gridRoot} spacing={16}
            direction="row" justify="space-between" alignItems="baseline">
            <Grid>
              <ListSubheader component="span">{kingdom ? kingdom.name : 'Your'} Kingdom</ListSubheader>
            </Grid>
            <Grid style={{ marginLeft: 'auto' }}>
              <IconButton component={Link} color="inherit" to={'/profile/edit'}>
                <ProfileIcon/>
              </IconButton>
            </Grid>
          </Grid>
          <Grid key="resourcesRow" container className={classes.gridRoot} spacing={16}
            direction="row" justify="space-between" alignItems="baseline">
            <Grid key='Food'>
              <FormLabel>Food: {kingdom ? kingdom.food : 0}</FormLabel>
            </Grid>
            <Grid key='Wood'>
              <FormLabel>Wood: {kingdom ? kingdom.wood : 0}</FormLabel>
            </Grid>
            <Grid key='Stone'>
              <FormLabel>Stone: {kingdom ? kingdom.stone : 0}</FormLabel>
            </Grid>
            <Grid key='Population'>
              <FormLabel>Population: {personTable.list.length}</FormLabel>
            </Grid>
          </Grid>
          <Grid key="clickResourcesRow" container className={classes.gridRoot} spacing={16}
            direction="row"
            justify="space-between"
            alignItems="baseline">
            <Grid key='foodBtn'>
              <Button variant="outlined" color="primary" className={classes.button}
                onClick={() => this.addResource('food')}>
                <AddIcon /> Food
              </Button>
            </Grid>
            <Grid key='woodBtn'>
              <Button variant="outlined" color="primary" className={classes.button}
                onClick={() => this.addResource('wood')}>
                <AddIcon /> Wood
              </Button>
            </Grid>
            <Grid key='stoneBtn'>
              <Button variant="outlined" color="primary" className={classes.button}
                onClick={() => this.addResource('stone')}>
                <AddIcon /> Stone
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {loading ? 'Loading...' : ''}

        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                People
              </TableCell>
              <TableCell>
                <Button onClick={this.buyPerson}><AddIcon/></Button>
              </TableCell>
              <TableCell>
                <Button onClick={this.buyPerson}><AddIcon/></Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Button onClick={this.saveData}>Save Data</Button>

        <Notifier />
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
)(Dashboard);