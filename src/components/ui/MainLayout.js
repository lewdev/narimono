import React from 'react';
import {
  Drawer, Divider, Collapse, //Hidden,
  List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import {
  Folder,
  ExpandLess, ExpandMore,
} from '@material-ui/icons';

import {
  mainListItems,
} from './MenuItems.js'

class MainLayout extends React.Component {
  state = {
    inventoryMenuOpen: false,
    tasksMenuOpen: false,
  };

  toggleInventoryMenu = () => {
    this.closeAll();
    this.setState({ inventoryMenuOpen: !this.state.inventoryMenuOpen });
  };

  tasksMenuToggle = () => {
    this.closeAll();
    this.setState({ tasksMenuOpen: !this.state.tasksMenuOpen });
  };

  closeAll = () => {
    this.setState({ tasksMenuOpen: false, inventoryMenuOpen: false });
  }

  render() {
    const { drawerOpen, drawerToggle } = this.props;
    const drawer = (
      <div>
        <Divider />

        <List onClick={drawerToggle}>{mainListItems}</List>

        <Divider />

        {/* <ListItem button onClick={this.toggleInventoryMenu}>
          <ListItemIcon><Folder color={this.inventoryMenuOpen ? 'primary' : 'secondary'} /></ListItemIcon>
          <ListItemText inset primary="Inventory" />
          {this.state.inventoryMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem> */}
      </div>
    );
    return (
      <div>
        <Drawer open={drawerOpen} onClose={drawerToggle}>
          <div
            tabIndex={0}
          >
            {drawer}
          </div>
        </Drawer>
      </div>
    );
  }
}
export default MainLayout;