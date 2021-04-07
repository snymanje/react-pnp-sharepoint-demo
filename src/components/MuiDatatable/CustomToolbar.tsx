import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";

const CustomToolbar = ({ handleDrawerToggle }: { handleDrawerToggle: any }) => {
  return (
    <React.Fragment>
      <Tooltip title={"custom icon"}>
        <IconButton onClick={handleDrawerToggle}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
};

export default CustomToolbar;
