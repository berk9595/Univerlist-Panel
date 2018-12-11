import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          keepMounted
          onClose={this.props.onHandleVideo}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Üniversitenizin videosunu ekleyin yada editleyin."}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              id="outlined-videourl"
              label="Video urlsi"
              onChange={this.props.onHandleVideoText}
              value={this.props.videoUrl}
              margin="normal"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={this.props.onHandleVideo}
              color="primary"
            >
              İptal
            </Button>
            <Button
              variant="contained"
              //onClick={this.props.onOpenDialog}
              color="primary"
            >
              Tamam
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;
