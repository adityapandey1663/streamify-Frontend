import React, { useState } from "react";
import useAuthUser from "../components/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/Axios"
import { Camera, ShipWheel } from "lucide-react"; // ✅ FIX: Camera icon import
import "../App.css";



import { languages } from "../lib/index";

const OnboardingPage = () => {
  const queryClient = useQueryClient();

  const { authUser } = useAuthUser();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

const {
  mutate: onboardingMutation,
  isPending,
} = useMutation({
  mutationFn: completeOnboarding,

  onSuccess: () => {
    toast.success("Profile onboarded successfully 🎉");
    queryClient.invalidateQueries({ queryKey: ["authUser"] });
  },

  onError: (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong. Please try again.";

    toast.error(message);
  },
});


  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const seed = Math.random().toString(36).substring(2);
    const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;

    setFormState({ ...formState, profilePic: avatarUrl });
  };

  return (
<div className="
  relative
  min-h-screen
  overflow-hidden
  flex
  items-center
  justify-center
  p-4
  bg-gradient-to-br
  from-pink-100
  via-rose-50
  to-pink-200
">


      <div className="
  relative
  z-10
  card
  w-full
  max-w-3xl
  bg-white/80
  backdrop-blur-xl
  shadow-2xl
  rounded-3xl
  border
  border-white/40
">


        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* ✅ FIX: Avatar container structure */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden flex items-center justify-center">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="size-12 text-base-content opacity-40" />
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="
    px-8 py-3
    rounded-full
    bg-gradient-to-r from-pink-300 to-pink-400
    text-pink-900
    font-semibold
    shadow-lg
    transition-all duration-300
    hover:from-pink-400 hover:to-pink-500
    hover:scale-105
    active:scale-95
    focus:ring-4 focus:ring-pink-200
  "
                >
                  Generate Random Avatar
                </button>
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                placeholder="Your full name"
                className="
      w-full
      rounded-full
      pl-12 pr-4 py-3
      border border-pink-200
      bg-pink-50
      text-gray-800
      placeholder-pink-400
      shadow-sm
      transition-all duration-300
      focus:outline-none
      focus:border-pink-400
      focus:ring-4 focus:ring-pink-200
    "
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400">
                👤
              </span>
            </div>
            <div className="relative">
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                placeholder="Tell me something about you"
                rows={4}
                maxLength={160}
                className="
      w-full
      resize-none
      rounded-2xl
      border border-pink-200
      bg-pink-50
      p-4
      text-gray-800
      placeholder-pink-400
      shadow-sm
      transition-all duration-300
      focus:outline-none
      focus:border-pink-400
      focus:ring-4
      focus:ring-pink-200
    "
              />
              <span className="absolute bottom-3 right-4 text-xs text-pink-400">
                {formState.bio.length}/160
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Native Language */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Native Language
                  </span>
                </label>

                <select
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                  className="
        w-full
        rounded-full
        border border-pink-200
        bg-pink-50
        p-3
        text-gray-800
        shadow-sm
        transition-all duration-300
        focus:outline-none
        focus:border-pink-400
        focus:ring-4
        focus:ring-pink-200
        hover:shadow-md
      "
                >
                  <option value="" disabled>
                    Select your native language
                  </option>
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.name}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Learning Language */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Learning Language
                  </span>
                </label>

                <select
                  value={formState.learningLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    })
                  }
                  className="
        w-full
        rounded-full
        border border-pink-200
        bg-pink-50
        p-3
        text-gray-800
        shadow-sm
        transition-all duration-300
        focus:outline-none
        focus:border-pink-400
        focus:ring-4
        focus:ring-pink-200
        hover:shadow-md
      "
                >
                  <option value="" disabled>
                    Select your learning language
                  </option>
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.name}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
         
         <div className="relative w-full">
  <label className="label">
    <span className="label-text font-semibold text-gray-700">
      Location
    </span>
  </label>

  <input
    type="text"
    value={formState.location}
    onChange={(e) =>
      setFormState({ ...formState, location: e.target.value })
    }
    placeholder="Enter your location (City, Country)"
    className="
      w-full
      rounded-full
      pl-12 pr-4 py-3
      border border-pink-200
      bg-pink-50
      text-gray-800
      placeholder-pink-400
      shadow-sm
      transition-all duration-300
      focus:outline-none
      focus:border-pink-400
      focus:ring-4
      focus:ring-pink-200
      hover:shadow-md
    "
  />

  <span className="absolute left-4 top-[60%] -translate-y-1/2 text-pink-400">
    📍
  </span>
</div>

<button
  type="submit"
  disabled={isPending}
  className={`
    w-full
    py-3
    rounded-full
    font-semibold
    text-lg
    flex
    items-center
    justify-center
    gap-2
    transition-all
    duration-300
    shadow-lg
    ${
      isPending
        ? "bg-pink-300 cursor-not-allowed text-pink-700"
        : "bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600 hover:scale-[1.02] active:scale-95"
    }
  `}
>
  {!isPending ? (
    <>
      <ShipWheel className="size-5" />
      Complete Onboarding
    </>
  ) : (
    <>
      <span className="loading loading-spinner loading-sm"></span>
      Saving profile...
    </>
  )}
</button>




          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
