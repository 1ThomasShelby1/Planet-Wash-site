import React from 'react';
import { useGetAllOrderByStatusQuery } from '../../redux/auth/AuthApi';

const OngoingOrders = () => {
  const { data, isLoading, error } = useGetAllOrderByStatusQuery('ongoing');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading orders</div>;

  return (
    <div className="">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow font-sans text-center">
        <thead className="bg-gray-100 text-[#1E1E1E] text-sm">
          <tr>
            <th className="px-4 py-3 border-b font-[400]">Order Date & Time</th>
            <th className="px-4 py-3 border-b font-[400]">Address</th>
            <th className="px-4 py-3 border-b font-[400]">Services</th>
            <th className="px-4 py-3 border-b font-[400]">Items</th>
            <th className="px-4 py-3 border-b font-[400]">Payment Method</th>
            <th className="px-4 py-3 border-b font-[400]">Amount</th>
          </tr>
        </thead>
        <tbody className="text-slate-500 font-sans font-[300] text-xs rounded-lg">
          {Object.values(data).map((ordersArray, i) =>
            ordersArray.map((order, j) => {
              const totalQuantity = order.services?.reduce((acc, service) => {
                const productQuantity = service.products?.reduce((prodAcc, product) => {
                  return prodAcc + (product.quantity || 0);
                }, 0) || 0;
                return acc + productQuantity;
              }, 0) || 0;

              return (
                <tr key={order._id || `${i}-${j}`} className="hover:bg-gray-50">
                  <td className=" flex mt-2 p-1 justify-center items-center">
                    <p className="">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <span className='mx-1 '>&</span>
                    <p className="">
                      {new Date(order.createdAt).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </td>                  <td className="px-4 py-3 border-b">{order?.addressId?.location}</td>
                  <td className="px-4 py-3 border-b"> {order.services?.map((service, index) => (
                    <div key={index}>{service.serviceId?.name}</div>
                  ))}</td>
                  <td className="px-4 py-3 border-b">{totalQuantity}</td>
                  <td className="px-4 py-3 border-b">pending</td>
                  <td className="px-4 py-3 border-b">₹{order?.totalAmount}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OngoingOrders;
