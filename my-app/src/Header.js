import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import List from "@material-ui/core/List";
import DialogSave from "./Dialog";
const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class ButtonAppBar extends React.Component {
  state = {
    openDialog: false,
    top: false,
    left: false,
    bottom: false,
    right: false
  };
  handleDialog = () => {
    this.setState({ openDialog: false });
  };
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };
  removeSession = () => {
    localStorage.clear();
    this.props.history.push("");
  };

  render() {
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button onClick={e => this.props.history.push("home")}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Universite edit" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="İstatistiklerim" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Sorulan sorular" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {["Çıkış"].map((text, index) => (
            <ListItem button key={text} onClick={this.removeSession}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          style={{ backgroundColor: "white", color: "#000" }}
        >
          <Toolbar>
            <IconButton
              onClick={this.toggleDrawer("left", true)}
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" color="inherit" className={classes.grow}>
              Univerlist
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ padding: "15px 50px" }}
              onClick={() => this.setState({ openDialog: true })}
            >
              KAYDET
            </Button>
            <DialogSave
              open={this.state.openDialog}
              onOpenDialog={this.handleDialog}
            />
            <Drawer
              open={this.state.left}
              onClose={this.toggleDrawer("left", false)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer("left", false)}
                onKeyDown={this.toggleDrawer("left", false)}
              >
                {sideList}
              </div>
            </Drawer>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
};
export default withStyles(styles)(withRouter(ButtonAppBar));
