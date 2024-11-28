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
} from "recharts";

// Types for our data
type SalesData = {
  name: string;
  value: number;
  color: string;
};

type RevenueData = {
  month: string;
  income: number;
  expenses: number;
};

export const SalesDashboard = () => {
  // Data for the horizontal bar chart
  const salesData: SalesData[] = [
    { name: "Products Launched", value: 233, color: "#4ade80" },
    { name: "Ongoing Product", value: 23, color: "#4ade80" },
    { name: "Product Sold", value: 482, color: "#4ade80" },
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
            data={[
              { name: "Products Launched", value: 233 },
              { name: "Ongoing Product", value: 123 },
              { name: "Product Sold", value: 482 },
            ]}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
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
              label={({ x, y, width, index }) => {
                const labels = [
                  "Products Launched",
                  "Ongoing Product",
                  "Product Sold",
                ];
                return (
                  <text
                    x={x + width / 1.1}
                    y={y - 5}
                    fontSize="14"
                    textAnchor="middle"
                  >
                    {`${labels[index]} (${[233, 123, 482][index]})`}
                  </text>
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
  );
};

export const Revenue = () => {
  // Data for the revenue chart
  const revenueData: RevenueData[] = [
    { month: "Jan", income: 150000, expenses: 120000 },
    { month: "Feb", income: 130000, expenses: 140000 },
    { month: "Mar", income: 120000, expenses: 110000 },
    { month: "Apr", income: 140000, expenses: 130000 },
    { month: "May", income: 180000, expenses: 150000 },
    { month: "Jun", income: 170000, expenses: 0 },
  ];

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
            <p className="relative font-semibold text-lg">$</p>
            <span className="text-4xl font-semibold relative -top-4 pl-3">
              193,000
            </span>
          </div>
          <div className="font-bold flex items-center gap-2 text-nowrap">
            <FaChartLine className="text-green-300" />
            <span className="text-green-300">+35%</span>
            <span>from last month</span>
          </div>
        </div>
      </div>
      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[
              { month: "Jan", income: 12000, expenses: 8000 },
              { month: "Feb", income: 14000, expenses: 10000 },
              { month: "Mar", income: 16000, expenses: 11000 },
              { month: "Apr", income: 18000, expenses: 12000 },
              { month: "May", income: 20000, expenses: 14000 },
              { month: "Jun", income: 22000, expenses: 16000 },
            ]}
            margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} hide />
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
