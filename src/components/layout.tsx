import { useState } from "react";
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
} from "@material-ui/core";
import { AddCircleOutlined, SubjectOutlined } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
// import { useHistory } from "react-router";

const drawerWidth = 240;

const useStyles = makeStyles((theme: any) => {
  return {
    page: {
      width: "100%",
      padding: theme.spacing(10),
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
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});

export const PageLayout = (props: any) => {
  const classes = useStyles();
  //const history = useHistory();
  //const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color='secondary' />,
      path: "/",
    },
    {
      text: "Create Notes",
      icon: <AddCircleOutlined color='secondary' />,
      path: "/create",
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
          <Typography className={classes.appbartitle}>SharePoint App</Typography>
          <Typography>JeanSn</Typography>
          <Avatar src='https://i.pravatar.cc/300' className={classes.avatar} />
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

            <List>
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  /* onClick={() => history.push(item.path)} */
                  /*  className={location.pathname === item.path ? classes.active : null} */
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Hidden>

        <Hidden xsDown implementation='css'>
          <Drawer
            className={classes.drawer}
            anchor='left'
            variant='permanent'
            classes={{ paper: classes.drawerPaper }}
          >
            <List className={classes.permanentMargin}>
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  /* onClick={() => history.push(item.path)} */
                  /*  className={location.pathname === item.path ? classes.active : null} */
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Hidden>
      </nav>

      <div className={classes.page}>
        <div className={classes.toolbar}>
          <Typography>This is the content</Typography>
          {props.children}
        </div>
      </div>
    </div>
  );
};
