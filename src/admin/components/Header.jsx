import React, { useEffect, useState } from "react";
import { FaBars, FaBell, FaChevronDown } from "react-icons/fa";
import { FcBusinessman } from "react-icons/fc";
import { useLocation, useParams } from "react-router-dom";
import { useGetAllShopsQuery } from "../redux/auth/AuthApi";
import { generateToken, messaging } from "../pushnotification/firebase";
import { onMessage } from "firebase/messaging";

const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  const { id } = useParams();
  const isHidden = ["/signup"];
  const { data } = useGetAllShopsQuery();

  const [newShops, setNewShops] = useState([]);

  // Initialize Firebase Messaging and handle incoming messages
  useEffect(() => {
    generateToken();

    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      // Optionally, handle the payload to update state or display notifications
    });
  }, []);

  // Detect new shops and update the badge count
  useEffect(() => {
    if (data?.shops?.length) {
      const seenShopIds = JSON.parse(localStorage.getItem("seenShopIds")) || [];

      const newOnes = data.shops.filter(
        (shop) => !seenShopIds.includes(shop._id)
      );

      if (newOnes.length > 0) {
        setNewShops(newOnes);

        // Display native browser notifications for each new shop
        newOnes.forEach((shop) => {
          if (Notification.permission === "granted") {
            new Notification("🆕 New Shop Added!", {
              body: shop.shopName,
              icon: "/favicon.ico",
            });
          }
        });
      }

      const allShopIds = data.shops.map((shop) => shop._id);
      localStorage.setItem("seenShopIds", JSON.stringify(allShopIds));
    }
  }, [data]);

  const titles = {
    "/": "Main Dashboard",
    "/shops": "Shops",
    "/users": "Users",
    "/revenue": "Revenue",
    "/delivery_boys": "Delivery Boys",
    [`/shopdetails/${id}`]: "Planetwash Laundry Shop",
    "/add_offer": "Add Offer",
    "/approvedoffers": "Approved Offers",
    "/rejectedOffers": "Rejected Offers",
  };

  return (
    <header
      className={`${
        isHidden.includes(location.pathname) && "hidden"
      } bg-white shadow-md p-4 flex items-center justify-between`}
    >
      <button
        onClick={toggleSidebar}
        className="text-gray-900 text-2xl md:hidden"
      >
        <FaBars />
      </button>

      <h1 className="text-xl font-[600]">
        {titles[location.pathname] || "Users"}
      </h1>

      <div className="flex items-center gap-8 relative">
        {/* Notification Icon with Badge */}
        <div className="relative cursor-pointer">
          <FaBell className="text-gray-700 text-2xl" />
          {newShops.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {newShops.length}
            </span>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-2 cursor-pointer"
          >
            <FcBusinessman className="w-10 h-10 rounded-full bg-red-200" />
            <FaChevronDown className="text-gray-500" />
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
          >
            <li>
              <a className="text-red-600">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
