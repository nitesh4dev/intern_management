import React, { useEffect, useState, useContext } from "react";
import Chart from "react-apexcharts";
import { makeStyles } from "@material-ui/core";
import { DataContext } from "../../Context/DataContext";

export default function AnalyticsBarGraph({ series, categories, colours }) {
  var options = {
    series: series,
    chart: {
      type: "bar",
      height: 350,
    },
    colors: colours,
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "65%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      title: {},
    },
    fill: {
      opacity: 1,
    },
  };
  return (
    <div>
      <Chart
        options={options}
        series={options.series}
        type="bar"
        height={300}
      />
    </div>
  );
}
