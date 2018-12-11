import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { Typography } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Carousel} from '3d-react-carousal';
import Icon from '@material-ui/core/Icon';
import Slider from "react-slick";

const styles = theme => ({

root:{
    padding:'0px 24px 26px'
},
img:{
    position:['relative','!important']
},
fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
})


class AlertDialogSlide extends React.Component {
  state = {
    datas:[{id:1,img:'https://picsum.photos/800/300/?random'},{id:2,img:'https://picsum.photos/800/301/?random'},{id:3,img:'https://picsum.photos/800/302/?random'}]
  };

 


  deleteIcon=(data)=>{
    this.setState(state => {
        const datas = [...state.datas];
        let chipToDelete = 0;
        for (var x in datas){

            if(datas[x].id===data){
                chipToDelete=x
                break;
            }
        }
        datas.splice(chipToDelete, 1);
        return { datas };
      });
  }
  render() {
    const { classes } = this.props;
    const {datas} =this.state;
    var settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      
    return (
      <div>
        <Dialog
          open={this.props.open}
          fullWidth
          maxWidth={'xl'}
          keepMounted
          onClose={this.props.onHandleImage}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent  className={classes.root}>
              <Grid item xs={12} >
                {datas.length===0 && <Grid container justify='center'><Typography variant='subtitle1'>Gösterilcek resim bulunmamaktadır.</Typography></Grid>}
                <Slider {...settings}>
                {this.props.slides.map(data=>(
                    <Grid item xs={12} container  className={classes.img} key={data.pk}>
                    <img width='100%'  src={data.thumbnail} alt={data.pk} style={{maxHeight:750}}/>
                    <Fab color="secondary" aria-label="Add" className={classes.fab} style={{position:'absolute',right:0,top:0,zIndex:3}}>
                        <DeleteIcon style={{fontSize:32}} onClick={()=>this.props.deleteIcon(data.id)}/>
                    </Fab>
                    </Grid>
                ))}
                </Slider>
              </Grid>
          
          </DialogContent>    
        </Dialog>
      </div>
    );
  }
}
AlertDialogSlide.propTypes = {
    classes: PropTypes.object.isRequired
  };

  export default withStyles(styles)(AlertDialogSlide);
