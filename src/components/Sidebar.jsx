import { useState } from "react";
import {
  Menu,
  X,
  HomeIcon,
  BellIcon,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useAuthUser from "./useAuthUser";
import StreamifyLogo from "../components/StreamifyLogo";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { authUser } = useAuthUser();
  const { pathname } = useLocation();

  const linkBase =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200";

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-xl shadow-lg"
      >
        {open ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative top-0 left-0 z-40
          h-screen w-64
          bg-green-300
          border-r border-gray-200
          flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-200">
          <StreamifyLogo size="text-xl" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link
            to="/"
            className={`${linkBase} ${
              pathname === "/"
                ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
            onClick={() => setOpen(false)}
          >
            <HomeIcon className="size-5" />
            Home
          </Link>

          <Link
            to="/notifications"
            className={`${linkBase} ${
              pathname === "/notifications"
                ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
            onClick={() => setOpen(false)}
          >
            <BellIcon className="size-5" />
            Notifications
          </Link>
        </nav>

        {/* User section */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src={authUser?.profilePic || "https://i.pravatar.cc/40"}
              alt="User avatar"
              className="w-10 h-10 rounded-full border"
            />

            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">
                {authUser?.fullName || "User"}
              </p>
              <p className="text-xs text-green-600">Online</p>
            </div>

            <button className="p-2 rounded-full hover:bg-red-50 transition">
              <LogOut className="size-5 text-gray-400 hover:text-red-500" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
