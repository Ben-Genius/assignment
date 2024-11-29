"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { FaChartLine } from "react-icons/fa";
import { PiChartLineDownBold } from "react-icons/pi";
import DoughnutChart from "../ui/chartComponents/doughnut";
import { SalesDashboard, Revenue } from "../ui/chartComponents/chartComponent";
import { withAuth } from "../middleware/authMiddleware";
import toast from "react-hot-toast";
import axios from "../services/utils/axiosConfig";
import { DashboardData } from "../services/model/model";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  useEffect(() => {
    fetchDashboardData();
  }, []);
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("/report/summary/");
      console.log(response);
      if (response.data.status) {
        setDashboardData(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch dashboard data"
      );
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-10">
        <p>Failed to load dashboard data</p>
        <button
          onClick={fetchDashboardData}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-4 mt-4">
      {/* Header */}
      <h1 className="text-3xl font-bold mt-0">Dashboard</h1>
      <div className="flex justify-between items-center mb-6 ">
        <div className="flex items-center space-x-2 w-full justify-between">
          <p>An any way to manage sales with care and precision</p>
          <span className="text-gray-500">January 2024 - May 2024</span>
        </div>
      </div>

      {/* Cards */}
      <div className="w-full ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <div className="bg-[#022706] text-white p-6 rounded-xl shadow  px-6 w-full h-[14rem]">
            <div className=" flex items-center  space-x-2 mb-4 w-full">
              {" "}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <p className="text-sm font-semibold text-gray-300">Update</p>
            </div>
            <small className="text-gray-400 font-medium">
              {" "}
              {new Date(dashboardData.update.date).toLocaleDateString()}
            </small>
            <h2 className="text-xl font-bold sm:text-nowrap max-w-[15rem]">
              Sales revenue increased
            </h2>
            <span className="text-xl font-bold">
              <span className="text-green-400">
                {dashboardData.update.percentage_change}
              </span>{" "}
              in 1 week
            </span>
            <div className="mt-7">
              <Link href="" className="text-xs text-gray-400">
                See Statistics {">"}
              </Link>
            </div>
          </div>

          <div className="  rounded-lg border-2  px-6 py-7 border-gray-500 flex flex-col justify-between ">
            <div className="flex items-center justify-between">
              <h3 className="text-black font-medium ">Net Income</h3>
              <EllipsisHorizontalIcon className="h-7 w-7 text-black" />
            </div>
            <div className="w-full text-center relative">
              <span className="text-5xl font-semibold relative">
                {" "}
                {parseInt(
                  dashboardData.net_income.amount
                ).toLocaleString()}{" "}
              </span>
              <p className="relative -top-14 font-semibold right-[6.5rem]  text-sm">
                {dashboardData.net_income.currency}
              </p>
            </div>

            <div className="font-bold  flex items-center gap-2">
              <FaChartLine className="text-green-400 " />
              <span className="text-green-400">
                {" "}
                {dashboardData.net_income.percentage_change}{" "}
              </span>
              <span>from last month</span>
            </div>
          </div>

          <div className=" p-6 rounded-lg border-2  px-6 w-full border-gray-500 flex flex-col justify-between h-[14rem] relative">
            <div className="flex items-center justify-between">
              <h3 className="text-black font-medium ">Total Return</h3>
              <EllipsisHorizontalIcon className="h-7 w-7 text-black" />
            </div>
            <div className="w-full text-center relative">
              <span className="text-5xl font-semibold relative">
                {" "}
                {dashboardData.total_return.amount}
              </span>
              <p className="relative -top-14 font-semibold right-24  text-sm">
                {dashboardData.total_return.currency}
              </p>
            </div>

            <div className="font-bold  flex items-center gap-2 relative">
              <PiChartLineDownBold className="text-red-400 " />
              <span className="text-red-400">
                {" "}
                {dashboardData.total_return.percentage_change}
              </span>
              <span>from last month</span>
            </div>
          </div>

          <DoughnutChart
            viewPerformance={dashboardData.total_view_perfomance}
          />

          {/* Charts Section */}

          <SalesDashboard salesData={dashboardData.sales_report} />

          <Revenue
            revenueData={{
              ...dashboardData.revenue,
              break_down: dashboardData.revenue.break_down.map((item) => ({
                ...item,
                week: item.week.toString(),
              })),
            }}
          />
        </div>
        <div>
          {/* <DoughnutChart viewPerformance={dashboardData.total_view_perfomance}/> */}

          {/* Footer Section */}
          <div className="flex justify-end w-full mt-4 md:-mt-[32rem] xl:-mt-[13rem]">
            <div className="bg-[#d9d3c9] p-6 rounded-lg shadow-lg w-full md:max-w-[17rem] 2xl:max-w-[24rem] px-6 h-[22rem] flex flex-col justify-end">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight max-w-[16rem] 2xl:max-w-full text-center">
                Level up your sales management to the next level
              </h2>
              <p className="mt-8 text-sm text-gray-700 leading-normal">
                An any way to manage sales with care and precision
              </p>
              <button className="mt-4 bg-green-600 text-white text-base px-6 py-2 rounded-lg shadow hover:bg-green-700 mb-4">
                Update to Siohioma+
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
