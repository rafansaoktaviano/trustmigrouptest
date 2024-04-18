import React from "react";

import { Line } from "react-chartjs-2";

const LineChart = ({ dataLine }) => {
  const labels = dataLine.map((employee) => employee.karyawan);

  const datasets = [
    {
      label: "Achivement Sales",
      data: dataLine.map((employee) => employee.pencapaian_sales),
      borderColor: "#36A2EB",
    },
    {
      label: "Achivement Report",
      data: dataLine.map((employee) => employee.pencapaian_report),
      borderColor: "#FF6384",
    },
    {
      label: "KIP",
      data: dataLine.map((employee) => employee.KPI),
      borderColor: "#00000",
    },
  ];

  const dataLine2 = {
    labels: labels,
    datasets: datasets,
  };

  return <Line data={dataLine2} />;
};

export default LineChart;
