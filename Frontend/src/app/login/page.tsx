"use client";
import Link from "next/link";
import React from "react";
// import { useForm } from "react-hook-form"

const Login: React.FC = () => {
  
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[350px] md:w-[400px]">
        <div className="bg-white/10 backdrop-blur-md border-white/20 shadow-lg rounded-lg max-w-sm p-4 sm:p-6 lg:p-8">
          <form className="space-y-6">
            <h1 className="text-xl md:text-4xl md:font-bold uppercase text-center font-medium bg-gradient-to-r from-white to-primary text-transparent bg-clip-text">
              Login
            </h1>
            <div>
              <input
                type="text"
                name="emailorusername"
                id="emailorusername"
                className="bg-white/5 backdrop-blur-md border border-white/20 appearance-none autofill:bg-blue-500 focus:outline-none sm:text-sm rounded-lg block w-full p-2.5 placeholder:text-white/60"
                placeholder="Email or Username"
                autoComplete="off"
              />
              {/* {errors.email && (
                <p className="text-red-600 text-xs md:text-sm">
                  {errors.email.message}
                </p>
              )} */}
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="bg-white/5 backdrop-blur-md border border-white/20 focus:outline-none sm:text-sm rounded-lg block w-full p-2.5 placeholder:text-white/60"
                autoComplete="off"
              />
              {/* {errors.password && (
                <p className="text-red-600 text-xs md:text-sm">
                  {errors.password.message}
                </p>
              )} */}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary hover:bg-shade_2 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login to your account
            </button>
            <div className="text-sm font-medium text-gray-500">
              Not registered?{" "}
              <Link href="/register" className="text-secondry hover:underline">
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
