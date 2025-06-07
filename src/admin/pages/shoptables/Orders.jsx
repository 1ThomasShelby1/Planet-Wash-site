import React from 'react'
import { useGetAllOrderByShopIdQuery } from '../../redux/auth/AuthApi'

const Orders = ({ userId }) => {

  const { data } = useGetAllOrderByShopIdQuery(userId)

  return (
    <div className="overflow-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-gray-100 text-[#1E1E1E] text-sm">
          <tr className='whitespace-nowrap font-sans '>
            <th className="px-4 py-2  font-[400]">Customer Name</th>
            <th className="px-4 py-2  font-[400]">Contact No</th>
            <th className="px-4 py-2  font-[400]">Email</th>
            <th className="px-4 py-2  font-[400]">Service Type</th>
            <th className="px-4 py-2  font-[400]">Address</th>
            <th className="px-4 py-2  font-[400]">Amount</th>
          </tr>
        </thead>
        <tbody className="text-xs text-center ">
          {data && data.map((customer, index) => (
            <tr key={index} className="border-t text-slate-500 font-[300]">
              <td className="px-4 py-2 whitespace-nowrap">{customer?.addressId?.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{customer?.addressId?.contactNo}</td>
              <td className="px-4 py-2 whitespace-nowrap">{customer?.addressId?.email}</td>
              <td className="px-4 py-2 whitespace-nowrap">{customer?.services[0]?.serviceId?.name}</td>
              <td className="px-4 py-2">{customer?.addressId?.location}</td>
              <td className="px-4 py-2 whitespace-nowrap text-[#399703]">{customer?.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders