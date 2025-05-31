import React from 'react';
import { useGetUsersTotalOrdersQuery } from '../../redux/auth/AuthApi';

const TotalOrders = ({ userId }) => {
  const { data } = useGetUsersTotalOrdersQuery(userId);
  const mydata = data?.orders || [];

  return (
   <div className="w-full overflow-x-hidden">
  <table className="w-full bg-white border border-gray-200 rounded-lg shadow text-sm font-sans">
    <thead className="bg-gray-100 text-gray-800">
      <tr>
        <th className="px-4 py-3 border-b font-[400]">Order Date & Time</th>
        <th className="px-4 py-3 border-b font-[400]">Delivered On</th>
        <th className="px-4 py-3 border-b font-[400]">Address</th>
        <th className="px-4 py-3 border-b font-[400]">Pick Up By</th>
        <th className="px-4 py-3 border-b font-[400]">Delivered By</th>
        <th className="px-4 py-3 border-b font-[400]">Services</th>
        <th className="px-4 py-3 border-b font-[400]">Items</th>
        <th className="px-4 py-3 border-b font-[400]">Payment</th>
        <th className="px-4 py-3 border-b font-[400]">Amount</th>
      </tr>
    </thead>
    <tbody className="text-[#919191] text-xs text-center font-[300]">
      {mydata.map((order) => {
        const totalQuantity = order.services?.reduce((acc, service) => {
          return acc + (service.products?.reduce((pAcc, p) => pAcc + (p.quantity || 0), 0) || 0);
        }, 0) || 0;

        return (
          <tr key={order._id} className="hover:bg-gray-50">
            <td className="p-1 border-b">
              <div className="flex gap-1 justify-center items-center">
                <span>{new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
                <span>&</span>
                <span>{new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </td>
            <td className="px-2 py-2 border-b">
              {new Date(order.updatedAt).toLocaleDateString('en-IN')}
            </td>
            <td className="px-2 py-2 border-b break-words">{order.addressId?.location || '-'}</td>
            <td className="px-2 py-2 border-b">{order.pickupBy?.name || '-'}</td>
            <td className="px-2 py-2 border-b">{order.deliveredBy?.name || '-'}</td>
            <td className="px-2 py-2 border-b">
              {order.services?.map((s, i) => (
                <div key={i}>{s.serviceId?.name}</div>
              ))}
            </td>
            <td className="px-2 py-2 border-b">{totalQuantity}</td>
            <td className="px-2 py-2 border-b">{order.paymentMethod || 'Pending'}</td>
            <td className="px-2 py-2 border-b">₹{order.totalAmount}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

  );
};

export default TotalOrders;

//  <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow text-sm">
//         <thead className="bg-gray-100 text-gray-700">
//           <tr className='whitespace-nowrap'>
//             <th className="px-4 py-3 border-b text-left">Order Date</th>
//             <th className="px-4 py-3 border-b text-left">Delivered On</th>
//             <th className="px-4 py-3 border-b text-left">Address</th>
//             <th className="px-4 py-3 border-b text-left">Services</th>
//             <th className="px-4 py-3 border-b text-left">Items</th>
//             <th className="px-4 py-3 border-b text-left">Amount</th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-800">
//           {mydata && mydata.map((order) => (
//             <tr key={order._id} className="hover:bg-gray-50">
//               {/* <td className="px-4 py-3 border-b">{order.name}</td> */}
//               <td className="px-4 py-3 border-b">{order.services?.[0]?.serviceId?.name}</td>
//               <td className="px-4 py-3 border-b">{order.}</td>
//               <td className="px-4 py-3 border-b">₹{order.totalAmount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>