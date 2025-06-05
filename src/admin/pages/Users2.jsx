import { useState } from "react";
import { FaCalendarAlt, FaClipboardList, FaShoppingBag, FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import TotalOrders from "./usertables/TotalOrders";
import OngoingOrders from "./usertables/OngoingOrders";
import { useGetAllUsersQuery, useGetUsersTotalOrdersQuery } from "../redux/auth/AuthApi";
import { IoBagOutline } from "react-icons/io5";

const Users2 = () => {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState('orders');

  const token = localStorage.getItem("RRB");

  const { data } = useGetUsersTotalOrdersQuery(id);
  const mydata = data?.orders || [];
  const om = mydata.length

  const { data: allUsers, isLoading } = useGetAllUsersQuery();
  if (isLoading) return <div>Loading</div>;
  const post = allUsers.find((s) => s._id === id);

  return (

    <div className="w-[355px] sm:w-[990px]">
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:justify-center md:items-center gap-4 font-sans">
        {/* User Info */}
        <div className="flex">
        <FaUser className="text-5xl text-[#8EDF4C] mr-3 mt-4" />
          <div className="">
            <h2 className="text-2xl font-[400] text-black font-sa">{post.Name}</h2>
            <p className="text-base text-[#919191]">{post.contactNo}</p>
            <p className="text-base text-[#919191]">{post.email}</p>
          </div>
        </div>


        {/* Info Cards */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {/* Account Creation */}
          <div className="border rounded-xl p-4 flex flex-col items-start w-full md:w-auto font-[500]">
            <span className="text-lg text-black mb-2">Account Creation</span>
            <div className="flex items-center space-x-2 text-sm text-[#919191]">
              <FaCalendarAlt className="text-blue-500 text-lg" />
              <div className="flex">
                <p>
                  {new Date(post.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <p className="mx-1">&</p>
                <p>
                  {new Date(post.createdAt).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="border rounded-xl p-4 flex flex-col items-start w-full md:w-auto font-[500]">
            <span className="text-lg text-black mb-2">Total Orders</span>
            <div className="flex items-center space-x-2 text-sm text-[#919191]">
              <FaShoppingBag className="text-blue-500 text-lg" />
              <span className="text-sm text-[#919191]">{om}</span>
            </div>
          </div>

          {/* Ongoing Order */}
          <div className="border rounded-xl p-4 flex flex-col items-start w-full md:w-auto font-[500]">
            <span className="text-lg text-black mb-2">Ongoing Order</span>
            <div className="flex items-center space-x-2 text-sm text-[#919191]">
              <FaClipboardList className="text-blue-500 text-lg" />
              <span className="text-sm text-[#919191]">{token}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-auto mx-auto bg-white rounded-2xl shadow mt-6">
        {/* Tabs */}
        <div className="px-4 py-2 flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('orders')}
            className={`rounded-md p-1 text-lg px-4 transition flex ${activeTab === 'orders'
              ? 'text-[#8EDF4C] '
              : 'text-[#919191] hover:text-[#8EDF4C] '
              }`}
          >
            <IoBagOutline className="mr-2 mt-[5px]" />
            Total Orders
          </button>

          <button
            onClick={() => setActiveTab('revenue')}
            className={`rounded-md p-1 font-[500] text-lg px-4 transition ${activeTab === 'revenue'
              ? 'text-[#8EDF4C]'
              : 'text-[#919191] hover:text-[#8EDF4C] '
              }`}
          >
            Ongoing Orders
          </button>
        </div>

        {/* Tab Content   TotalOrders */}
        <div className="p-2">
          {activeTab === 'orders' && (
            <div className="overflow-auto max-h-[400px]">
              <TotalOrders userId={id} />
            </div>
          )}
          {activeTab === 'revenue' && (
            <div className="overflow-auto max-h-[300px]">
              <OngoingOrders userId={id} />
            </div>
          )}
        </div>
      </div>

    </div>


  )
}

export default Users2