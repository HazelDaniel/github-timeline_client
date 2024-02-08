"use strict";
import Chart from "chart.js/auto";

document.addEventListener("DOMContentLoaded", () => {
  function createGraph(horizontal) {
    const myGraph = document.getElementById("graph");
    const ctx = myGraph.getContext("2d");
    const accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent-color")
      .trim();
    const accentColorTrans = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent-color_trans")
      .trim();
    const chartType = "line";
    const myChart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            label: "Weekly contributions",
            data: [5, 59, 80, 81, 56, 55, 30],
            borderColor: `${accentColor}`,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: !horizontal ? "y" : "x",
        aspectRatio: !horizontal ? 9 / 16 : 2,
        scales: {
          x: {
            grid: {
              display: true,
              color: `${accentColorTrans}`,
            },
          },
          y: {
            grid: {
              display: true,
              color: `${accentColorTrans}`,
            },
          },
        },
      },
    });
  }

  createGraph(window.innerWidth > 600);
});
