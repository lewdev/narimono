import React, { Fragment } from 'react';
import { withRouter, Route, Redirect, } from 'react-router-dom';
import { observer } from 'mobx-react';
import {
  withStyles, Button,
  Card, CardContent, CardActions,
  Modal,
} from '@material-ui/core';
//import { find } from 'lodash';
import { compose } from 'recompose';

import Song             from 'components/song/Song';
import Hyoshigi         from 'components/instrument/Hyoshigi';
import InstrumentAction from 'pages/instrument/InstrumentAction';
import BasePage         from 'pages/BasePage';

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
class Instrument extends BasePage {
  instrumentAction = null;

  componentWillMount() {
    this.instrumentAction = new InstrumentAction();
  }
  componentDidMount() {
    const pathname = this.props.location ? this.props.location.pathname : null;
    const instrument = pathname ? pathname.substr(1, pathname.length) : 'N/A';
    this.instrumentAction.setInstrumentByName(instrument);
    this.setPageTitle(instrument);
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

  renderInstrument = ({ match: { params: { instrumentName } } }) => {
    if (instrumentName === 'Hyoshigi') {
      return <Hyoshigi action={this.instrumentAction} />
    }
    return (
      <Modal className={styles.modal} onClose={() => this.props.history.push('/')} open>
        <Card className={styles.modalCard}>
          <CardContent className={styles.modalCardContent}>
            Instrument '{instrumentName}' was not created yet.
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => this.props.history.push('/')}>Close</Button>
          </CardActions>
        </Card>
      </Modal>
    );
  };

  render() {
    const { selectedInstrument, selectedSong } = this.instrumentAction;
    return (
      <Fragment>
        <Song instrument={selectedInstrument} song={selectedSong} />
        <Route exact path={"/:instrumentName"} render={this.renderInstrument}  />
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
)(Instrument);