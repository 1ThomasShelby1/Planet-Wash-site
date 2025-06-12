import React from 'react';

const TotalRevenue = () => {
  const customers = [
    {
      name: "John Doe",
      phone: "8978765654",
      email: "john@gmail.com",
      service: "Washing & Ironing",
      address: "Golden City Center, Chh Sambhajinagar",
      Payment: "Cash on Delivery",
      amount: "200",
    },
    {
      name: "John Doe",
      phone: "8978765654",
      email: "john@gmail.com",
      service: "Washing & Ironing",
      address: "Golden City Center, Chh Sambhajinagar",
      Payment: "Cash on Delivery",
      amount: "200",
    },
    {
      name: "John Doe",
      phone: "8978765654",
      email: "john@gmail.com",
      service: "Washing & Ironing",
      address: "Golden City Center, Chh Sambhajinagar",
      Payment: "Cash on Delivery",
      amount: "200",
    },
  ];

  return (
    <div className="max-w-full py-2 overflow-auto table-auto">
      <table className="min-w-full table-fixed bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-[#1E1E1E] text-sm font-sans text-left">
          <tr>
            <th className=" px-2 py-2 font-[400] ">Customer Name</th>
            <th className=" px-2 py-2 font-[400] ">Contact No</th>
            <th className=" px-2 py-2 font-[400] ">Email</th>
            <th className=" px-2 py-2 font-[400] ">Service Type</th>
            <th className=" px-2 py-2 font-[400] ">Address</th>
            <th className=" px-2 py-2 font-[400] ">Payment Method</th>
            <th className=" px-2 py-2 font-[400] ">Amount</th>
          </tr>
        </thead>
        <tbody className="text-xs text-slate-500 font-[300] ">
          {customers.map((customer, index) => (
            <tr key={index} className="border-t text-[#919191]">
              <td className=" px-2 py-2 whitespace-nowrap">{customer?.name}</td>
              <td className=" px-2 py-2 whitespace-nowrap">{customer?.phone}</td>
              <td className=" px-2 py-2 whitespace-nowrap">{customer?.email}</td>
              <td className=" px-2 py-2 whitespace-nowrap">{customer?.service}</td>
              <td className=" px-2 py-2 whitespace-pre-wrap ">{customer?.address}</td>
              <td className=" px-2 py-2">{customer?.Payment}</td>
              <td className=" px-2 py-2 whitespace-nowrap text-[#399703]">{customer?.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalRevenue;
  