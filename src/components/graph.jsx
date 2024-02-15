import { useContext, useMemo } from "react";
import { userInfo } from "../data";
import { graphNavContext, graphTypeContext } from "../contexts/graph.context";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  BarController,
  BarElement,
  Tooltip,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { graphDataContext } from "../contexts/graph-data.context";
import {
  daysLong,
  extractCommitCountInIntervalDays,
  extractGraphPayload,
  generateDays,
} from "../utils/transformers";
import { getRepoListStateForGraph } from "../utils/storage";

ChartJS.register(
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  BarController,
  BarElement,
  Tooltip
);
// export const days =
export const getChartConfig = ({
  horizontal,
  chartType,
  doc,
  dataset,
}) => {
  const accentColor = getComputedStyle(doc.documentElement)
    .getPropertyValue("--accent-color")
    .trim();
  const accentColorTrans = getComputedStyle(doc.documentElement)
    .getPropertyValue("--accent-color_trans")
    .trim();

  return {
    type: chartType,
    data: {
      labels: daysLong,
      datasets: [
        {
          label: "Contributions today",
          data: dataset,
          borderColor: `${accentColor}` || "#45c3ad",
          tension: 0.1,
          fill: false,
          lineTension: 0.1,
          backgroundColor: `${accentColorTrans}` || "#45c3ae98",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: !horizontal ? 9 / 16 : 2,
      plugins: {
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          type: "category",
          grid: {
            display: true,
            color: `${accentColorTrans}` || "#45c3ae98",
          },
        },
        y: {
          grid: {
            display: true,
            color: `${accentColorTrans}` || "#45c3ae98",
          },
        },
      },
    },
  };
};
export const GraphCanvas = () => {
  const { graphTypeState } = useContext(graphTypeContext);
  const { graphDataState } = useContext(graphDataContext);
  const { graphNavState } = useContext(graphNavContext);

  const { data } = getRepoListStateForGraph();
  const userName = userInfo.username;
  const payLoad = extractGraphPayload(userName, data);
  const labels = generateDays(graphNavState);

  let weekContribCount = useMemo(() => [0, 0, 0, 0, 0, 0, 0], []);
  if (payLoad.repoName) {
    weekContribCount = extractCommitCountInIntervalDays(
      ...graphNavState.range,
      graphDataState.commits
    );
  }
  console.log("rendering graph");
  console.log(graphNavState.range);

  const configData = getChartConfig({
    chartType: graphTypeState.graphType,
    doc: document,
    horizontal: window.innerWidth > 600,
    dataset: weekContribCount,
  });

  if (graphTypeState.graphType === "lines") return <Line {...configData} />;
  else return <Bar {...configData} style={{ zIndex: 2 }} />;
};
