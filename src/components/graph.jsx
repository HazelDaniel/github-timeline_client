import { useContext, useMemo } from "react";
import { getChartConfig, userInfo } from "../data";
import { graphTypeContext } from "../contexts/graph.context";
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
  extractCommitCountInIntervalDays,
  extractGraphPayload,
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

export const GraphCanvas = () => {
  const { graphTypeState } = useContext(graphTypeContext);
  const { graphDataState } = useContext(graphDataContext);

  const { data } = getRepoListStateForGraph();
  const userName = userInfo.username;
  const payLoad = extractGraphPayload(userName, data);
  let weekContribCount = useMemo(() => [0, 0, 0, 0, 0, 0, 0], []);
  if (payLoad.repoName) {
    weekContribCount = extractCommitCountInIntervalDays(
      ...payLoad.dateRange,
      graphDataState.commits
    );
  }

  const configData = getChartConfig({
    chartType: graphTypeState.graphType,
    doc: document,
    horizontal: window.innerWidth > 600,
    dataset: weekContribCount,
  });

  if (graphTypeState.graphType === "lines") return <Line {...configData} />;
  else return <Bar {...configData} style={{ zIndex: 2 }} />;
};
