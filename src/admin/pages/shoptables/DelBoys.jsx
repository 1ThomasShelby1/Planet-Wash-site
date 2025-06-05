import React from 'react'
import { useGetAllDeliveryBoysByShopIdQuery } from '../../redux/auth/AuthApi';

const DelBoys = ({ userId }) => {

  const { data } = useGetAllDeliveryBoysByShopIdQuery(userId)

  return (
    <div className="overflow-auto py-2 ">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-gray-100 text-[#1E1E1E] text-sm ">
          <tr className="font-sans">
            <th className="px-2 py-2 text-center font-[400]">Customer Name</th>
            <th className="px-2 py-2 text-center font-[400]">Contact No</th>
            <th className="px-2 py-2 text-center font-[400]">Email</th>
            <th className="px-2 py-2 text-center font-[400]">Registration Date & Time</th>
          </tr>
        </thead>
      <tbody className="text-xs text-slate-500 text-center font-[300]">
  {data && data.map((customer, index) => (
    <tr key={index} className="border-t">
      <td className="px-2 py-2 whitespace-nowrap">{customer.addressId.name}</td>
      <td className="px-2 py-2 whitespace-nowrap">{customer.addressId.contactNo}</td>
      <td className="px-2 py-2 whitespace-nowrap">{customer.addressId.email}</td>
      <td className="px-2 py-2 whitespace-nowrap">
        <div className="flex justify-center items-center gap-1">
          <span>
            {new Date(customer.addressId.createdAt).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </span>
          <span>&</span>
          <span>
            {new Date(customer.addressId.createdAt).toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  )
}

export default DelBoys