import logo from "./logo.svg";
import "./App.css";

import { useEffect, useState } from "react";
import axios from "axios";
import PieChart from "./components/PieChart";

import { Chart, ArcElement } from "chart.js";
import { CategoryScale } from "chart.js";
import { registerables } from "chart.js";

import BarChart from "./components/BarChart";
import LineChart from "./components/DataLine";
Chart.register(CategoryScale);
Chart.register(ArcElement);
Chart.register(...registerables);
function App() {
  const [data, setData] = useState([]);
  const [jumlahTasklist, setJumlahTasklist] = useState([]);
  console.log(jumlahTasklist);
  console.log(data);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:9000/");
        const response = await axios.get(
          "http://localhost:9000/jumlah_tasklist"
        );
        setJumlahTasklist(response.data.data);

        setData(res.data.data);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    fetch();
  }, []);

  let dataPie;
  if (jumlahTasklist) {
    dataPie = {
      labels: [jumlahTasklist[0]?.ontime, jumlahTasklist[0]?.late],
      datasets: [
        {
          data: [
            jumlahTasklist[0]?.percentage_ontime,
            jumlahTasklist[0]?.percentage_late,
          ],
          backgroundColor: ["#f00", "#0f0"],
          color: ["black"],
        },
      ],
    };
  }

  let dataBar;
  if (jumlahTasklist) {
    dataBar = {
      labels: ["On Time", "Late"],
      datasets: [
        {
          label: "Total Tasklist",
          data: [jumlahTasklist[0]?.ontime, jumlahTasklist[0]?.late],
          backgroundColor: ["#36A2EB", "#FF6384"],
        },
      ],
    };
  }

  return (
    <div className="h-screen   bg-backgroundSecondary flex ">
      <div className="w-[200px] h-full fixed bg-white   border-r-[2px] border-r-backgroundLow shadow-xl py-[50px] flex flex-col justify-between ">
        <div
          className={` text-white py-4 px-[10px] hover:bg-slate-700 bg-[#6147DB]   w-full flex justify-start items-center gap-5  cursor-pointer`}
        >
          <h1>Dashboard</h1>
        </div>
      </div>
      <div className="font-bold text-[22px] w-full h-auto ml-[200px] ">
        <div className="w-full h-[75px] bg-white flex items-center pl-[50px]">
          Dashboard
        </div>
        <div className="p-[50px]">
          <div className="w-[200px] h-[280px] bg-white p-[20px] rounded-xl">
            <PieChart dataPie={dataPie} />
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <div className="w-[20px] h-[20px] bg-[#0f0] rounded-lg"></div>
                <h1 className="text-[12px] ">{`Late (${jumlahTasklist[0]?.percentage_ontime}%)`}</h1>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-[20px] h-[20px] bg-[#f00] rounded-lg"></div>
                <h1 className="text-[12px] ">{`On Time (${jumlahTasklist[0]?.percentage_late}%)`}</h1>
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="w-[700px]  bg-white  mt-[50px] rounded-xl p-[50px]">
              <BarChart dataBar={dataBar} />
            </div>
            <div className="w-[700px]  bg-white  mt-[50px] rounded-xl p-[50px]">
              <LineChart dataLine={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
