import React from "react"
import { Link } from "react-router-dom"
import { LANGUAGE_TO_FLAG } from "../lib/index"

const FriendCard = ({ friend }) => {
  return (
    <div
      className="
        bg-white rounded-xl border border-gray-200
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
        active:scale-[0.98]
      "
    >
      <div className="p-4 sm:p-5 flex flex-col h-full">

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="
              w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden
              ring-2 ring-gray-200 transition-all duration-300
              hover:ring-blue-400
            "
          >
            <img
              src={friend.profilePic}
              alt={friend.fullName}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
            {friend.fullName}
          </h3>
        </div>

        {/* Languages */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className="
              inline-flex items-center gap-1
              rounded-full bg-blue-50 text-blue-700
              px-2.5 py-1 text-xs sm:text-sm font-medium
            "
          >
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>

          <span
            className="
              inline-flex items-center gap-1
              rounded-full bg-gray-100 text-gray-700
              px-2.5 py-1 text-xs sm:text-sm font-medium
            "
          >
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Action */}
        <Link
          to={`/chat/${friend._id}`}
          className="
            mt-2 inline-flex items-center justify-center
            w-full rounded-lg border border-blue-600
            px-4 py-2 text-sm sm:text-base font-medium
            text-blue-600 transition-all duration-300
            hover:bg-blue-600 hover:text-white
            focus:outline-none focus:ring-2 focus:ring-blue-400
          "
        >
          Message
        </Link>

      </div>
    </div>
  )
}

export default FriendCard

export function getLanguageFlag(language) {
  if (!language) return null

  const langLower = language.toLowerCase()
  const countryCode = LANGUAGE_TO_FLAG[langLower]

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 sm:h-4 mr-1 inline-block align-middle"
      />
    )
  }

  return null
}
