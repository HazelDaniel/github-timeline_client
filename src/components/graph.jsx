import { useContext } from "react";
import { getChartConfig } from "../data";
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
  Tooltip
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
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
  const data = getChartConfig({
    chartType: graphTypeState.graphType,
    doc: document,
    horizontal: window.innerWidth > 600,
  });

  if (graphTypeState.graphType === "lines") return <Line {...data} />;
  else return <Bar {...data} style={{ zIndex: 2 }} />;
};
