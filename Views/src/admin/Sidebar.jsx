import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LogoutModal from "../components/LogoutModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import {
  faChartLine,
  faBoxOpen,
  faShoppingCart,
  faUsers,
  faEnvelope,
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {

  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("name");

  toast.success("Logged out successfully");

  navigate("/login");
}

  const menu = [
    {
      title: "Dashboard",
      icon: faBoxOpen,
      path: "/admin",
    },
    {
      title: "Products",
      icon: faBoxOpen,
      path: "/admin/products",
    },
    {
      title: "Orders",
      icon: faShoppingCart,
      path: "/admin/orders",
    },
    {
      title: "Customers",
      icon: faUsers,
      path: "/admin/customers",
    },
    {
      title: "Messages",
      icon: faEnvelope,
      path: "/admin/messages",
    },
    {
      title: "Statistics",
      icon: faGear,
      path: "/admin/statistics",
    },
    {
      title: "Settings",
      icon: faGear,
      path: "/admin/settings",
    },
  ];



  return (
    <aside className="flex min-h-screen w-72 flex-col bg-emerald-900 text-white">

      <div className="border-b border-emerald-800 px-8 py-7">

        <h1 className="text-3xl font-black">
          Ben Store
        </h1>

        <p className="mt-2 text-emerald-200">
          Admin Panel
        </p>

      </div>

      <nav className="flex-1 px-5 py-8 space-y-2">

        {menu.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-5 py-4 transition ${
                isActive
                  ? "bg-white text-emerald-900 shadow-lg"
                  : "hover:bg-emerald-800"
              }`
            }
          >

            <FontAwesomeIcon
              icon={item.icon}
              className="text-lg"
            />

            <span className="font-semibold">
              {item.title}
            </span>

          </NavLink>

        ))}

      </nav>

      <div className="border-t border-emerald-800 p-5">
        <div className="mb-4 rounded-xl bg-emerald-800 p-4">
          <p className="text-sm text-emerald-200">
            Logged in as
          </p>

          <h3 className="text-lg font-bold text-white">
            {localStorage.getItem("name")}
          </h3>

          <p className="text-sm text-emerald-300">
            Administrator
          </p>
        </div>

        <button
          onClick={() => setShowLogout(true)}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          Logout
        </button>

      </div>

      <LogoutModal
        isOpen={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={handleLogout}
        title="Admin Logout"
        message="Are you sure you want to logout from the Admin Panel?"
      />

    </aside>

    
  );
}

export default Sidebar;