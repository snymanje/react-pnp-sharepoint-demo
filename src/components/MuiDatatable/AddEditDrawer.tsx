import { useState } from "react";
import { Drawer, IconButton, Divider, Typography, TextField, Button } from "@material-ui/core";
import { Close, AddCircleOutlineOutlined } from "@material-ui/icons";
import { useSharePoint } from "../../hooks/useSharePoint";

import { makeStyles } from "@material-ui/core";
import { SPRest } from "@pnp/sp";
import { IItemAddResult } from "@pnp/sp/items";

const drawerWidth = 400;
const formWidth = 300;

const useStyles = makeStyles((theme: any) => {
  return {
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: `${formWidth}px`,
      },
    },
    drawer: {
      width: `${drawerWidth}px`,
      flexShrink: 0,
    },
    drawerPaper: {
      width: `${drawerWidth}px`,
    },
    drawerFrom: {
      width: `${formWidth}px`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    drawerHeader: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: theme.spacing(10),
      width: "100%",
      justifyContent: "center",
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
      marginTop: theme.spacing(2),
    },
  };
});

const AddEditDrawer = ({
  handleDrawerToggle,
  drawerAddOpen,
  handleDataUpdate,
}: {
  handleDrawerToggle: any;
  drawerAddOpen: boolean;
  handleDataUpdate: any;
}) => {
  const classes = useStyles();
  const {
    spData,
    isLoading,
    pnpInstance,
  }: { spData: any; isLoading: Boolean; pnpInstance: SPRest } = useSharePoint();

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [department, setDepartment] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTitleError(false);
    setNameError(false);
    setSurnameError(false);
    setDepartmentError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (name === "") {
      setNameError(true);
    }
    if (surname === "") {
      setSurnameError(true);
    }
    if (department === "") {
      setDepartmentError(true);
    }
    if (title && name && surname && department) {
      const iar: IItemAddResult = await pnpInstance.web.lists.getByTitle("Employee").items.add({
        Title: title,
        Name: name,
        Surname: surname,
        Department: department,
      });
      console.log(iar);
      handleDataUpdate({
        ID: iar.data.ID,
        Title: title,
        Name: name,
        Surname: surname,
        Department: department,
      });
    }
  };

  const DrawerItems = (
    <div className={classes.drawerFrom}>
      <Typography variant='h5' className={classes.drawerAddTitle}>
        Add new record
      </Typography>
      <form className={classes.root} noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          id='outlined-basic'
          label='Title'
          variant='outlined'
          required
          onChange={(e) => setTitle(e.target.value)}
          error={titleError}
        />
        <TextField
          id='outlined-basic'
          label='Name'
          variant='outlined'
          required
          onChange={(e) => setName(e.target.value)}
          error={nameError}
        />
        <TextField
          id='outlined-basic'
          label='Surname'
          variant='outlined'
          required
          onChange={(e) => setSurname(e.target.value)}
          error={surnameError}
        />
        <TextField
          id='outlined-basic'
          label='Department'
          variant='outlined'
          required
          onChange={(e) => setDepartment(e.target.value)}
          error={departmentError}
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          className={classes.btnCommmit}
          endIcon={<AddCircleOutlineOutlined />}
        >
          Create
        </Button>
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
        </div>
      </Drawer>
    </>
  );
};

export default AddEditDrawer;
