import React, { Fragment } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  Avatar,
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

import Carousel from "react-material-ui-carousel";

export default function Gallery() {
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

        {/* <Grid item lg={5} md={6}>
          <Card>
            <CardHeader title="Facegenie Compact" subheader="" />
            <CardContent>
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
        </Grid> */}
      </Grid>
    </Fragment>
  );
}
