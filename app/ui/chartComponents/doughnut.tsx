"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ViewPerformance } from "@/app/services/model/model";

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({ viewPerformance }: { viewPerformance: ViewPerformance }) => {
  const data = {
    labels: ["View Count", "Sale", "Percentage"],
    datasets: [
      {
       data: [
         parseFloat(viewPerformance.view_count),
         parseFloat(viewPerformance.sales),
         parseFloat(viewPerformance.percentage)
       ],
        backgroundColor: ["#9cf12b", "#e28b3b", "#1f870f"],
        borderWidth: 0,
      },
    ],
    hoverOffset: 4,
    
   };
   
   const options = {
   
    cutout: "70%",
    rotation: 70,
    plugins: {
      tooltip: { enabled: false },
      legend: {
        display: false,
      }
    },
   };
   
  
  return (
   <div className="">
     <div className="bg-white shadow-lg rounded-2xl w-[20rem] p-6 border-b-4 border-gray-800">
       <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
         Total View Performance
       </h2>
       <hr className="my-4"/>
       <div className="relative mb-6">
         {/* Chart.js Doughnut Chart */}
         <Doughnut data={data} options={options} width={200} height={200} />
         {/* Center Text */}
         <div className="absolute inset-0 flex flex-col items-center justify-center">
           <p className="text-gray-600 text-sm">Total Count</p>
           <p className="text-3xl font-bold text-gray-900">{viewPerformance.total_count}</p>
         </div>
         {/* Percentage Labels */}
     
       </div>
       <p className="text-sm text-center text-gray-500 mb-4">
         Here are some tips on how to improve your score
       </p>
     <center className="mb-4">
     <button className="bg-white text-black border-2 border-gray-500 max-w-[15rem] mx-auto text-sm py-2 px-4 rounded-lg w-full hover:shadow-md">
         Guide Views
       </button>
     </center>
     <hr/>
       <div className="mt-4 flex justify-between items-center">
       <div className="flex  items-center text-sm gap-2">
       <div className="w-4 h-3 rounded-sm bg-[#9cf12b]"></div>
       <span>View Count</span>
       </div>
         <div className="flex  items-center text-sm gap-2">
   
   <div className="w-4 h-3 rounded-sm bg-[#1f870f]"></div>
   <span>Percentage</span>
   </div>
   <div className="flex  items-center text-sm gap-2">
   <div className="w-4 h-3 rounded-sm bg-[#e28b3b]"></div>
       <span>Sales</span>
       </div>
       </div>
     </div>
   </div>
 );
};

export default DoughnutChart;