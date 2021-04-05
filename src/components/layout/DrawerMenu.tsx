import { useHistory, useLocation } from "react-router";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../../config/authConfig";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  IconButton,
} from "@material-ui/core";
import { AddCircleOutlined, SubjectOutlined } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useStyles } from "./styles";

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

const DrawerMenu = ({
  handleDrawerToggle,
  mobileOpen,
}: {
  handleDrawerToggle: any;
  mobileOpen: boolean;
}) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { instance } = useMsal();

  const DrawerItems = (
    <div>
      <AuthenticatedTemplate>
        <List className={classes.permanentMargin}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname === item.path ? classes.active : undefined}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem button onClick={() => instance.logout()}>
            <ListItemIcon>
              <AccountCircle color='secondary' />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <List className={classes.permanentMargin}>
          <ListItem button onClick={() => instance.loginRedirect(loginRequest)}>
            <ListItemIcon>
              <AccountCircle color='secondary' />
            </ListItemIcon>
            <ListItemText primary='Login' />
          </ListItem>
        </List>
      </UnauthenticatedTemplate>
    </div>
  );

  return (
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
          {DrawerItems}
        </Drawer>
      </Hidden>

      <Hidden xsDown implementation='css'>
        <Drawer
          className={classes.drawer}
          anchor='left'
          variant='permanent'
          classes={{ paper: classes.drawerPaper }}
        >
          {DrawerItems}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default DrawerMenu;
