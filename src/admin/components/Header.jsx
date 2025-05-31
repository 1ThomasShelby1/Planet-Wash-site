import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import { FaSearch, FaBell, FaUser } from "react-icons/fa"
import { FcBusinessman } from "react-icons/fc";
import { FaChevronDown } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
    const location = useLocation();
    const {id}= useParams();
    const isHidden = ["/signup"]
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // Path to Title Mapping
    const titles = {
        "/": "Main Dashboard",
        "/shops": "Shops",
        "/users": "Users",
        "/revenue": "Revenue",
        "/delivery_boys": "Delivery Boys",
        [`/shopdetails/${id}`]: "Planetwash Laundry Shop",

    };
    return (


        <header className={`${isHidden.includes(location.pathname) && 'hidden'} bg-white shadow-md p-4 flex items-center justify-between `}>
            {/* Sidebar Toggle Button (Mobile) */}
            <button onClick={toggleSidebar} className="text-gray-900 text-2xl md:hidden">
                <FaBars />
            </button>

            {/* Dynamic Page Title */}
            <h1 className="text-xl  font-[600]">{titles[location.pathname] || "Users"}</h1>

            <div className="flex items-center gap-8">
                {/* Search Input */}
                <div className=" hidden md:block">

                    <FaSearch className=" left-2 top-2 text-gray-500" />
                </div>

                {/* Notification Icon */}
                <div className="relative cursor-pointer">
                    <FaBell className="text-gray-700 text-2xl" />
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        3
                    </span>
                </div>

                {/* Profile Dropdown (No State Needed) */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer">
                        {/* Profile Image */}
                        <FcBusinessman className="w-10 h-10 rounded-full bg-red-200" />

                        {/* Dropdown Icon */}
                        <FaChevronDown className="text-gray-500" />
                    </div>

                    {/* Dropdown Menu */}
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                        <li><a className="text-red-600">Logout</a></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
