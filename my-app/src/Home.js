import React, { Component } from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import classnames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {Carousel} from '3d-react-carousal';
import Collapse from "@material-ui/core/Collapse";
import NewsCard from "./Card";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Close';
import AddCircle from "@material-ui/icons/AddCircle";
import Divider from '@material-ui/core/Divider';
import ImgUpload from "./ImgUpload";
import Zoom from "@material-ui/core/Zoom";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import DialogVideo from "./DialogVideo";
import ImageDialog from "./ImageDialog";
import ImageUploader from "react-images-upload";

const styles = theme => ({
  uniPhotos:{
    width:'100%',
    height:320 ,
    [theme.breakpoints.up("lg")]: {
      height:250
    }
  },
  montserrat:{
    fontFamily:'Montserrat',
  },
  rootUnderline:{
    '&:before':{
      borderBottom:'0'
    }
  },
  addCricle: {
    fontSize: 40
  },
  videocardView: {
    backgroundColor: "white",
    transitionTimingFunction: ["linear", "important"],
    boxShadow: "0 2px 15px 0 rgba(0,0,0,.05)",
    height: 200,
    maxWidth: "15.5%",
    borderRadius: 5,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "50%"
    }
  },
  videocardViewLogo: {


    transitionTimingFunction: ["linear", "important"],

    height: 150,
    borderRadius: '50%',
    [theme.breakpoints.down("sm")]: {
      maxWidth: "50%"
    }
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    cursor: "pointer",
    transition: theme.transitions.create(["width", "height"]),
    width: 128,
    height: 128,
    "&:hover": {
      width: 140,
      height: 140
    }
  },
  bootstrapRoot: {
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  bootInput:{
    fontSize: 16,
    color:'#646777'
  },
  Height500:{
    height:500
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
});

class App extends Component {
  state = {
    ulScore:'',
    uniName:'',
    content:'',
    logoData: "",
    videoUrl: "",
    openVideoText: false,
    address: "",
    facebook: "",
    twitter: "",
    instagram: "",
    techOfice: "",
    erasmus: "",
    price: "",
    oran: "",
    intStudent: "",
    numStudent: "",
    phone: "",
    email: "",
    expanded: false,
    openimg:false,
    openimg_const:false,
    slides : [
      <img src='https://picsum.photos/800/300/?random'/>,
    ],
    data: [

    ]
  };
  openFileUpload = () => {
    document.querySelector(".buttonLogoUpluad").click();
  };
  onDrop = picture => {
    var reader = new FileReader();
    reader.readAsDataURL(picture[picture.length - 1]);
    reader.onloadend = function(e) {
      this.setState({ logoData: reader.result });
    }.bind(this);
  };
  handleVideoText = event => {
    this.setState({ videoUrl: event.target.value });
  };

  componentDidMount() {
    const {classes} =this.props;
    fetch('https://univerlist.com/api/v1/university-detail/yasar-universitesi/', {
      method: 'GET',
      cache: "no-store"
  })
      .then((res) => {
          return res.json()
      })
      .then((res) => {

         const erasmus_exist = res.erasmus === true? ("Var"):("Yok");
         const tech_exist = res.technopark === true ? ("Var"):("Yok");
         console.log(res.optional_images);
         for(let i=0;i<res.features.length;i++){
            res.features[i].clicked=true;
         }
         let new_slider = [];
         for(let i =0;i<res.optional_images.length;i++){
           new_slider.push(
             <Grid container style={{marginBottom:15}}   key={res.optional_images[i].pk}>
             <img src={res.optional_images[i].thumbnail} className={classes.uniPhotos}></img>
             <Fab color="secondary" aria-label="Add" className={classes.fab} style={{position:'absolute',right:'-2%',top:'-4%',zIndex:3,width:40,height:40}}>
                     <DeleteIcon  onClick={()=>this.deleteIcon(res.optional_images[i].pk)}/>
                 </Fab>
           </Grid>);
         }


         this.setState({
          ulScore:res.ul_score,
          uniName:res.name,
           logoData:res.logo,
           content:res.content.trim(),
           numStudent:res.student_count,
           intStudent:res.international_student_count,
           oran:res.placement_rate,
           price:res.annual_wage,
           erasmus:erasmus_exist,
           techOfice:tech_exist,
           email:res.email,
           phone:res.phone,
           address:res.address,
           data:res.features,
           slides:new_slider
         })

      })
    setTimeout(
      function() {
        this.setState({ expanded: true });
      }.bind(this),
      1500
    );

  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleVideo = () => {
    this.setState(state => ({ openVideoText: !state.openVideoText }));
  };
  handleImage = () => {
    this.setState(state => ({ openimg: !state.openimg }));
  };
  onClickHandle = (data, index) => {
    console.log(data, index);
    const fake_data = this.state.data[index];
    fake_data.clicked = !fake_data.clicked;
    this.setState({ fake_data });
  };
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  deleteIcon=(data)=>{
    this.setState(state => {
        const slides = [...state.slides];
        let chipToDelete = 0;
        for (var x in slides){

            if(slides[x].pk===data){
                chipToDelete=x
                break;
            }
        }
        slides.splice(chipToDelete, 1);
        return { slides };
      });
  }

  render() {
    const { classes } = this.props;
    const {slides} =this.state;
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
       //  style={{ backgroundColor: "#f2f3f8" }}
      >
        <ImageUploader
          buttonClassName="buttonLogoUpluad"
          buttonStyles={{ display: "none" }}
          withPreview={false}
          withIcon={false}
          withLabel={false}
          label="Üniversite resimlerinizi yükleyebilirsiniz"
          buttonText="Resim yükle"
          onChange={this.onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
          singleImage={true}
        />
        <Grid
          item
          md={11}
          container
          justify="center"
          alignItems="center"
          style={{ marginTop: 70 }}
        >
        <Zoom in={true} style={{ transitionDelay: 250 }}>
        <Grid container alignItems='center'>
        <Grid
              item
              md={1}
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.videocardViewLogo}
            >
              <Grid item>
                <Avatar
                  onClick={this.openFileUpload}
                  className={classes.avatar}
                  src={
                    this.state.logoData === ""
                      ? null
                      : this.state.logoData
                  }
                  alt=""
                />
              </Grid>
            </Grid>
            <Grid item  xs style={{paddingLeft:23}}>
            <Typography style={{color:'rgba(117, 114, 114, 0.87)',fontFamily:'Montserrat',fontSize:30,fontWeight:700}}>{this.state.uniName}</Typography>
            <Typography style={{color:'rgba(175, 170, 170, 0.87)',fontFamily:'Montserrat',fontSize:18,fontWeight:700}}>ul Puanı:{" "}<b style={{backgroundColor:'#64bc36',padding:'5px 10px',color:'white',borderRadius:'25%'}}>{this.state.ulScore}</b></Typography>
            </Grid>
            <Grid item xs container justify='flex-end'>
            <Button
              variant="contained"
              color="primary"
              style={{ padding: "15px 50px",backgroundColor:'rgb(162, 150, 216)' }}
              onClick={() => this.setState({ openDialog: true })}
            >
              KAYDET
            </Button></Grid>


        </Grid>



          </Zoom>
          <Grid container style={{marginTop:30}}>

            </Grid>

<Grid container>
<Grid
              item
              xs
              container
              direction="column"
              style={{
                boxShadow: "0 2px 15px 0 rgba(0,0,0,.05)",
                minHeight: 200,
                borderRadius: 5,
                backgroundColor: "white",

                borderTop:'5px solid rgb(162, 150, 216)'
              }}
            >
              <Grid
                container
                style={{
                  padding: "0 30px",
                  height: 50,
                  marginTop:10
                }}
                alignItems="center"
              >
                <Typography style={{color:'rgb(123, 113, 169)',fontFamily:'Montserrat',fontSize:22,fontWeight:700}}>Hakkınızda</Typography>
              </Grid>
              <Grid
                item
                xs
                container
                style={{
                  padding: "10px 30px"
                }}
              >
                <TextField
                  multiline
                  fullWidth
                  rowsMax={6}
                  rows={6}
                  style={{fontSize:14}}

                    InputProps={{
                      classes: {
                        input: classes.bootInput,
                        underline: classes.rootUnderline,
                      },
                    }}
                  onChange={this.handleChange("content")}
                  value={this.state.content}
                  placeholder="Hakkınızda birşey yazmıyor..."
                />
              </Grid>
            </Grid>


          <Grid item xs style={{ maxWidth: "5%" }} />
          <Grid
              item
              xs
              container
              direction="column"
              style={{
                boxShadow: "0 2px 15px 0 rgba(0,0,0,.05)",
                minHeight: 200,
                borderRadius: 5,
                backgroundColor: "white",

                borderTop:'5px solid rgb(162, 150, 216)'
              }}
            >
              <Grid
                container
                style={{
                  padding: "0 30px",
                  height: 50,
                  marginTop:10
                }}
                alignItems="center"
              >
                <Typography style={{color:'rgb(123, 113, 169)',fontFamily:'Montserrat',fontSize:22,fontWeight:700}}>Galeri</Typography>
              </Grid>
              <Carousel slides={slides}></Carousel>

            </Grid>


</Grid>
           <Zoom in={true} style={{ transitionDelay: 750 }}>
            <Grid item container>
              <Grid
                item
                xs
                container
                style={{
                  boxShadow: "0 2px 15px 0 rgba(0,0,0,.05)",
                  borderRadius: 5,
                  padding: "10px 30px 20px",
                  margin: "50px 0 0",
                  backgroundColor: "white",
                  borderTop:'5px solid rgb(162, 150, 216)'
                }}
              >
                <Grid
                  container
                  style={{
                    height: 50,
                    marginBottom:10
                  }}
                  alignItems="center"
                >
                  <Typography style={{color:'rgb(123, 113, 169)',fontFamily:'Montserrat',fontSize:22,fontWeight:700}}>Genel Bakış</Typography>
                </Grid>
                <Grid container>
                  <Grid item xs container>
                    <TextField
                      fullWidth
                      id="outlined-name"
                      label="Öğrenci Sayısı"
                      className={classes.textField}
                      onChange={this.handleChange("numStudent")}
                      value={this.state.numStudent}
                      margin="normal"
                      variant="outlined"

                      InputLabelProps={{
                        classes: {
                          root: classes.montserrat,
                        },
                      }}
                      InputProps={{
                        classes: {
                          input: classes.bootInput,
                          //root: classes.bootstrapRoot,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs style={{ maxWidth: "2%" }} />
                  <Grid item xs container>
                    <TextField
                      fullWidth
                      id="outlined-name"
                      label="Uluslararası Öğrenci"
                      className={classes.textField}
                      onChange={this.handleChange("intStudent")}
                      value={this.state.intStudent}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        classes: {
                          root: classes.montserrat,
                        },
                      }}
                      InputProps={{
                        classes: {
                          input: classes.bootInput,
                          //root: classes.bootstrapRoot,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs container>
                    <TextField
                      fullWidth
                      id="outlined-name"
                      label="Yerleşme Oranı"
                      className={classes.textField}
                      onChange={this.handleChange("oran")}
                      value={this.state.oran}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        classes: {
                          root: classes.montserrat,
                        },
                      }}
                      InputProps={{
                        classes: {
                          input: classes.bootInput,
                          //root: classes.bootstrapRoot,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs style={{ maxWidth: "2%" }} />
                  <Grid item xs container>
                    <TextField
                      fullWidth
                      id="outlined-name"
                      label="Ortalama Ücret"
                      className={classes.textField}
                      onChange={this.handleChange("price")}
                      value={this.state.price}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        classes: {
                          root: classes.montserrat,
                        },
                      }}
                      InputProps={{
                        classes: {
                          input: classes.bootInput,
                          //root: classes.bootstrapRoot,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs container>
                    <TextField
                      fullWidth
                      id="outlined-name"
                      label="Erasmus"
                      className={classes.textField}
                      onChange={this.handleChange("erasmus")}
                      value={this.state.erasmus}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        classes: {
                          root: classes.montserrat,
                        },
                      }}
                      InputProps={{
                        classes: {
                          input: classes.bootInput,
                          //root: classes.bootstrapRoot,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs style={{ maxWidth: "2%" }} />
                  <Grid item xs container>
                    <TextField
                      fullWidth
                      id="outlined-name"
                      label="Teknoloji Ofisi"
                      className={classes.textField}
                      onChange={this.handleChange("techOfice")}
                      value={this.state.techOfice}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        classes: {
                          root: classes.montserrat,
                        },
                      }}
                      InputProps={{
                        classes: {
                          input: classes.bootInput,
                          //root: classes.bootstrapRoot,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={1} style={{ maxWidth: "5%" }} />
              <Grid
                item
                xs
                container
                style={{
                  boxShadow: "0 2px 15px 0 rgba(0,0,0,.05)",
                  borderRadius: 5,
                  padding: "10px 30px 20px",
                  margin: "50px 0 0",
                  backgroundColor: "white",
                  borderTop:'5px solid rgb(162, 150, 216)'
                }}
              >
                <Grid
                  container
                  style={{
                    height: 50,
                    marginBottom:10
                  }}
                  alignItems="center"
                >
                  <Typography style={{color:'rgb(123, 113, 169)',fontFamily:'Montserrat',fontSize:22,fontWeight:700}}>Üniversite Bilgileri</Typography>
                </Grid>
                <Grid container>
                  <Grid item xs container>
                    <TextField
                      fullWidth
                      id="outlined-name"
                      label="Email"
                      className={classes.textField}
                      onChange={this.handleChange("email")}
                      value={this.state.email}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        classes: {
                          root: classes.montserrat,
                        },
                      }}
                      InputProps={{
                        classes: {
                          input: classes.bootInput,
                          //root: classes.bootstrapRoot,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs style={{ maxWidth: "2%" }} />
                  <Grid item xs container>
                    <TextField
                      fullWidth
                      id="outlined-name"
                      label="Telefon"
                      className={classes.textField}
                      onChange={this.handleChange("phone")}
                      value={this.state.phone}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        classes: {
                          root: classes.montserrat,
                        },
                      }}
                      InputProps={{
                        classes: {
                          input: classes.bootInput,
                          //root: classes.bootstrapRoot,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs container>
                    <TextField
                      fullWidth
                      id="outlined-name"
                      label="Adres"
                      className={classes.textField}
                      onChange={this.handleChange("address")}
                      value={this.state.address}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        classes: {
                          root: classes.montserrat,
                        },
                      }}
                      InputProps={{
                        classes: {
                          input: classes.bootInput,
                          //root: classes.bootstrapRoot,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs style={{ maxWidth: "2%" }} />
                  <Grid item xs container>
                    <TextField
                      fullWidth
                      id="outlined-name"
                      label="Facebook"
                      className={classes.textField}
                      onChange={this.handleChange("facebook")}
                      value={this.state.facebook}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        classes: {
                          root: classes.montserrat,
                        },
                      }}
                      InputProps={{
                        classes: {
                          input: classes.bootInput,
                          //root: classes.bootstrapRoot,
                        },
                      }}

                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs container>
                    <TextField
                      fullWidth
                      id="outlined-name"
                      label="Twitter"
                      className={classes.textField}
                      onChange={this.handleChange("twitter")}
                      value={this.state.twitter}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        classes: {
                          root: classes.montserrat,
                        },
                      }}
                      InputProps={{
                        classes: {
                          input: classes.bootInput,
                          //root: classes.bootstrapRoot,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs style={{ maxWidth: "2%" }} />
                  <Grid item xs container>
                    <TextField
                      fullWidth
                      id="outlined-name"
                      label="Instagram"
                      className={classes.textField}
                      onChange={this.handleChange("instagram")}
                      value={this.state.instagram}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        classes: {
                          root: classes.montserrat,
                        },
                      }}
                      InputProps={{
                        classes: {
                          input: classes.bootInput,
                          //root: classes.bootstrapRoot,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Zoom>
          <Zoom
            in={true}
            style={{
              transitionDelay: 1000
            }}
          >
            <Grid
              item
              container
              style={{
                boxShadow: "0 2px 15px 0 rgba(0,0,0,.05)",
                borderRadius: 5,
                padding: "10px 20px",
                margin: "50px 0",
                backgroundColor: "white",
                borderTop:'5px solid rgb(162, 150, 216)'
              }}
            >
              <Grid
                container
                style={{
                  padding: "15px 15px 20px",
                  height: 50,
                  marginBottom:10
                }}
                alignItems="center"
                justify="space-between"
              >
                <Typography style={{color:'rgb(123, 113, 169)',fontFamily:'Montserrat',fontSize:22,fontWeight:700}}>Neler var?</Typography>
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.expanded
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <ExpandLessIcon />
                </IconButton>
              </Grid>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <Grid item xs container style={{ padding: "10px 0px" }}>
                  {this.state.data.map((item, index) => (
                    <NewsCard
                      datax={item}
                      index={index}
                      onClickHandle={this.onClickHandle}
                    />
                  ))}
                </Grid>
              </Collapse>
            </Grid>
          </Zoom>

         <Grid item container style={{ marginBottom: 50 }}>
            <Grid
              item
              xs
              container
              style={{
                boxShadow: "0 2px 15px 0 rgba(0,0,0,.05)",
                borderRadius: 5,
                padding: "10px 20px",
                backgroundColor: "white",
                borderTop:'5px solid rgb(162, 150, 216)'
              }}
            >
              <ImgUpload />
            </Grid>
            <Grid item md={1} style={{ maxWidth: "5%" }} />
            <Grid
              item
              md={2}
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.videocardView}
              style={{ borderTop:'5px solid rgb(162, 150, 216)'}}
            >
              <Grid item>
                <Avatar
                  className={classes.avatar}
                  id="iconPlay"
                  onClick={this.handleVideo}
                >
                  <Typography
                    style={{ color: "white", liheHeight: 1.4, fontSize: 20 }}
                    align="center"
                  >
                    Video
                    <br /> ekle
                  </Typography>
                </Avatar>
                <DialogVideo
                  onHandleVideo={this.handleVideo}
                  onHandleVideoText={this.handleVideoText}
                  open={this.state.openVideoText}
                  videoUrl={this.state.videoUrl}
                />
              </Grid>
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
