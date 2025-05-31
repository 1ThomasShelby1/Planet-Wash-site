import React from "react";
import { FaTrash } from "react-icons/fa";
import { useGetAllDeliveryBoyQuery } from "../redux/auth/AuthApi";

const DeliveryBoys = () => {

 const {data, isLoading, error} = useGetAllDeliveryBoyQuery()

   if (isLoading) return <div>Loading ....</div>;
  if (error) return <div>Error{error.message}</div>;

    // const deliveryBoys = new Array(9).fill({
    //   name: "John Doe",
    //   phone: "854785478",   
    //   email: "johndoe@gmail.com",
    //   shop: "Planetwash Laundry shop",
    const image = "/postman 1.png";
    // });

  return (
    <div className="bg-[#f8f6f9] max-h-screen font-sans ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {data && data.map((boy, index) => (
          <div
            key={index}
            className="bg-white flex items-start p-4 rounded-xl shadow-md relative"
          >
            <img
              src={image}
              alt={boy.Name}
              className="w-16 h-16 rounded-full object-cover mt-2 shadow-lg"
            />
            <div className="ml-4">
              <h3 className="text-lg font-[600] text-gray-900">{boy.Name}</h3>
              <p className="text-gray-700 font-[400] text-sm">{boy.contactNo}</p>
              <p className="text-gray-700 font-[400] text-sm ">{boy.email}</p>
              <p className="text-gray-700 font-[400] text-sm">{boy.shopId.shopName}</p>
              {/* break-all */}
            </div>
            <button className="absolute top-4 right-4 text-red-500 hover:text-red-600">
              <FaTrash className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryBoys;
