import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/Axios";
import FriendCard from "../components/FriendCard";
import { FaUserFriends, FaUserCircle } from "react-icons/fa";
import { MapPinIcon } from "lucide-react";
import { getLanguageFlag } from "../components/FriendCard";
import toast from "react-hot-toast"


/* ---------- SAFE LOCAL UTILITY ---------- */
const capitalize = (str = "") =>
  str.length ? str.charAt(0).toUpperCase() + str.slice(1) : "Unknown";

const HomePage = () => {
  const queryClient = useQueryClient();

  /* ---------- STATE ---------- */
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  /* ---------- QUERIES ---------- */
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs = [] } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  /* ---------- MUTATION ---------- */
  /* ---------- MUTATION ---------- */
const { mutate: sendRequestMutation, isPending } = useMutation({
  mutationFn: sendFriendRequest,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["outgoingFriendReqs"],
    })

    toast.success("Friend request sent successfully", {
      style: {
        background: "#ffffff",
        color: "#111827",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
      },
      iconTheme: {
        primary: "#2563eb",
        secondary: "#ffffff",
      },
    })
  },

  onError: (error) => {
    // Axios-aware error handling
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong. Please try again."

    toast.error(message, {
      style: {
        background: "#ffffff",
        color: "#7f1d1d",
        border: "1px solid #fecaca",
        borderRadius: "12px",
      },
    })
  },
})

  

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center gap-3">
          <FaUserFriends className="text-3xl text-blue-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Your Friends
          </h1>
        </div>

        {/* Friends Section */}
        {loadingFriends ? (
          <Loader />
        ) : friends.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* Recommended Users */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Meet New Learners
          </h2>
          <p className="text-gray-600 mb-6">
            Discover perfect language exchange partners
          </p>

          {loadingUsers ? (
            <Loader />
          ) : recommendedUsers.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              No recommendations available
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="bg-white rounded-xl border p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={user.profilePic || "/default-avatar.png"}
                        alt={user.fullName || "User"}
                        className="w-14 h-14 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/default-avatar.png";
                        }}
                      />

                      <div>
                        <h3 className="font-semibold text-lg">
                          {user.fullName || "Unknown User"}
                        </h3>

                        {user.location && (
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPinIcon className="size-3 mr-1" />
                            {user.location}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 mb-4">
                      <span className="text-xs bg-blue-50 px-2 py-1 rounded-full">
                        {getLanguageFlag(user.nativeLanguage)}
                        Native: {capitalize(user.nativeLanguage)}
                      </span>

                      <span className="text-xs bg-green-50 px-2 py-1 rounded-full">
                        {getLanguageFlag(user.learningLanguage)}
                        Learning: {capitalize(user.learningLanguage)}
                      </span>
                    </div>

                    <button
                      disabled={hasRequestBeenSent || isPending}
                      onClick={() => sendRequestMutation(user._id)}
                      className={`w-full rounded-lg px-4 py-2 font-medium ${
                        hasRequestBeenSent || isPending
                          ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {hasRequestBeenSent
                        ? "Request Sent"
                        : isPending
                        ? "Sending..."
                        : "Send Friend Request"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

/* ---------- SMALL COMPONENTS ---------- */
const Loader = () => (
  <div className="flex justify-center py-16">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center py-16 text-gray-500">
    <FaUserCircle className="text-6xl mb-4" />
    <p className="text-lg font-medium">No friends yet</p>
    <p className="text-sm">Start connecting with people!</p>
  </div>
);

export default HomePage;
