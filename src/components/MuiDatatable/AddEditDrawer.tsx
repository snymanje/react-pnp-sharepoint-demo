import { Drawer, IconButton, Divider, Typography, TextField, Button } from "@material-ui/core";
import { Close, AccountCircle } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core";

const drawerWidth = 350;

const useStyles = makeStyles((theme: any) => {
  return {
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "300px",
      },
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(10, 2),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-start",
    },
    closeMenuButton: {
      marginRight: "auto",
      marginLeft: 0,
    },
    drawerAddTitle: {
      textAlign: "center",
      marginBottom: theme.spacing(3),
    },
    btnCommmit: {
      width: "300px",
    },
  };
});

const AddEditDrawer = ({
  handleDrawerToggle,
  drawerAddOpen,
}: {
  handleDrawerToggle: any;
  drawerAddOpen: boolean;
}) => {
  const classes = useStyles();

  const DrawerItems = (
    <div>
      <Typography variant='h5' className={classes.drawerAddTitle}>
        Add new record
      </Typography>
      <form className={classes.root} noValidate autoComplete='off'>
        <TextField id='outlined-basic' label='Title' variant='outlined' />
        <TextField id='outlined-basic' label='Name' variant='outlined' />
        <TextField id='outlined-basic' label='Surname' variant='outlined' />
        <TextField id='outlined-basic' label='Department' variant='outlined' />
      </form>
    </div>
  );

  return (
    <>
      <Drawer
        className={classes.drawer}
        anchor='right'
        variant='persistent'
        open={drawerAddOpen}
        /*         onClose={handleDrawerToggle} */
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
            <Close />
          </IconButton>

          {DrawerItems}

          <Button color='primary' variant='contained' className={classes.btnCommmit}>
            Create
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default AddEditDrawer;
