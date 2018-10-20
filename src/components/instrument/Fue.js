import React, { Fragment } from 'react';
import { withRouter, Route, Redirect, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import {
  withStyles, Button,
  // Card, CardContent, CardActions,
  // Modal, Grid, List, ListItem, ListItemText,
} from '@material-ui/core';
import { compose } from 'recompose';



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
class Fue extends React.Component {
  render() {
    //const { classes } = this.props;
    const { playSoundByName } = this.instrumentAction;
    return (
      <Fragment>
        <table class="narimono-btn-table">
        <tr>
          <td rowspan="2">
            <button class="fue-btn btn btn-secondary" onclick={playSoundByName('Fue-2')}>2</button>
          </td>
          <td rowspan="2">
            <button class="fue-btn btn btn-secondary" onclick={playSoundByName('Fue-3')}>3</button>
          </td>
          <td>
            <button class="fue-btn short btn btn-secondary" onclick={playSoundByName('Fue-5')}>5</button>
          </td>
          <td>
            <button class="fue-btn short btn btn-secondary" onclick={playSoundByName('Fue-6')}>6</button>
          </td>
          <td rowspan="2">
            <button class="fue-btn btn btn-secondary" onclick={playSoundByName('Fue-7')}>7</button>
          </td>
        </tr>
        <tr>
          <td>
            <button class="fue-btn short btn btn-secondary" onclick={playSoundByName('Fue-5-high')}>5 ^</button>
          </td>
          <td>
            <button class="fue-btn short btn btn-secondary" onclick={playSoundByName('Fue-6-high')}>6 ^</button>
          </td>
        </tr>
      </table>
      </Fragment>
    );
  }
}

export default compose(withStyles(styles))(Fue);