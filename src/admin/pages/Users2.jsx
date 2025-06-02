import { useState } from "react";
import { FaCalendarAlt, FaClipboardList, FaShoppingBag, FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import TotalOrders from "./usertables/TotalOrders";
import OngoingOrders from "./usertables/OngoingOrders";
import { useGetAllUsersQuery, useGetUsersTotalOrdersQuery } from "../redux/auth/AuthApi";
import { IoBagOutline } from "react-icons/io5";




// const customers = new Array(8).fill(null).map((_, idx) => ({
//   id: idx,
//   name: `John Doe ${idx+1}`,
//   contact: "8545785478",
//   email: "johndoe@gmail.com",
//   address: "15-A Main Road, Surat",
//   date: "25/05/2025",
//   joinedDate: "20/05/2024",
//   totalOrders: 23,
//   totalAmount: "₹4,500",
// }));


const Users2 = () => {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState('orders');
  const { data } = useGetUsersTotalOrdersQuery(id);
  const mydata = data?.orders || [];
  const om = mydata.length

  const { data: allUsers, isLoading } = useGetAllUsersQuery();
  if (isLoading) return <div>Loading</div>;
  const post = allUsers.find((s) => s._id === id);

  return (

    <div className="w-[990px]">

      <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between font-sans ">
        {/* User Info */}
        <FaUser className="text-5xl text-[#8EDF4C]" />
        <div>
          <div className="">
            <h2 className="text-2xl font-[400] text-black font-sa">{post.Name}</h2>
            <p className="text-base text-[#919191]">{post.contactNo}</p>
            <p className="text-base text-[#919191]">{post.email}</p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="flex gap-2">
          {/* Account Creation */}
          <div className="border rounded-xl p-4 flex flex-col items-start w-60 font-[500]">
            <span className="text-lg  text-black mb-2  ">Account Creation</span>
            <div className="flex items-center space-x-2 text-sm text-[#919191]">
              <FaCalendarAlt className="text-blue-500 text-lg" />
              <div className="flex">
                <p className="">
                  {new Date(post.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <p className='mx-1'>&</p>
                <p className="">
                  {new Date(post.createdAt).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="border rounded-xl p-4 flex flex-col items-start w-40 font-[500]">
            <span className="text-lg  text-black mb-2">Total Orders</span>
            <div className="flex items-center space-x-2 text-sm text-[#919191]">
              <FaShoppingBag className="text-blue-500 text-lg" />
              <span className="text-sm text-[#919191]">{om}</span>
            </div>
          </div>

          {/* Ongoing Order */}
          <div className="border rounded-xl p-4 flex flex-col items-start w-40 font-[500]">
            <span className="text-lg text-black mb-2">Ongoing Order</span>
            <div className="flex items-center space-x-2 text-sm text-[#919191]">
              <FaClipboardList className="text-blue-500 text-lg" />
              <span className="text-sm text-[#919191]">1</span>
            </div>
          </div>
        </div>


      </div>

      <div className="w-full mx-auto bg-white rounded-2xl shadow mt-6">
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
          {activeTab === 'orders' && <TotalOrders userId={id} />}
          {activeTab === 'revenue' && <OngoingOrders userId={id} />}
        </div>
      </div>

    </div>


  )
}

export default Users2