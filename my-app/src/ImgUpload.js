import React from "react";
import ImageUploader from "react-images-upload";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
const styles = theme => ({
  bootstrapInput: {
    padding: ["15px 23px", "!important"],
    borderRadius: [5, "!important"]
  }
});
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    console.log(this.state.pictures);
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <ImageUploader
          buttonClassName={classes.bootstrapInput}
          //fileContainerStyle={{ backgroundColor: "#000" }}
          withPreview={true}
          withIcon={false}
          withLabel={false}
          label="Üniversite resimlerinizi yükleyebilirsiniz"
          buttonText="Resim yükle"
          onChange={this.onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        />
      </Grid>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(App);
