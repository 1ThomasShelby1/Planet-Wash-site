import React from 'react'
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FaRegCalendar } from 'react-icons/fa';
import { RiBarChartFill } from 'react-icons/ri';
import { IoMdArrowDropup } from 'react-icons/io';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend
);

const lineChartData = {
  labels: ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"],
  datasets: [
    {
      label: "Total Spent",
      data: [8, 12, 10, 16, 14, 7],
      borderColor: "#7F56D9",
      backgroundColor: "#7F56D9",
      tension: 0.4,
      fill: false,
    },
  ],
};

const barChartData = {
  labels: ["17", "18", "19", "20", "21", "22", "23", "24", "25"],
  datasets: [
    {
      label: "Weekly Revenue",
      data: [5, 6, 7, 8, 7, 6, 7, 8, 7],
      backgroundColor: "#7F56D9",
    },

  ],
};

const barOptions = {
  plugins: {
    legend: { display: false },
  },
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};


const DashBoard_Graphs = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Line Chart */}
      <div className="bg-white rounded-xl p-3 shadow-sm h-60">
        <div className="flex justify-between items-center mb-2 ">
          <h3 className="flex  text-sm p-1 text-[#A3AED0] bg-[#F4F7FE] rounded-sm">
            <FaRegCalendar className="mr-1 " />
            This month
          </h3>

          <div className='bg-[#F4F7FE] rounded-sm p-1'>
            <RiBarChartFill />
          </div>
        </div>
        <div className=' flex w-full '>
          <div className='block '>
            <h className="text-2xl  mt-2 text-[#2B3674] font-bold">Rs.37.5K</h>
            <div className='flex'>
              <h1 className='text-xs text-[#A3AED0]'>Total Spents</h1>
              <IoMdArrowDropup color='#05CD99' className='ml-2 text-xs' />
              <h1 className='text-xs text-[#05CD99]'>
                +2.45%</h1>
            </div>
            <p className="text-sm text-[#05CD99] flex items-center pr-2 pt-3">
              <img src="public/dashboard/Frame 5.png" className="mr-1" />
              On track
            </p>
          </div>
          <div className='h-60 ml-4 '>
            <Line height={180} width={320} data={lineChartData} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-xl p-3 shadow-sm h-60 ">
        <div className="flex justify-between items-center mb-10 h-10">
          <h2 className="text-md font-bold text-[#1B2559] ">Weekly Revenue</h2>

          <div className='bg-[#F4F7FE] rounded-sm p-1'>
            <RiBarChartFill />
          </div>
        </div>
        <div className='h-40'>
          <Bar height={90} width={300} data={barChartData} options={barOptions} />
        </div>
      </div>
    </div>
  )
}

export default DashBoard_Graphs