import React from "react";
import { IoCard } from "react-icons/io5";

const RevenueDetails = () => {
  const totalRevenue = "Rs.2000";

  const transactions = [
    {
      name: "John Doe",
      contact: "8978765654",
      email: "john@gmail.com",
      service: "Washing & Ironing",
      shop: "Planet Wash Laundry",
      amount: "+2000",
      payment: "Cash on Delivery",
    },
    {
      name: "John Doe",
      contact: "8978765654",
      email: "john@gmail.com",
      service: "Washing & Ironing",
      shop: "Planet Wash Laundry",
      amount: "+2000",
      payment: "Cash on Delivery",
    },
    // Add more transactions if needed
  ];

  return (
    <div className="max-w-sm md:max-w-6xl mx-auto my-auto space-y-6 p-4 font-sans">
      {/* Card 1: Total Revenue */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center">
        <IoCard className="text-[#019ECE] bg-[#6AD2FF45] size-20 p-4 rounded-lg" />
        <div className="flex flex-col py-2 sm:pl-4">
          <h2 className="text-xl font-[700] text-[#2B3674] mb-1">Total Revenue</h2>
          <p className="text-base font-[500] text-[#A3AED0]">{totalRevenue}</p>
        </div>
      </div>

      {/* Card 2: All Transactions */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h3 className="text-base font-[700] mb-4">All Transactions</h3>

        <div className="w-full overflow-x-auto">
          <table className="min-w-[720px] w-full text-sm text-left text-slate-500 border border-gray-200">
            <thead className="bg-gray-100 text-[#1E1E1E]">
              <tr>
                <th className="px-4 py-3 font-[500]">Customer Name</th>
                <th className="px-4 py-3 font-[500]">Contact No</th>
                <th className="px-4 py-3 font-[500]">Email</th>
                <th className="px-4 py-3 font-[500]">Service Type</th>
                <th className="px-4 py-3 font-[500]">Shop Name</th>
                <th className="px-4 py-3 font-[500]">Amount</th>
                <th className="px-4 py-3 font-[500]">Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50 transition text-xs font-[300]"
                >
                  <td className="px-4 py-3">{txn.name}</td>
                  <td className="px-4 py-3">{txn.contact}</td>
                  <td className="px-4 py-3">{txn.email}</td>
                  <td className="px-4 py-3">{txn.service}</td>
                  <td className="px-4 py-3">{txn.shop}</td>
                  <td className="px-4 py-3 text-green-600 font-[500]">
                    {txn.amount}
                  </td>
                  <td className="px-4 py-3">{txn.payment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenueDetails;
