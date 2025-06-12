import { Link, useLocation } from 'react-router-dom';
import { BsHandbag } from "react-icons/bs"
import { FaBell, FaStore } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { BsFillHandbagFill } from "react-icons/bs";
import { IoMdHome } from 'react-icons/io';
import { MdLocalOffer } from "react-icons/md";


const menuItems = [
    { name: "Home", path: "/", icon: <IoMdHome /> },
    { name: "Shops", path: "/shops", icon: <FaStore /> },
    { name: "Users", path: "/users", icon: <HiUsers /> },
    { name: "Revenue", path: "/revenue", icon: <BsFillHandbagFill /> },
    { name: "Delivery Boys", path: "/delivery_boys", icon: <FaBell /> },
    { name: "Add Offer", path: "/add_offer", icon: <MdLocalOffer />
 },

];

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();


    const handleNavClick = () => {
        if (window.innerWidth < 768) {
            toggleSidebar();
        }
    };
    const isHidden = ["/signup"]
    return (
        <>
            <div className={`${isHidden.includes(location.pathname) && "hidden"} fixed md:relative inset-y-0 left-0 bg-white text-black h-screen p-4 transform transition-transform duration-300 z-40
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-64 w-60 flex-shrink-0`}>

                {/* Close Button (Mobile) */}
                <button onClick={toggleSidebar} className="text-2xl mb-5 md:hidden">
                    ✖
                </button>

                {/* Logo */}
                <div className='flex justify-center'>
                    <img src="/Frame5.png" className='p-4' />
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-1 mt-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={handleNavClick}
                            className={`block rounded-xl text-[#019ECE] transition-colors  duration-200 ${location.pathname === item.path ? " pl-1" : "hover:bg-gray-200"
                                }`}
                        >
                            {/* Inner Blue Box (Different Color on Active) */}
                            <div
                                className={`flex items-center   gap-3 p-3 pl-4 rounded-xl w-[100%] ${location.pathname === item.path ? "bg-blue-50 text-[#8EDF4C]" : "bg-transparent"
                                    }`}
                            >
                                <span className='text-xl'>{item.icon}</span>{item.name}
                            </div>
                        </Link>
                    ))}
                </nav>

            </div>

            {/* Overlay (Click to Close on Mobile) */}
            {isOpen && <div className="fixed inset-0 bg-black opacity-10 md:hidden" onClick={toggleSidebar}></div>}
        </>
    );
};

export default Sidebar;
