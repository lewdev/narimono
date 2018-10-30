import React from 'react';
import { Link, } from 'react-router-dom';
import {
  Drawer, Divider, //Collapse, Hidden,
  List, ListItem, ListItemText, //ListItemIcon, 
} from '@material-ui/core';
import { instrumentList } from 'data/InstrumentData';

class DrawerLayout extends React.Component {
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
    return (
      <div>
        <Drawer open={drawerOpen} onClose={drawerToggle}>
          <div tabIndex={0}>
            <Divider />
            <List onClick={drawerToggle}>
              {instrumentList.map(instrument => { return (
                <ListItem key={'menuitem-' + instrument} button component={Link} to={'/' + instrument} title={instrument}>
                  <ListItemText>{instrument}</ListItemText>
                </ListItem>
              );})}
            </List>
            <Divider />
            {/* <ListItem button onClick={this.toggleInventoryMenu}>
              <ListItemIcon><Folder color={this.inventoryMenuOpen ? 'primary' : 'secondary'} /></ListItemIcon>
              <ListItemText inset primary="Inventory" />
              {this.state.inventoryMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem> */}
          </div>
        </Drawer>
      </div>
    );
  }
}
export default DrawerLayout;