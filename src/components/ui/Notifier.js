import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  withStyles,
  Snackbar, SnackbarContent,
  IconButton,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {
  Close as CloseIcon,
  //CheckCircleIcon as CheckCircle,
  Info as InfoIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from '@material-ui/icons';
import {
  green, amber,
} from '@material-ui/core/colors';

// Most of this code was copied from:
// https://material-ui.com/demos/snackbars/

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: { backgroundColor: green[600], },
  error: { backgroundColor: theme.palette.error.dark, },
  info: { backgroundColor: theme.palette.primary.dark, },
  warning: { backgroundColor: amber[700], },
  icon: {fontSize: 20,},
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: { display: 'flex', alignItems: 'center', },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          {/* <Icon className={classNames(classes.icon, classes.iconVariant)} /> */}
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

let notifyFn = null;
class Notifier extends React.Component {
  state = {
    open: false,
    variant: 'info',
    message: '',
  };

  componentDidMount() {
    notifyFn = this.notify;
  }

  notify = ({ message, variant, }) => {
    this.setState({
      open: true,
      variant: variant,
      message,
    });
  };

  notifyClose = () => {
    this.setState({ open: false, message: '', variant: 'info', });
  }

  handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    this.setState({ open: false });
  };

  render() {
    const { open, message, variant, } = this.state;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={this.handleClose}
      >
        <MySnackbarContentWrapper
          className={variant}
          onClose={this.handleClose}
          variant={variant}
          message={message}
        />
      </Snackbar>
    );
  }
}
Notifier.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.node,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
};

export function notify(message, variant) {
  if (notifyFn) {
    notifyFn({ message, variant });
  }
}
export default withStyles(styles2)(Notifier);