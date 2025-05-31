import React, { useState } from "react";

const LaundryShopProfile = () => {
  const [activeTab, setActiveTab] = useState("orders");

  const tabs = [
    { id: "orders", label: "Orders" },
    { id: "revenue", label: "Revenue" },
    { id: "delivery", label: "Delivery Boy" },
  ];

  const shopInfo = {
    name: "Sparkle Wash",
    owner: "Manish Patel",
    phone: "9876543210",
    address: "15-A Main Road, Surat",
    area: "Ring Road",
    time: "9AM - 9PM",
  };

  const shopImage = "https://via.placeholder.com/100x100.png?text=Shop";

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 w-full max-w-5xl mx-auto">
      <div className="flex items-start gap-4">
        <img src={shopImage} alt="Shop" className="w-24 h-24 rounded-full object-cover" />
        <div>
          <h2 className="text-2xl font-bold mb-1">{shopInfo.name}</h2>
          <p className="text-gray-600">Owner: {shopInfo.owner}</p>
          <p className="text-gray-600">Phone: {shopInfo.phone}</p>
          <p className="text-gray-600">Address: {shopInfo.address}</p>
          <p className="text-gray-600">Area: {shopInfo.area}</p>
          <p className="text-gray-600">Time: {shopInfo.time}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex border-b border-gray-200 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`mr-4 pb-2 text-sm font-medium border-b-2 transition-all duration-200 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-blue-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {activeTab === "orders" && (
            <div className="text-gray-700">Orders content goes here.</div>
          )}
          {activeTab === "revenue" && (
            <div className="text-gray-700">Revenue content goes here.</div>
          )}
          {activeTab === "delivery" && (
            <div className="text-gray-700">Delivery Boy content goes here.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaundryShopProfile;
