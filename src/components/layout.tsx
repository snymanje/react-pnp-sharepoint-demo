import { useState } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Hidden,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { AddCircleOutlined, SubjectOutlined } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useHistory, useLocation } from "react-router";
import logo from "../images/TFGlogo.jpg";

const drawerWidth = 240;

const useStyles = makeStyles((theme: any) => {
  return {
    page: {
      width: "100%",
      padding: theme.spacing(10),
    },
    logo: {
      width: "140px",
      height: "100%",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    permanentMargin: {
      marginTop: theme.spacing(10),
    },
    drawerPaper: {
      width: drawerWidth,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    closeMenuButton: {
      marginRight: "auto",
      marginLeft: 0,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    appbar: {
      width: `100%`,
      zIndex: theme.zIndex.drawer + 1,
    },
    appbartitle: {
      flexGrow: 1,
      textAlign: "center",
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2),
    },
    menudropdown: {
      marginRight: theme.spacing(1),
    },
  };
});

export const PageLayout = (props: any) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { instance } = useMsal();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    {
      text: "Home",
      icon: <SubjectOutlined color='secondary' />,
      path: "/",
    },
    {
      text: "Page 1",
      icon: <AddCircleOutlined color='secondary' />,
      path: "/page1",
    },
    {
      text: "Page 2",
      icon: <AddCircleOutlined color='secondary' />,
      path: "/page2",
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar elevation={0} position='fixed' className={classes.appbar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} alt='Kitty Katty!' className={classes.logo} />
          <Typography className={classes.appbartitle}>SharePoint App</Typography>
          <Typography>Jean Snyman</Typography>
          <div>
            <Avatar
              src='https://i.pravatar.cc/300'
              className={classes.avatar}
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
            />

            {/* <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton> */}
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <AuthenticatedTemplate>
                <MenuItem onClick={() => instance.logout()}>
                  <AccountCircle />
                  Logout
                </MenuItem>
              </AuthenticatedTemplate>
              <UnauthenticatedTemplate>
                <MenuItem onClick={() => instance.loginRedirect(loginRequest)}>
                  <AccountCircle className={classes.menudropdown} />
                  Login
                </MenuItem>
              </UnauthenticatedTemplate>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        <Hidden smUp implementation='css'>
          <Drawer
            className={`${classes.drawer} ${classes.menuButton}`}
            anchor='left'
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper }}
          >
            <div>
              <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
                <CloseIcon />
              </IconButton>
            </div>

            <AuthenticatedTemplate>
              <List>
                {menuItems.map((item) => (
                  <ListItem
                    button
                    key={item.text}
                    onClick={() => history.push(item.path)}
                    className={location.pathname === item.path ? classes.active : null}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
                <ListItem button onClick={() => instance.logout()}>
                  <ListItemIcon color='secondary'>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary='Logout' />
                </ListItem>
              </List>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <List>
                <ListItem button onClick={() => instance.loginRedirect(loginRequest)}>
                  <ListItemIcon color='secondary'>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary='Login' />
                </ListItem>
              </List>
            </UnauthenticatedTemplate>
          </Drawer>
        </Hidden>

        <Hidden xsDown implementation='css'>
          <Drawer
            className={classes.drawer}
            anchor='left'
            variant='permanent'
            classes={{ paper: classes.drawerPaper }}
          >
            <AuthenticatedTemplate>
              <List className={classes.permanentMargin}>
                {menuItems.map((item) => (
                  <ListItem
                    button
                    key={item.text}
                    onClick={() => history.push(item.path)}
                    className={location.pathname === item.path ? classes.active : null}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
                <ListItem button onClick={() => instance.logout()}>
                  <ListItemIcon color='secondary'>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary='Logout' />
                </ListItem>
              </List>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <List className={classes.permanentMargin}>
                <ListItem button onClick={() => instance.loginRedirect(loginRequest)}>
                  <ListItemIcon color='secondary'>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary='Login' />
                </ListItem>
              </List>
            </UnauthenticatedTemplate>
          </Drawer>
        </Hidden>
      </nav>

      <div className={classes.page}>
        <div className={classes.toolbar}>{props.children}</div>
      </div>
    </div>
  );
};
