import React from "react";
import { useQuery } from "@tanstack/react-query"; // ✅ FIX
import { getAuthUser } from "../lib/Axios";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

  return {
    isLoading: authUser.isLoading,
    authUser: authUser.data?.user,
  };
};

export default useAuthUser;
