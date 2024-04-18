import React from "react";

import { Bar } from "react-chartjs-2";

const BarChart = ({ dataBar }) => {
  return <Bar data={dataBar} />;
};

export default BarChart;
