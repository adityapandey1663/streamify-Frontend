import React, { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { login } from "../lib/Axios";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900 px-4">
      {/* CARD */}
      <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col lg:flex-row">

        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          
          {/* LOGO */}
          <div className="mb-6 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
              S
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Streamify
            </h1>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome Back 👋
          </h2>
          <p className="text-slate-300 mb-6">
            Sign in to continue your journey
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm">
              {error.response?.data?.message || "Something went wrong"}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* EMAIL */}
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold tracking-wide hover:scale-[1.01] hover:shadow-lg transition-all disabled:opacity-60 disabled:hover:scale-100"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-slate-400 text-sm mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 hover:underline transition"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 items-center justify-center p-10">
          <div className="text-center max-w-sm">
            <div className="w-44 h-44 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-6xl shadow-xl">
              🌐
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Connect Worldwide
            </h3>
            <p className="text-slate-300">
              Chat, call, and make friends across the globe in real time.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
