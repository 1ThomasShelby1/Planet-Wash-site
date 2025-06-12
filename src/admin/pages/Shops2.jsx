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

  const { data, isLoading, error } = useGetAllShopsQuery();
  const [deleteShop] = useDeleteShopMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const post = data?.shops?.find(s => s._id === id);
  if (!post) return <div>Shop not found.</div>;

  const handleDelete = async () => {
    try {
      await deleteShop(post._id).unwrap();
      navigate('/shops');
    } catch (err) {
      console.error('Failed to delete the shop:', err);
    }
  };

  return (
    <div>
      <div className="w-[355px] sm:w-[990px] overflow-hidden mx-auto">
        <div className="relative bg-white rounded-xl shadow-sm border border-gray-200 ">
          {/* Container for two cards: image and details */}
          <div className="flex flex-col sm:flex-row">
            {/* 1st Card: Shop Image */}
            <div className="w-full sm:w-52 p-2">
              <img
                src={post.image}
                alt="Laundry"
                className="w-full h-48 object-cover rounded-2xl"
              />
            </div>

            {/* 2nd Card: Trash Button + Shop Details */}
            <div className="relative w-full sm:flex-1 p-4 font-sans space-y-6">
              {/* Trash button positioned absolutely inside details card */}
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-600 z-10"
                onClick={handleDelete}>
                <FaTrash />
              </button>

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
                  <span className="text-black">Registered On : </span>
                  <div className="flex ml-2">
                    <p>
                      {new Date(post.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="mx-2">&</p>
                    <p className="text-sm text-[#BDB5B5]">
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

          {/* Divider line */}
          <hr className="border-t border-[#D9D9D9] my-2" />

          {/* Tab buttons */}
          <div className="p-2 space-x-2 font-sans">
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

          {/* Tab content */}
          {/* Tab content */}
          <div className="p-2 h-48">
            {activeTab === 'orders' && (
              <div className="overflow-auto h-[255px] scrollbar-hide">
                <Orders userId={id} />
              </div>
            )}
            {activeTab === 'revenue' && (
              <div className="overflow-auto h-[255px]">
                <TotalRevenue />
              </div>
            )}
            {activeTab === 'delivery' && (
              <div className="overflow-auto h-[255px]">
                <DelBoys userId={id} />
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Shops2;
