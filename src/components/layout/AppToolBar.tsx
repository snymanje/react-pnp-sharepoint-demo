import { useState, useEffect } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../../config/authConfig";
import { useMSGraphMe } from "../../hooks/useMSGraphMe";
import {
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  MenuItem,
  Menu,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../../images/TFGlogoCropped.jpg";

import { useStyles } from "./styles";
import { AccountCircle } from "@material-ui/icons";

const AppToolBar = ({ handleDrawerToggle }: { handleDrawerToggle: any }) => {
  const classes = useStyles();
  const { instance } = useMsal();
  const { me } = useMSGraphMe();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [meData, setMeData] = useState({});
  const open = Boolean(anchorEl);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setMeData(me);
    console.log(meData);
  }, [me, meData]);

  return (
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
        <Typography className={classes.appbartitle} variant='h5'>
          SharePoint App
        </Typography>
        <UnauthenticatedTemplate>
          <Button color='inherit' onClick={() => instance.loginRedirect(loginRequest)}>
            Login
          </Button>
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
          <Typography className={classes.username}>{meData.displayName}</Typography>
          <Avatar
            className={classes.avatar}
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
          >
            {`${meData.givenName[0]}${meData.surname[0]}`}
          </Avatar>
          <Menu id='menu-appbar' anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => instance.logout()}>
              <AccountCircle />
              Logout
            </MenuItem>
          </Menu>
        </AuthenticatedTemplate>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolBar;
