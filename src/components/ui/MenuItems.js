import React from 'react';
import { Link, } from 'react-router-dom';
import {
  //IconButton,
  ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import {
  MoveToInbox as InboxIcon,
  Drafts as DraftsIcon,
  // Star as StarIcon,
  // Send as SendIcon,
  Mail as MailIcon,
  Delete as DeleteIcon,
  Report as ReportIcon,
  List as ListIcon,
  CheckBox as CheckBoxIcon,
  Build as BuildIcon,
  LocationOn as LocationOnIcon,
  SettingsApplications as SettingsIcon,
  Help as HelpIcon,
} from '@material-ui/icons';


export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/" title="Receive">
      <ListItemIcon><InboxIcon /></ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/people" title="Population">
      <ListItemIcon><ListIcon /></ListItemIcon>
      <ListItemText primary="Population" />
    </ListItem>
    <ListItem button component={Link} to="/click" title="Click">
      <ListItemIcon><ListIcon /></ListItemIcon>
      <ListItemText primary="Click" />
    </ListItem>
  </div>
);