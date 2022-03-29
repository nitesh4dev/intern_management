import React, { Fragment } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  Avatar,
  makeStyles,
  Paper,
  Box,
  Button,
} from "@material-ui/core";
import internsCollage from "../../assets/testimonialmedia/internsCollage.jfif";
import tanvibhosalevideo from "../../assets/testimonialmedia/VideoTanviBhosale.mp4";
import tanvibhosale from "../../assets/testimonialmedia/TanviBhosale.jpg";
import jaskirath from "../../assets/testimonialmedia/JASKIRATSINGH.jpg";
import jaskirathvideo from "../../assets/testimonialmedia/JASKIRATSINGH.mp4";
import siddhantraje from "../../assets/testimonialmedia/SiddhantRaje.jpg";
import siddhantrajevideo from "../../assets/testimonialmedia/SiddhantRaje.mp4";
import vishalkrishna from "../../assets/testimonialmedia/VishalkrishnaBhosle.png";
import vishalkrishnavideo from "../../assets/testimonialmedia/VishalkrishnaBhosle.mp4";
import vmstablet from "../../assets/testimonialmedia/VMS(tablet).mp4";
import compactImage from "../../assets/images/fg-compact.png";
import compactImage2 from "../../assets/images/tablet-compact.svg";
import compactImage3 from "../../assets/images/fg-arrive.png";
import Carousel from "react-material-ui-carousel";
import {
  AccountTree,
  Assessment,
  Face,
  TabletAndroid,
  AccountCircle,
} from "@material-ui/icons";

