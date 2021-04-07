import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import { Edit } from "@material-ui/icons";

const defaultToolbarSelectStyles = {
  iconButton: {
    marginRight: "10px",
    top: "50%",
    display: "inline-block",
    position: "relative",
  },
  deleteIcon: {
    color: "#000",
  },
};

class CustomToolbarSelect extends React.Component {
  handleClick = () => {
    console.log("click! current selected rows", this.props.selectedRows);
    console.log("click! current selected rows", this.props.selectedRows.data.length);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={"custom-toolbar-select"}>
        {this.props.selectedRows.data.length > 1 ? (
          <Tooltip title={"icon 1"}>
            <IconButton className={classes.iconButton} onClick={this.handleClick}>
              <DeleteIcon className={classes.deleteIcon} />
            </IconButton>
          </Tooltip>
        ) : (
          <>
            <Tooltip title={"icon 2"}>
              <IconButton className={classes.iconButton} onClick={this.handleClick}>
                <Edit className={classes.deleteIcon} />
              </IconButton>
            </Tooltip>
            <Tooltip title={"icon 1"}>
              <IconButton className={classes.iconButton} onClick={this.handleClick}>
                <DeleteIcon className={classes.deleteIcon} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </div>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, {
  name: "CustomToolbarSelect",
})(CustomToolbarSelect);
