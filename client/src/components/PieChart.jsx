import { Pie } from "react-chartjs-2";

import React from "react";

const PieChart = ({ dataPie }) => {
  const options = {
    title: {
      display: true,
      text: "Chart title",
    },
    plugins: { legend: { position: "bottom" } },
  };
  return <Pie data={dataPie} options={options} />;
};

export default PieChart;
