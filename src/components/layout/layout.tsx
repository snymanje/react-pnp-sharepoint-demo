import { useState } from "react";
import AppToolBar from "./AppToolBar";
import DrawerMenu from "./DrawerMenu";

import { useStyles } from "./styles";

export const PageLayout = (props: any) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <AppToolBar handleDrawerToggle={handleDrawerToggle} />
      <DrawerMenu handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />

      <div className={classes.page}>
        <div className={classes.toolbar}>{props.children}</div>
      </div>
    </div>
  );
};
