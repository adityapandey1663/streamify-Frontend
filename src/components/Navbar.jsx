import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";

import useAuthUser from "./useAuthUser";
import { logout } from "../lib/Axios";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname.startsWith("/chat");

  const queryClient = useQueryClient();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return (
    <nav className="sticky top-0 z-30 h-16 bg-green-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
        {/* Logo (only on chat page) */}
        {isChatPage ? (
          <Link to="/" className="flex items-center gap-2">
            <ShipWheelIcon className="size-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Streamify
            </span>
          </Link>
        ) : (
          <div />
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Link
            to="/notifications"
            className="p-2 rounded-full hover:bg-blue-50 transition"
          >
            <BellIcon className="h-6 w-6 text-gray-600" />
          </Link>

          {/* Avatar */}
          <img
            src={authUser?.profilePic}
            alt="User"
            className="w-9 h-9 rounded-full border"
          />

          {/* Logout */}
          <button
            onClick={logoutMutation}
            className="p-2 rounded-full hover:bg-red-50 transition"
          >
            <LogOutIcon className="h-6 w-6 text-gray-600 hover:text-red-500" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
