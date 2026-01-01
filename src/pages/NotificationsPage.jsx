import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { acceptFriendRequest, getFriendRequests } from '../lib/Axios'
import { BellIcon, ClockIcon, UserCheck2Icon } from 'lucide-react'
import toast from 'react-hot-toast'

const NotificationsPage = () => {
  const queryClient = useQueryClient()

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: getFriendRequests,
  })

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
    // Invalidate friend requests so UI updates
    queryClient.invalidateQueries({ queryKey: ['friendRequests'] })

    // Show success toast
    toast.success("Friend request accepted successfully", {
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

  const incomingRequests = friendRequests?.incomingReqs || []
  const acceptedRequests = friendRequests?.acceptedReqs || []

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Notifications
        </h1>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600" />
          </div>
        )}

        {/* Incoming Friend Requests */}
        {!isLoading && incomingRequests.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <UserCheck2Icon className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Friend Requests
              </h2>
              <span className="ml-2 inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-700">
                {incomingRequests.length}
              </span>
            </div>

            <div className="space-y-4">
              {incomingRequests.map((req) => (
                <div
                  key={req._id}
                  className="flex flex-col sm:flex-row items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={req.sender.profilePic}
                      alt={req.sender.fullName}
                      className="h-14 w-14 rounded-full object-cover border"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {req.sender.fullName}
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-2 text-xs sm:text-sm">
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">
                          Native: {req.sender.nativeLanguage}
                        </span>
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">
                          Learning: {req.sender.learningLanguage}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => acceptRequestMutation(req._id)}
                    disabled={isPending}
                    className="mt-3 sm:mt-0 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Accept
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Accepted Friend Requests */}
        {!isLoading && acceptedRequests.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <BellIcon className="h-5 w-5 text-green-600" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                New Connections
              </h2>
            </div>

            <div className="space-y-4">
              {acceptedRequests.map((notification) => (
                <div
                  key={notification._id}
                  className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                >
                  <img
                    src={notification.recipient.profilePic}
                    alt={notification.recipient.fullName}
                    className="h-12 w-12 rounded-full object-cover border"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {notification.recipient.fullName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {notification.recipient.fullName} accepted your friend request
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                      <ClockIcon className="h-3 w-3" />
                      Recently
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!isLoading && incomingRequests.length === 0 && acceptedRequests.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
            <p className="text-gray-500">No new notifications</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationsPage
