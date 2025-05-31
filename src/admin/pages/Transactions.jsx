import React from 'react'
import { GiMoneyStack, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi"
import { FaArrowDown, FaArrowUp, FaUsers } from 'react-icons/fa';
import WeeklySalesBarChart from '../components/WeeklySalesBarChart';

const Transactions = () => {
    const stats = [
        { title: "Total Revenue", icon: <GiMoneyStack />, count: "200000", subtext: "Total Registered", bg: "bg-blue-500", data: [50, 80, 100, 120, 90, 110, 150] },
        { title: "Total Commission", icon: <GiReceiveMoney />, count: "110000", subtext: "Completed Orders", bg: "bg-green-500", data: [30, 70, 80, 60, 50, 100, 120] },
        { title: "Total Balance", icon: <GiTakeMyMoney />, count: "450000", subtext: "Total Earnings", bg: "bg-yellow-500", data: [20, 60, 90, 110, 100, 120, 140] },
        // { title: "Pending Approval", icon: <CiClock2 />, count: "20%", subtext: "Monthly Growth", bg: "bg-red-500", data: [10, 40, 70, 90, 80, 110, 130] }
    ];
    return <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <div key={index} className="p-4 bg-white rounded-xl">
                    {/* Title + Icon (Side-by-Side) */}
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold">{stat.title}</h3>
                        <p className='text-2xl text-blue-500'>
                            {stat.icon}
                        </p>
                    </div>

                    {/* Number + Subtext */}
                    <p className="text-2xl  mt-2 text-blue-600">{stat.count}</p>
                    <div className="flex items-center gap-4 mt-2">
                        <div className='flex items-center bg-red-100 text-red-500 p-1 text-xs rounded-md gap-1'>

                            <p><FaArrowDown /></p>
                            <p className=''>
                                10%</p>
                        </div>
                        <h3 className="text-gray-800 text-xs ">Decrease from last week</h3>

                    </div>
                </div>
            ))}
        </div>

        <div className=" mx-auto mt-5">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Bar Chart (Full width on sm, 8 columns on md+) */}
                <div className="md:col-span-8 bg-white p-6 rounded-xl">
                    <WeeklySalesBarChart />
                </div>

                {/* Stats Box (Full width on sm, 4 columns on md+) */}
                <div className="md:col-span-4 flex flex-col gap-4">
                    {/* Total Users Box */}
                    <div className="p-5 rounded-xl text-gray-700">
                        {/* <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Users</h3>
                            <FaUsers className="text-2xl text-blue-500" />
                        </div>
                        <p className="text-2xl mt-2 text-blue-600">20,000</p>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex bg-red-200 p-1 text-xs rounded-md gap-1">
                                <FaArrowUp />
                                <p>14%</p>
                            </div>
                            <h3>Increase from last</h3>
                        </div> */}
                    </div>

                    {/* Total Sales Box with Chart */}
                    <div className=" p-4 rounded-xl flex justify-center items-center">
                        {/* <DoughnutChart /> */}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Transactions