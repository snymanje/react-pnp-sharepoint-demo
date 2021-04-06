import {
    makeStyles
  } from "@material-ui/core";

const drawerWidth = 240;

export const useStyles = makeStyles((theme: any) => {
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
      drawerList: {
        marginTop: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
          marginTop: theme.spacing(10)
        },
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
      username: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
          display: "block",
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
      avatar: {
        marginLeft: theme.spacing(2),
      },
      menudropdown: {
        marginRight: theme.spacing(1),
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
      logo: {
        height: "100%",
      },
    };
  });