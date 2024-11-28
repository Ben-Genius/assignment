"use client";
import EllipsisHorizontalIcon from "@heroicons/react/20/solid/EllipsisHorizontalIcon";
import React from "react";
import { FaChartLine } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";



export const SalesDashboard = ({ salesData }: { salesData: { product_launched: string; ongoing_product: string; product_sold: string } }) => {
  // Data for the horizontal bar chart
  const data = [
    { name: "Products Launched", value: parseInt(salesData.product_launched) },
    { name: "Ongoing Product", value: parseInt(salesData.ongoing_product) },
    { name: "Product Sold", value: parseInt(salesData.product_sold) },
  ];

  return (
    <div className="lg:col-span-2 w-full">
    <div className="overflow-hidden rounded-lg bg-gray-100 shadow w-full">
      <div className="px-4 py-5 sm:p-6 flex items-center justify-between">
        <div className="text-xl font-bold">Sales Report</div>
        <EllipsisHorizontalIcon className="h-7 w-7 text-black" />
      </div>
      <div className="border-t border-gray-300 my-2"></div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <Tooltip />

            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 500]} hide={true} />
            <YAxis
              type="category"
              dataKey="name"
              tick={false}
              width={0}
            />
            <Bar
              dataKey="value"
              fill="#9cf12b"
              radius={[0, 4, 4, 0]}
              barSize={20}
             
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
  );
};

export const Revenue = ({ revenueData }: { revenueData: {
  currency: string;
  amount: string;
  percentage_change: string;
  break_down: Array<{
    week: string;
    revenue: string;
    expense: string;
  }>;
} }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-100 shadow my-10 relative lg:-top-80 right-30 lg:max-w-[54rem] xl:w-full">
      <div className="px-4 py-5 sm:p-6 flex items-center justify-between">
        <div className="text-xl font-bold">Revenue</div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-sm bg-[#022706] mr-1" />
            <span className="text-sm font-medium">Income</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-sm bg-[#9cf12b] mr-1" />
            <span className="text-sm font-medium">Expenses</span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 my-2"></div>
      <div className="mb-4 px-4">
        <div className="flex items-center justify-between">
          <div className="w-full relative">
            <p className="relative font-semibold text-sm">{revenueData.currency}</p>
            <span className="text-4xl font-semibold relative -top-3 pl-6">
              {parseInt(revenueData.amount).toLocaleString()}
            </span>
          </div>
          <div className="font-bold flex items-center gap-2 text-nowrap">
            <FaChartLine className="text-green-300" />
            <span className="text-green-300">{revenueData.percentage_change}</span>
            <span>from last month</span>
          </div>
        </div>
      </div>
      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={revenueData.break_down.map(item => ({
              month: `Week ${item.week}`,
              income: parseInt(item.revenue),
              expenses: parseInt(item.expense)
            }))}
            margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
          >
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis hide />
            <Bar
              dataKey="income"
              name="Income"
              fill="#022706"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#9cf12b"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

