
import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaStore, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDeleteShopMutation, useGetAllShopsQuery, } from "../redux/auth/AuthApi";

const ShopsWithTabs = () => {

  const { data, isLoading, error } = useGetAllShopsQuery();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [deleteShop] = useDeleteShopMutation();

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>error {error.message}</div>;
  if (!data || !Array.isArray(data.shops)) return <div>No Shops Available</div>;

  const handleCardClick = (index) => {
    setSelectedIndex(index);
  };

  const handleDelete = async (shopId, e) => {
    e.preventDefault(); // Prevent navigation
    try {
      const res = await deleteShop(shopId).unwrap();
      console.log(res);

      // Optionally, display a success message or perform additional actions
    } catch (error) {
      console.error("Failed to delete the shop:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div className="w-full flex justify-center">
      {!Number?.isInteger(selectedIndex) && (
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-hidden">
          {data.shops.map((shop, index) => (
            <Link
              to={`/shopdetails/${shop._id}`}
              key={shop._id}
              onClick={() => handleCardClick(index)}
              className="bg-white rounded-xl shadow-sm overflow-y-hidden border cursor-pointer w-60 font-sans"
            >
              <img
                src={shop.image}
                alt="Laundry"
                className="w-full h-40 "
              />
              <div className="p-4 space-y-2">
                <h2 className="flex items-center font-[500]">
                  <FaStore className="mr-3  text-[#019ECE] " />
                  {shop?.shopName}
                </h2>
                <p className="flex items-center text-[#BDB5B5]  text-xs font-[400]">
                  <FaMapMarkerAlt className="mr-3 text-[#019ECE]" />
                  {shop.address}
                </p>
                <p className="flex items-center text-[#BDB5B5] text-xs font-[400]">
                  <FaPhone className="mr-3 text-[#019ECE]" />
                  {shop.contactNo}
                </p>
                <div className="flex justify-between">
                  <div className="text-xs font-[400]">
                    <div className="flex items-center gap-1">
                      <p className="font-medium mt-2">Registered On:</p>
                      <p className="text-[#BDB5B5] ml-1 mt-2">
                        {new Date(shop.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <p className="text-[#BDB5B5] ml-[88px]">
                      {new Date(shop.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDelete(shop._id, e)}
                    className="text-red-500 hover:text-red-600 mt-1"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopsWithTabs;
