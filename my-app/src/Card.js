import React, { Component } from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";

import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  animClick: {
    transition: theme.transitions.create(["border",])
  },

});

class App extends Component {
  state = {
    userName: "",
    password: ""
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  render() {
    const { classes, datax, index } = this.props;
    return (
      <Grid item md={1} container style={{ padding: "0 15px 10px " }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{
            boxShadow: "0 2px 15px 0 rgba(0,0,0,.05)",
            borderBottom:
              datax.clicked === false
                ? null
                : "10px solid #35d0ba",
                
            borderRadius: 5,
            padding: "10px 0",
            cursor: "pointer",
            marginBottom: 10,
            minHeight: 150
          }}
          className={classes.animClick}
          onClick={() => this.props.onClickHandle(datax, index)}
        >
          <Grid item>
            <Avatar
              style={{
                width:60,height:60,
                margin: "0px 0 10px",
                backgroundColor: datax.clicked ===true ? ("#35d0ba"):("#bdbdbd")
              }}
            >
              {datax.name.charAt(0)}
            </Avatar>
          </Grid>
          <Grid item style={{ padding: "0 9px" }}>
            <Typography
              variant="caption"
              align="center"
              style={{ fontSize: 14 }}
            >
              {datax.name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  datax: PropTypes.object.isRequired,
  onClickHandle: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default withStyles(styles)(App);
