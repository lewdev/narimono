import React, { Fragment } from 'react';
import { withRouter, Route, Redirect, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import {
  withStyles, Button,
  Card, CardContent, CardActions,
  Modal, //Grid, List, ListItem, ListItemText,
} from '@material-ui/core';
// import {
//   Add as AddIcon,
//   // Delete as DeleteIcon,
//   // Accessibility as PersonIcon,
//   AccountCircle as ProfileIcon,
// } from '@material-ui/icons';
import { find } from 'lodash';
import { compose } from 'recompose';

//import { instrumentList } from 'data/InstrumentData';
import InstrumentAction from 'pages/instrument/InstrumentAction';
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

@observer
class Hyoshigi extends React.Component {
  render() {
    const { action } = this.props;
    return (
      <Fragment>
        <table class="narimono-btn-table">
          <tr>
            <td><Button className="two-btn btn btn-secondary" onClick={() => action.playSoundByName('Hyoshigi')}>&verbar; &verbar;</Button></td>
          </tr>
        </table>
      </Fragment>
    );
  }
}

export default compose(withStyles(styles))(Hyoshigi);