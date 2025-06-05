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

    // Init months with 0
    for (
      let date = startOfMonth(startDate);
      isBefore(date, endOfMonth(endDate)) || date.getTime() === endOfMonth(endDate).getTime();
      date = addMonths(date, 1)
    ) {
      const monthKey = format(date, 'MMM yyyy');
      monthlyTotals[monthKey] = 0;
    }

    // Init weeks with 0
    for (
      let date = startOfWeek(startDate, { weekStartsOn: 1 });
      isBefore(date, endOfMonth(endDate)) || date.getTime() === endOfMonth(endDate).getTime();
      date = addWeeks(date, 1)
    ) {
      const weekKey = format(date, 'dd MMM yyyy');
      weeklyTotals[weekKey] = 0;
    }

    // Fill data from API
    data?.forEach((order) => {
      const date = parseISO(order.createdAt);
      if (isBefore(date, startDate) || isAfter(date, endDate)) return;

      const monthKey = format(date, 'MMM yyyy');
      const weekStart = startOfWeek(date, { weekStartsOn: 1 });
      const weekKey = format(weekStart, 'dd MMM yyyy');

      monthlyTotals[monthKey] += order.totalAmount;
      weeklyTotals[weekKey] += order.totalAmount;
    });

    // Current month bounds
    const currentMonthStart = startOfMonth(new Date());
    const currentMonthEnd = endOfMonth(new Date());

    // Filter weeks starting in current month
    const filteredWeeklyTotals = Object.entries(weeklyTotals).reduce((acc, [weekLabel, total]) => {
      const weekStartDate = parse(weekLabel, 'dd MMM yyyy', new Date());
      if (
        (weekStartDate.getTime() === currentMonthStart.getTime() || weekStartDate > currentMonthStart) &&
        (weekStartDate.getTime() === currentMonthEnd.getTime() || weekStartDate < currentMonthEnd)
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
        title: { display: false, text: 'Month' },
        ticks: {
          callback: (val) => {
            // val is index here
            return monthlyData.labels && monthlyData.labels[val]
              ? monthlyData.labels[val].split(' ')[0]
              : '';
          },
        },
      },
      y: {
        beginAtZero: true,
        title: { display: false, text: 'Revenue (₹)' },
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false, text: 'Weekly Revenue' },
    },
    scales: {
      x: {
        title: { display: false, text: 'Week Starting' },
        ticks: {
          callback: (val) => {
            // val is index here
            return weeklyData.labels && weeklyData.labels[val]
              ? weeklyData.labels[val].split(' ')[0]
              : '';
          },
        },
      },
      y: {
        beginAtZero: true,
        title: { display: false, text: 'Revenue (₹)' },
      },
    },
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      {/* Line Chart */}
      <div className="bg-white  rounded-xl p-2 shadow-sm h-[280px]">

        <div className='flex justify-around'>
          <div>
            <h1 className='text-xs text-[#A3AED0] whitespace-nowrap ml-2'>Total Spents</h1>
            <h className="text-2xl text-[#2B3674] font-bold">Rs.37.5K</h>
          </div>
          <div className='block w-fit'>
            <h3 className="flex text-sm p-1 text-[#A3AED0] bg-[#F4F7FE] rounded-md">
              <FaRegCalendar className="mr-1 " />
              This month
            </h3>
          </div>
          <div>
            {/* <RiBarChartFill className='bg-[#F4F7FE] rounded-sm ml-14' /> */}
            <p className="text-sm text-[#05CD99] flex items-center pr-2 ">
              <img src="/TickMark.png" className="mr-1" />
              On track
            </p>
            <div className='flex'>
              <IoMdArrowDropup color='#05CD99' className='ml-2 text-xs' />
              <h1 className='text-xs text-[#05CD99]'>
                +2.45%</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center ml-3">
          <div className='flex'>

          </div>

        </div>

        <div className=' w-full px-6  '>
          <div className=' w-full ' >
            <Line data={monthlyData} options={lineOptions} />
          </div>
        </div>
      </div>
      {/* Bar Chart */}
      <div className="bg-white rounded-xl px-2 shadow-sm h-[280px] ">
        <div className="flex justify-between items-center  h-10">
          <h2 className="text-md font-bold text-[#1B2559] ">Weekly Revenue</h2>
          <div className='bg-[#F4F7FE] rounded-sm p-1'>
            <RiBarChartFill />
          </div>
        </div>
        <div className='w-full h-full'>
          <Bar data={weeklyData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard_Graphs;