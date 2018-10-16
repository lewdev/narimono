import React from 'react';
import {
  withStyles,
  Card, CardContent, CardActions,
  Modal, Button,
} from '@material-ui/core';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Form, } from 'react-final-form';

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '90%',
    maxWidth: 500,
  },
  modalCardContent: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Roboto',
    fontStyle: 'italic',
  },
});

const DeleteDialog = ({ classes, domain, name, route, onDelete, history }) => (
  <Form initialValues={domain} onSubmit={onDelete}>
    {({ handleSubmit }) => (
      <Modal className={classes.modal} onClose={() => history.push(route)} open>
        <Card className={classes.modalCard}>
          <form onSubmit={handleSubmit}>
            <CardContent className={classes.modalCardContent}>
              Are you sure you want to delete "{name}"?
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" type="submit" autoFocus >Delete</Button>
              <Button size="small" onClick={() => history.push(route)}>Cancel</Button>
            </CardActions>
          </form>
        </Card>
      </Modal>
    )}
  </Form>
);

export default compose(
  withRouter,
  withStyles(styles),
)(DeleteDialog);