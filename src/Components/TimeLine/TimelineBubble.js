import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chart from "react-apexcharts";
import Average from "../subtrends/Average";
import {
  Grid,
  Card,
  Typography,
  Box,
  makeStyles,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    transition: "0.3s",
    "&:hover": {
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    },
  },
  cardStyle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  iconHolder: {
    padding: theme.spacing(3, 2),
    backgroundColor: "#ECECEC",
  },
}));

export default function TimelineBubble({ colours }) {
  function generateData(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
  var options = {
    // series: [
    //   {
    //     name: "Product1",
    //     data:
    //       (new Date("11 Feb 2017 GMT").getTime(),
    //       20,
    //       {
    //         min: 10,
    //         max: 60,
    //       }),
    //   },
    //   {
    //     name: "Product2",
    //     data:
    //       (new Date("11 Feb 2017 GMT").getTime(),
    //       20,
    //       {
    //         min: 10,
    //         max: 60,
    //       }),
    //   },
    //   {
    //     name: "Product3",
    //     data:
    //       (new Date("11 Feb 2017 GMT").getTime(),
    //       20,
    //       {
    //         min: 10,
    //         max: 60,
    //       }),
    //   },
    //   {
    //     name: "Product4",
    //     data:
    //       (new Date("11 Feb 2017 GMT").getTime(),
    //       20,
    //       {
    //         min: 10,
    //         max: 60,
    //       }),
    //   },
    // ],
    series: [
      {
        name: "Product1",
        data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: "Product2",
        data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: "Product3",
        data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: "Product4",
        data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bubble",
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      title: {
        text: "3D Bubble Chart",
      },
      xaxis: {
        tickAmount: 12,
        type: "datetime",
        labels: {
          rotate: 0,
        },
      },
      yaxis: {
        max: 70,
      },
      theme: {
        palette: "palette2",
      },
    },
  };

  return (
    <div>
      <Chart
        options={options.options}
        series={options.series}
        type="bubble"
        height={400}
      />
    </div>
  );
}