export default function Gallery() {
  const classes = useStyles();
  const images = [
    {
      internName: "Tanvi Bhosale",
      imageLink: tanvibhosale,
      videoLink: tanvibhosalevideo,
      testimonial:
        "My internship experience at ResoluteAI.in has been an exponentially increasing curve with respect to learning and hands-on with the latest technologies. I have thoroughly enjoyed the whole process.",
    },
    {
      internName: "Jaskirath Singh",
      imageLink: jaskirath,
      videoLink: jaskirathvideo,
      testimonial:
        "My internship at ResoluteAI has allowed me to understand so much more about the ML and AI fields than I could in the classroom. I've learned a lot of new abilities and have a better idea of what to anticipate after graduation.",
    },
    {
      internName: "Siddhant Raje",
      imageLink: siddhantraje,
      videoLink: siddhantrajevideo,
      testimonial:
        "It was great journey where I was able to learn various technologies and make my understanding about Machine Learning much stronger. Everyone here is very supportive, and any issue faced, any suggestion or feedback is highly considered and respected. ",
    },
    {
      internName: "VishalKrishna Bhosle",
      imageLink: vishalkrishna,
      videoLink: vishalkrishnavideo,
      testimonial:
        "My experience has been a lot of fun and very educating. I definitely have made most of the time here and by the end of my term of internship I feel very confident and proud to have been given a chance to work with resoluteai.in",
    },
  ];

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item lg={12}>
          <Card>
            <CardMedia
              component="img"
              image={internsCollage}
              alt="intern image"
              autoPlay
            ></CardMedia>
          </Card>
        </Grid>

        <Grid item lg={5} md={6}>
          <Typography variant="h2" style={{ marginBottom: "20px" }}>
            Testimonials from interns
          </Typography>
          <Carousel animation="slide">
            {images.map((val, index) => {
              return (
                <Card key={index}>
                  <CardHeader title={val.internName} />
                  <CardContent>
                    <Avatar
                      src={val.imageLink}
                      style={{
                        display: "flex",
                        margin: "20px auto",
                        width: 150,
                        height: 150,
                      }}
                      aria-label="intern image"
                    ></Avatar>
                    <Typography>{`"${val.testimonial}"`}</Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Carousel>
        </Grid>

        <Grid item lg={7} md={6}>
          <Typography variant="h2" style={{ marginBottom: "20px" }}>
            Video Testimonials
          </Typography>
          <Carousel>
            {images.map((val, index) => {
              return (
                <Card key={index}>
                  <CardHeader title={val.internName} />
                  <CardMedia
                    component="video"
                    image={val.videoLink}
                    alt="intern image"
                    style={{
                      display: "flex",
                      margin: "20px auto",
                      height: 300,
                    }}
                    controls
                    // autoPlay
                  ></CardMedia>
                </Card>
              );
            })}
          </Carousel>
        </Grid>

        {/* TOPIC: Subscription Plan card */}
        <Grid item md={5} lg={4}>
          <Card elevation={3}>
            <CardHeader
              className={classes.cardHeader}
              component="h1"
              title="Facegenie Compact"
              subheader=""
            />
            <CardContent className={classes.cardContent}>
              <Typography variant="h3">Features</Typography>
              <Typography>
                <ul>
                  <li>Tablet Voluntary Check-In </li>
                  <li>Touchless Attendance</li>
                  <li>Mask Detection</li>
                  <li>Analytics and Reports</li>
                </ul>
              </Typography>
              <Typography variant="h3">Subscription Plan</Typography>
              <Typography>
                <ul>
                  <li>Plan 1: Price 1 </li>
                  <li>Plan 2: Price 2</li>
                </ul>
              </Typography>
            </CardContent>
            <CardMedia
              component="video"
              image={vmstablet}
              alt="intern image"
              style={{
                display: "flex",
                margin: "20px auto",
                height: 400,
              }}
              controls
              // autoPlay
            ></CardMedia>
          </Card>
        </Grid>

        {/* TOPIC:  Compact Card Design 2*/}
        <Grid item xs={12}>
          <Paper elevation={1} style={{ overflow: "hidden" }}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box className={classes.leftContainer2}>
                  <Typography variant="h1" className={classes.leftHeading2}>
                    FaceGenie <span> Compact </span>
                  </Typography>
                  <Box className={classes.features}>
                    <Box className={classes.featureContainer2}>
                      <AccountCircle />
                      <Typography variant="h3">
                        Tablet voluntary Check-in
                      </Typography>
                    </Box>
                    <Box className={classes.featureContainer2}>
                      <TabletAndroid />
                      <Typography variant="h3">Touchless Attendance</Typography>
                    </Box>
                    <Box className={classes.featureContainer2}>
                      <Face />
                      <Typography variant="h3">Mask Detection</Typography>
                    </Box>
                    <Box className={classes.featureContainer2}>
                      <Assessment />
                      <Typography variant="h3">
                        Analytics and Reports
                      </Typography>
                    </Box>
                    <Button
                      className={classes.compactButton2}
                      variant="contained"
                      color="primary"
                    >
                      Learn More
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} style={{ overflow: "hidden" }}>
                <Box className={classes.rightContainer2}>
                  <Box className={classes.imageContainer}>
                    <Box className={classes.imageBox2}></Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* TOPIC:  Compact Card Design 1*/}
        <Grid item xs={12}>
          <Paper elevation={1} style={{ overflow: "hidden" }}>
            <Grid container>
              <Grid item xs={12} md={4}>
                <Box className={classes.leftContainer}>
                  <Typography variant="h1" className={classes.leftHeading}>
                    Facegenie Compact
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.leftDescription}
                  >
                    High performance React template built with lots of powerful
                    components across multiple product niches for fast & perfect
                    apps development processes.
                  </Typography>
                  <Button
                    className={classes.compactButton}
                    variant="outlined"
                    color="primary"
                  >
                    Learn More
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={8} style={{ overflow: "hidden" }}>
                <Box className={classes.rightContainer}>
                  <Box className={classes.gradientBox}> </Box>
                  <Box className={classes.imageBox}></Box>
                  <Box className={classes.featureContainer}>
                    <Grid container style={{ alignItems: "center" }}>
                      <Grid item xs={12} md={6}>
                        <Paper elevation={0} className={classes.featureBox}>
                          <TabletAndroid color="primary" />
                          <Typography variant="h3">
                            Tablet Voluntary Check-In
                          </Typography>
                          <Typography variant="body1">
                            Full details of each employee
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Paper elevation={0} className={classes.featureBox}>
                          <Face color="primary" />
                          <Typography variant="h3">
                            Touchless Attendance
                          </Typography>
                          <Typography variant="body1">
                            Full details of each employee
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Paper elevation={0} className={classes.featureBox}>
                          <AccountTree color="primary" />
                          <Typography variant="h3">Mask Detection</Typography>
                          <Typography variant="body1">
                            Full details of each employee
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Paper elevation={0} className={classes.featureBox}>
                          <Assessment color="primary" />
                          <Typography variant="h3">
                            Analytics and Reports
                          </Typography>
                          <Typography variant="body1">
                            Full details of each employee
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                  {/* <Typography variant="body1">
                    High performance React template built with lots of powerful
                    components across multiple product niches for fast & perfect
                    apps development processes.
                  </Typography> */}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  // TOPIC: Styles for second design

  leftContainer2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    padding: theme.spacing(8, 2),
    rowGap: theme.spacing(6),
  },

  leftHeading2: {
    "& > span": {
      color: theme.palette.primary.main,
    },
  },

  compactButton2: {
    fontSize: theme.spacing(2),
    margin: theme.spacing(4, 0),
    alignSelf: "flex-start",
    padding: theme.spacing(1, 6),
    borderRadius: theme.spacing(8),
  },
  features: {
    display: "flex",
    flexDirection: "column",
    rowGap: theme.spacing(4),
    paddingLeft: theme.spacing(8),
  },

  featureContainer2: {
    display: "flex",
    columnGap: theme.spacing(4),
    justifyContent: "flex-start",
    alignItems: "center",
  },

  rightContainer2: {
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
    position: "relative",
    padding: theme.spacing(4),
    justifyContent: "center",
    flex: 1,
    [theme.breakpoints.down("md")]: {
      minHeight: "300px",
    },
  },

  imageContainer: {
    flex: 1,
    position: "relative",
    minHeight: "100%",
  },

  imageBox2: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    height: "100%",
    width: "100%",
    borderRadius: "inherit",
    // backgroundColor: "black",
    backgroundImage: `url(${compactImage3})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
  // TOPIC: Styles for first design
  leftContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(4, 2),
    rowGap: theme.spacing(3),
    textAlign: "center",
    minHeight: 300,
  },
  leftDescription: {
    // marginBottom: theme.spacing(5),
  },
  rightContainer: {
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
    flex: 1,
    position: "relative",
    background:
      "linear-gradient(100.66deg, rgb(67, 67, 67) 6.56%, rgb(0, 0, 0) 93.57%)",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      minHeight: "300px",
    },
  },
  gradientBox: {
    background: "linear-gradient(rgb(0, 176, 155), rgb(150, 201, 61))",
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "100%",
    width: "100%",
    borderRadius: "inherit",
  },
  imageBox: {
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "100%",
    width: "100%",
    borderRadius: "inherit",
    // backgroundColor: "black",
    backgroundImage: `url(${compactImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  featureContainer: {
    zIndex: "1",
  },
  featureBox: {
    display: "flex",
    flexDirection: "column",
    rowGap: theme.spacing(2),
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3),
  },
}));
