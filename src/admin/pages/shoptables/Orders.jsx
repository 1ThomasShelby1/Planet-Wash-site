import React from 'react'
import { useGetAllOrderByShopIdQuery } from '../../redux/auth/AuthApi'

const Orders = ({ userId }) => {
  const { data, isLoading, isError } = useGetAllOrderByShopIdQuery(userId);

  if (isLoading) return <p className="text-center py-4">Loading...</p>;
  if (isError) return <p className="text-center py-4 text-red-500">Something went wrong.</p>;

  return (
    <div className="w-[200px]">
      <table className="bg-white border border-gray-200 rounded-lg shadow-sm table-auto overflow-auto">
        <thead className="bg-gray-100 text-[#1E1E1E] text-sm">
          <tr className="whitespace-nowrap font-sans text-left">
            <th className="w-1/6 px-4 py-2 font-[400]">Customer Name</th>
            <th className="w-1/6 px-4 py-2 font-[400]">Contact No</th>
            <th className="w-1/6 px-4 py-2 font-[400]">Email</th>
            <th className="w-1/6 px-4 py-2 font-[400]">Service Type</th>
            <th className="w-1/6 px-4 py-2 font-[400]">Address</th>
            <th className="w-1/6 px-4 py-2 font-[400]">Amount</th>
          </tr>
        </thead>
        <tbody className="text-xs ">
          {data && data.map((customer, index) => (
            <tr key={customer._id || index} className="border-t text-slate-500 font-[300]">
              <td className="w-1/6 px-4 py-2 whitespace-nowrap">{customer?.addressId?.name || 'N/A'}</td>
              <td className="w-1/6 px-4 py-2 whitespace-nowrap">{customer?.addressId?.contactNo || 'N/A'}</td>
              <td className="w-1/6 px-4 py-2 whitespace-nowrap">{customer?.addressId?.email || 'N/A'}</td>
              <td className="w-1/6 px-4 py-2 whitespace-nowrap">{customer?.services?.[0]?.serviceId?.name || 'N/A'}</td>
              <td className="w-1/6 px-4 py-2 whitespace-nowrap">{customer?.addressId?.location || 'N/A'}</td>
              <td className="w-1/6 px-4 py-2 whitespace-nowrap text-[#399703]">₹{customer?.totalAmount || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders
