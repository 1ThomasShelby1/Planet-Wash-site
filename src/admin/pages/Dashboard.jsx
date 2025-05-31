import React from "react";
import Charts from "../pages/Charts";
import {
  FaStore,
  FaUsers,
  FaMotorcycle,
  FaCreditCard,
} from "react-icons/fa";
import { useGetAllDeliveryBoyQuery, useGetAllShopsQuery, useGetAllUsersQuery } from "../redux/auth/AuthApi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { data: user } = useGetAllDeliveryBoyQuery()
  const { data: allUsers } = useGetAllUsersQuery();

  const { data } = useGetAllShopsQuery();
  const om = data?.shops?.length

  const navigate = useNavigate();


  const summaryCards = [
    {
      title: "Total Shops",
      value: `${om}`,
      icon: <FaStore className="text-5xl text-[#019ECE]" />,
      color: "text-green-500",
    },
    {
      title: "Total Customers",
      value: `${allUsers?.length}`,
      icon: <FaUsers className="text-5xl text-[#019ECE]" />,
      color: "text-red-500",
    },
    {
      title: "Total Delivery Boys",
      value: `${user?.length}`,
      icon: <FaMotorcycle className="text-5xl text-[#019ECE]" />,
      color: "text-green-500",
    },
    {
      title: "Revenue",
      value: "Rs.2000",
      icon: <FaCreditCard className="text-5xl text-[#019ECE]" />,
      color: "text-red-500",
    },
  ];


  return (
    <div className="space-y-6 overflow-y-hidden bg-[#FAF7F7]">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-2"
            onClick={() => {
              if (card.title === "Total Shops") navigate("/shops");
              if (card.title === "Total Customers") navigate("/users");
              if (card.title === "Total Delivery Boys") navigate("/delivery_boys");
              if (card.title === "Revenue") navigate("/revenue");
            }}
          >
            <div className="flex justify-between items-start">

              {/* Left: Icon and Text */}
              <div className="flex gap-1 items-">
                <div className="bg-[#6AD2FF45] p-2 m-2 rounded-lg">
                  {card.icon}
                </div>
                <div>
                  <span className="text-lg font-[700]  text-[#2B3674]">{card.title}</span>
                  <h3 className="text-sm text-gray-600">{card.value}</h3>
                  <p className="text-xs mt-1 text-red-600">
                    {(card.title === "Total Customers" || card.title === "Revenue")
                      ? "Decreased From Last week"
                      : ""}
                  </p>
                </div>
              </div>

              {/* Right: On track */}
              <p className="text-xs text-green-500 flex items-center pr-2 pt-2">
                <img src="TickMark.png" className="mr-1" />
                On mmm
              </p>
            </div>
          </div>
        ))}
      </div>
      <Charts />

    </div>
  );
};

export default Dashboard;
