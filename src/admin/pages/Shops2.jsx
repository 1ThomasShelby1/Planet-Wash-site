import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaTrash } from "react-icons/fa";
import { FaStore } from "react-icons/fa6";
import { useParams, useNavigate } from 'react-router-dom';
import Orders from "./shoptables/Orders";
import TotalRevenue from "./shoptables/TotalRevenue";
import DelBoys from "./shoptables/DelBoys";
import { useGetAllShopsQuery, useDeleteShopMutation } from "../redux/auth/AuthApi";

const Shops2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  // Fetch all shops
  const { data, isLoading, error } = useGetAllShopsQuery();
  const [deleteShop] = useDeleteShopMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Find the shop with the matching id
  const post = data?.shops?.find(s => s._id === id);

  if (!post) return <div>Shop not found.</div>;

  const handleDelete = async () => {
    try {
      await deleteShop(post._id).unwrap();
      // Redirect to the shops list after deletion
      navigate('/shops');
    } catch (err) {
      console.error('Failed to delete the shop:', err);
    }
  };

  return (
    <div>
      <div className="max-w-full ">
        <div className="relative bg-white h-[480px] flex flex-col rounded-xl shadow-sm overflow-hidden border border-gray-200">

          {/* Trash button */}
          <button
            className="absolute top-2 right-2 text-red-500 hover:text-red-600"
            onClick={handleDelete}
          >
            <FaTrash />
          </button>

          {/* Top content: Image and Shop Details */}
          <div className="flex">
            {/* Shop Image */}
            <img
              src={post.image}
              alt="Laundry"
              className="w-52 h-48 object-cover p-2 rounded-2xl"
            />

            {/* Shop Details */}
            <div className="p-4 text-sm flex-1 font-sans space-y-6 ml-3">
              <h1 className="text-lg font-bold flex items-center gap-2">
                <FaStore className="text-blue-500" />
                {post.shopName}
              </h1>
              <p className="flex items-center text-[#BDB5B5] mt-4">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                {post.address}
              </p>
              <p className="flex items-center text-[#BDB5B5] mt-4">
                <FaPhone className="mr-2 text-blue-500" />
                {post.contactNo}
              </p>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-[#BDB5B5] font-[400] flex ">
                  <span className="text-black">Registered On : </span> <div className='flex ml-2 '>
                    <p className=" ">
                      {new Date(post.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <p className='mx-2'>&</p>
                    <p className="text-sm text-[#BDB5B5] ">
                      {new Date(post.createdAt).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </p>
              </div>
            </div>
          </div>

          {/* Line under entire content */}
          <hr className="border-t border-[#D9D9D9] my-2" />

          {/* Total Orders button */}
          <div className="p-3 space-x-4 font-sans">
            <button
              onClick={() => setActiveTab('orders')}
              className={`rounded-md p-1 font-semibold text-sm px-4 transition ${activeTab === 'orders'
                ? 'bg-[#8EDF4C] text-white'
                : 'bg-[#F4F7FE] text-[#919191] hover:bg-[#8EDF4C] hover:text-white'
                }`}
            >
              Total Orders
            </button>
            <button
              onClick={() => setActiveTab('revenue')}
              className={`rounded-md p-1 font-semibold text-sm px-4 transition ${activeTab === 'revenue'
                ? 'bg-[#8EDF4C] text-white'
                : 'bg-[#F4F7FE] text-[#919191] hover:bg-[#8EDF4C] hover:text-white'
                }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`rounded-md p-1 font-semibold text-sm px-4 transition ${activeTab === 'delivery'
                ? 'bg-[#8EDF4C] text-white'
                : 'bg-[#F4F7FE] text-[#919191] hover:bg-[#8EDF4C] hover:text-white'
                }`}
            >
              Delivery Boys
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-2 font-sans">
            {activeTab === 'orders' && <Orders userId={id} />}
            {activeTab === 'revenue' && (
              <div className="overflow-y-auto max-h-[300px]">
                <TotalRevenue />
              </div>
            )}
            {activeTab === 'delivery' && <DelBoys userId={id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shops2;
