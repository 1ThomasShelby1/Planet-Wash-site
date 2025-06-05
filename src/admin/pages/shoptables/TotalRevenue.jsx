import React from 'react'

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
    }
    ,
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
    <div className="max-w-full py-2 overflow-auto max-h-[200px] ">
      <table className=" bg-white  h-56  border border-gray-200 rounded-lg  shadow-sm">
        <thead className="bg-gray-100 text-[#1E1E1E] overflow-y-auto max-h-[200px]">
          <tr className='whitespace-nowrap text-sm font-sans overflow-auto'>
            <th className="px-4 py-2 font-[400]">Customer Name</th>
            <th className="px-4 py-2 font-[400]">Contact No</th>
            <th className="px-4 py-2 font-[400]">Email</th>
            <th className="px-4 py-2 font-[400]">Service Type</th>
            <th className="px-4 py-2 font-[400]">Address</th>
            <th className="px-4 py-2 font-[400]">Payment Method</th>
            <th className="px-4 py-2 font-[400]">Amount</th>
          </tr>
        </thead>
        <tbody className="text-xs max-h-[100px] overflow-y-auto text-slate-500 ">
          {customers.map((customer, index) => (
            <tr key={index} className="border-t text-[#919191] font-[300]">
              <td className="px-4 py-2 whitespace-nowrap">{customer.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{customer.phone}</td>
              <td className="px-4 py-2 whitespace-nowrap">{customer.email}</td>
              <td className="px-4 py-2 whitespace-nowrap">{customer.service}</td>
              <td className="px-4 py-2 ">{customer.address}</td>
              <td className="px-4 py-2">{customer.Payment}</td>
              <td className="px-4 py-2 whitespace-nowrap text-[#399703]">{customer.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    // <div className="max-w-full py-2">
    //   <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
    //     <thead className="bg-gray-100 text-[#1E1E1E]">
    //       <tr className="whitespace-nowrap font-sans">
    //         <th className="px-4 py-2 text-left font-[600]">Customer</th>
    //         <th className="px-4 py-2 text-left font-[600]">Contact No</th>
    //         <th className="px-4 py-2 text-left font-[600]">Email</th>
    //         <th className="px-4 py-2 text-left font-[600]">Service Type</th>
    //         <th className="px-4 py-2 text-left font-[600]">Address</th>
    //         <th className="px-4 py-2 text-left font-[600]">Payment Method</th>
    //         <th className="px-4 py-2 text-left font-[600]">Amount</th>
    //       </tr>
    //     </thead>
    //   </table>

    //   {/* Scrollable tbody wrapper */}
    //   <div className="max-h-[100px] overflow-y-auto">
    //     <table className="min-w-full">
    //       <tbody className="text-sm text-[#919191]">
    //         {customers.map((customer, index) => (
    //           <tr key={index} className="border-t font-[500]">
    //             <td className="px-4 py-2 whitespace-nowrap">{customer.name}</td>
    //             <td className="px-4 py-2 whitespace-nowrap">{customer.phone}</td>
    //             <td className="px-4 py-2 whitespace-nowrap">{customer.email}</td>
    //             <td className="px-4 py-2 whitespace-nowrap">{customer.service}</td>
    //             <td className="px-4 py-2">{customer.address}</td>
    //             <td className="px-4 py-2">{customer.Payment}</td>
    //             <td className="px-4 py-2 whitespace-nowrap text-[#399703]">{customer.amount}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>

  )
}

export default TotalRevenue