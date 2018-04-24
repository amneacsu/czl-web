import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { withStyles } from 'material-ui/styles';
import AppBarMUI from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import Hidden from 'material-ui/Hidden';
import List, { ListItem, ListItemText } from 'material-ui/List';

import NavDrawer from '../NavDrawer/NavDrawer';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  topMenu: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  userName: {
    marginLeft: 20,
    marginTop: -3
  },
  topToolbar: {
    display: 'flex',
    alignItems: 'center'
  },
  selectedItem: {
    color: theme.palette.primary.main
  }
});

const NavItem = withRouter(({ route, render, location, history }) => render({ selected: location.pathname === route, navigate: () => history.push(route) }));

const DrawerMenuItem = withStyles(styles, { withTheme: true })(({ onClick, selected, label, classes}) => (
  <ListItem button onClick={onClick}>
    <ListItemText classes={selected ? {
      primary: classes.selectedItem
    } : {}}
      primary={label} />
  </ListItem>
))

class AppBarBase extends Component {
  state = {
    drawerOpen: false,
    anchorEl: null
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { classes, auth, location, history } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBarMUI position="static">
          <Toolbar>
            <IconButton
              className={`${classes.menuButton} ${classes.navIconHide}`}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              CZL
            </Typography>
            {!auth && <Button color="inherit">Login</Button>}
            {auth && (
              <div className={classes.topToolbar}>
                <div className={classes.topMenu}>
                  <Button color={location.pathname === '/' ? 'secondary' : 'inherit'} onClick={() => history.push('/')}>Home</Button>
                  <Button color={location.pathname === '/categories' ? 'secondary' : 'inherit'} onClick={() => history.push('/categories')}>Categorii</Button>
                  <Button color={location.pathname === '/proposals' ? 'secondary' : 'inherit'} onClick={() => history.push('/proposals')}>Propuneri legislative</Button>
                  <Button color={location.pathname === '/institutions' ? 'secondary' : 'inherit'} onClick={() => history.push('/institutions')}>Institutii</Button>
                </div>
                <Typography
                  variant="body1"
                  color="inherit"
                  className={classes.userName}
                >
                  {auth.user.name}
                </Typography>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBarMUI>

        <Hidden mdUp>
          <NavDrawer open={this.state.drawerOpen}
            onClose={this.handleDrawerToggle}>
            <List>
              <NavItem route='/' render={({ selected, navigate }) => (
                <DrawerMenuItem selected={selected} onClick={navigate} label='Home'/>
              )} />
              <NavItem route='/categories' render={({ selected, navigate }) => (
                <DrawerMenuItem selected={selected} onClick={navigate} label='Categorii'/>
              )} />
              <NavItem route='/proposals' render={({ selected, navigate }) => (
                <DrawerMenuItem selected={selected} onClick={navigate} label='Propuneri legislative'/>
              )} />
              <NavItem route='/institutions' render={({ selected, navigate }) => (
                <DrawerMenuItem selected={selected} onClick={navigate} label='Institutii'/>
              )} />
            </List>
          </NavDrawer>
        </Hidden>
      </div>
    );
  }
}

AppBarBase.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};


AppBarBase.defaultProps = {
  location: {
    pathname: '/'
  },
  history: {
    push: () => { }
  }
}


const AppBar = withStyles(styles, { withTheme: true })(AppBarBase);

export { AppBar };

export default withRouter(AppBar);


