import React, { Component } from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import PassIcon from "@material-ui/icons/VerifiedUserOutlined";
import RightIcon from "@material-ui/icons/ChevronRight";
import PersonIcon from "@material-ui/icons/PersonOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import Avatar from "@material-ui/core/Avatar";

import pink from "@material-ui/core/colors/pink";
import AssignmentIcon from "@material-ui/icons/Assignment";
const styles = theme => ({
  avatar: {
    margin: 10
  },
  pinkAvatar: {
    margin: 10,
    color: "#fff",
    width: 30,
    height: 30,
    backgroundColor: pink[500]
  },
  greenAvatar: {
    borderBottomRightRadius: "5px",
    color: "#fff",
    borderRadius: 0,
    backgroundColor: "#e3e4e3"
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  button: {
    marginTop: 20,
    marginLeft: "12px",
    padding: "15px 0"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },

  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  textField: {
    marginTop: 30
  }
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
  componentDidMount() {
    console.log(localStorage.getItem("user"));
    if (localStorage.getItem("user")) {
      this.props.history.push("home");
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        style={{
          height: "100vh"
        }}

      >
      <Grid item md={5} container style={{backgroundColor:'#7b68ee',padding:20}}>     
      <img style={{height:40}} src="https://univerlist.com/media/cache/5e/42/5e4297577c316d35a9ec83d7529562d9.png"></img>
      </Grid>
      <Grid item md={6} container justify='center' alignItems='center'>
      <Grid
          item
          md={6}
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{
            boxShadow:
              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            border: "1px solid #e0dfdf",
            padding: "30px 0 50px",
            borderRadius: 5,
            position: "relative"
          }}
        >
          <Grid item style={{ position: "absolute", top: 0, left: 0 }}>
            <Avatar className={classes.greenAvatar}>
              <AssignmentIcon />
            </Avatar>
          </Grid>

          <Grid
            container
            justify="center"
            style={{
              padding: "0px 0px 20px",
              borderBottom: "1px solid #d2cece"
            }}
            direction="column"
          >
            <Typography
              variant="h5"
              align="center"
              style={{ marginBottom: 15 }}
            >
              Univerlist
            </Typography>
            <Typography variant="subheading" align="center">
              Universite Giriş Paneli
            </Typography>
          </Grid>
          <Grid
            item
            style={{ marginTop: 15 }}
            container
            justify="center"
            alignItems="center"
          >
            <Grid item md={7}>
              <TextField
                fullWidth
                id="outlined-name"
                label="Kullanıcı adı"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonIcon
                        style={{
                          fontSize: 32,
                          color: "#ccc9c9"
                        }}
                      />
                    </InputAdornment>
                  )
                }}
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange("userName")}
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid item container justify="center" alignItems="center">
            <Grid item md={7}>
              <TextField
                fullWidth
                id="outlined-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PassIcon
                        style={{
                          fontSize: 32,
                          color: "#ccc9c9"
                        }}
                      />
                    </InputAdornment>
                  )
                }}
                type="password"
                label="Şifre"
                value={this.state.name}
                onChange={this.handleChange("password")}
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container item md={7} justify="center">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={e => {
                localStorage.setItem("user", {
                  name: this.state.userName,
                  password: this.state.password
                });
                e.preventDefault();
                this.props.history.push("home");
              }}
            >
              GIRIS YAP
              <RightIcon className={classes.rightIcon} />
            </Button>
          </Grid>
        </Grid>
      
      </Grid>
       </Grid>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
