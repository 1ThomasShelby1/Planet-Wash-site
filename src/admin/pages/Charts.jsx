import React, { useMemo } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { useGetAllOrdersQuery } from '../redux/auth/AuthApi';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  parseISO,
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  addMonths,
  addWeeks,
  isBefore,
  isAfter,
  parse,
} from 'date-fns';
import { FaRegCalendar } from 'react-icons/fa';
import { RiBarChartFill } from 'react-icons/ri';
import { IoMdArrowDropup } from 'react-icons/io';

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const DashBoard_Graphs = () => {
  const { data, isLoading, error } = useGetAllOrdersQuery();

  const { monthlyData, weeklyData } = useMemo(() => {
    const monthlyTotals = {};
    const weeklyTotals = {};

    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear, 11, 31);

    // Initialize months
    for (
      let date = startOfMonth(startDate);
      isBefore(date, endOfMonth(endDate)) || date.getTime() === endOfMonth(endDate).getTime();
      date = addMonths(date, 1)
    ) {
      const monthKey = format(date, 'MMM yyyy');
      monthlyTotals[monthKey] = 0;
    }

    // Initialize weeks
    for (
      let date = startOfWeek(startDate, { weekStartsOn: 1 });
      isBefore(date, endOfMonth(endDate)) || date.getTime() === endOfMonth(endDate).getTime();
      date = addWeeks(date, 1)
    ) {
      const weekKey = format(date, 'dd MMM yyyy');
      weeklyTotals[weekKey] = 0;
    }

    // Fill totals
    data?.forEach((order) => {
      const date = parseISO(order.createdAt);
      if (isBefore(date, startDate) || isAfter(date, endDate)) return;

      const monthKey = format(date, 'MMM yyyy');
      const weekStart = startOfWeek(date, { weekStartsOn: 1 });
      const weekKey = format(weekStart, 'dd MMM yyyy');

      monthlyTotals[monthKey] += order.totalAmount;
      weeklyTotals[weekKey] += order.totalAmount;
    });

    const currentMonthStart = startOfMonth(new Date());
    const currentMonthEnd = endOfMonth(new Date());

    const filteredWeeklyTotals = Object.entries(weeklyTotals).reduce((acc, [weekLabel, total]) => {
      const weekStartDate = parse(weekLabel, 'dd MMM yyyy', new Date());
      if (
        (weekStartDate >= currentMonthStart) &&
        (weekStartDate <= currentMonthEnd)
      ) {
        acc[weekLabel] = total;
      }
      return acc;
    }, {});

    return {
      monthlyData: {
        labels: Object.keys(monthlyTotals),
        datasets: [
          {
            label: 'Total Spends',
            data: Object.values(monthlyTotals),
            borderColor: '#7F56D9',
            backgroundColor: '#7F56D9',
            tension: 0.4,
            fill: false,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#7F56D9',
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBorderWidth: 2,
          },
        ],
      },
      weeklyData: {
        labels: Object.keys(filteredWeeklyTotals),
        datasets: [
          {
            label: 'Weekly Revenue',
            data: Object.values(filteredWeeklyTotals),
            backgroundColor: '#7F56D9',
          },
        ],
      },
    };
  }, [data]);

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Revenue' },
    },
    scales: {
      x: {
        ticks: {
          callback: (val) =>
            monthlyData.labels && monthlyData.labels[val]
              ? monthlyData.labels[val].split(' ')[0]
              : '',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
    },
    scales: {
      x: {
        ticks: {
          callback: (val) =>
            weeklyData.labels && weeklyData.labels[val]
              ? weeklyData.labels[val].split(' ')[0]
              : '',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 animate-pulse">
        <div className="h-[280px] bg-gray-100 rounded-xl" />
        <div className="h-[280px] bg-gray-100 rounded-xl" />
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  const totalMonthlySpend = monthlyData.datasets[0]?.data?.reduce((a, b) => a + b, 0) || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      {/* Line Chart */}
      <div className="bg-white rounded-xl p-2 shadow-sm h-[280px]">
        <div className="flex justify-between items-center px-2 mb-1">
          <div>
            <h1 className="text-xs text-[#A3AED0]">Total Spents</h1>
            <h2 className="text-2xl text-[#2B3674] font-bold">
              ₹{totalMonthlySpend.toLocaleString()}
            </h2>
          </div>
          <div className="flex items-center gap-1 text-sm text-green-500">
            <IoMdArrowDropup className="text-xl" />
            <span>+8.4%</span>
          </div>
        </div>
        <Line data={monthlyData} options={lineOptions} />
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-xl p-2 shadow-sm h-[280px]">
        <div className="flex justify-between items-center px-2 mb-1">
          <h1 className="text-xs text-[#A3AED0]">Weekly Revenue</h1>
          <RiBarChartFill className="text-[#7F56D9]" />
        </div>
        <Bar data={weeklyData} options={barOptions} />
      </div>
    </div>
  );
};

export default DashBoard_Graphs;
