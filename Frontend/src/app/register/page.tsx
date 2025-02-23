import Link from "next/link";
import React from "react";

const Register: React.FC = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[350px] md:w-[400px]">
        <div className="bg-white/10 backdrop-blur-md border-white/20 shadow-lg rounded-lg max-w-sm p-4 sm:p-6 lg:p-8">
          <form className="space-y-4">
            <h1 className="text-xl md:text-4xl md:font-bold text-center uppercase font-medium bg-gradient-to-r from-white to-primary text-transparent bg-clip-text">
              Sign Up
            </h1>
            <div>
              <input
                type="text"
                name="username"
                id="username"
                className="bg-white/5 backdrop-blur-md border border-white/20 focus:outline-none sm:text-sm rounded-lg block w-full p-2.5 placeholder:text-white/60"
                placeholder="User Name"
                autoComplete="off"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-white/5 backdrop-blur-md border border-white/20 focus:outline-none sm:text-sm rounded-lg block w-full p-2.5 placeholder:text-white/60"
                placeholder="Email"
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
              Create an account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already have an account?{" "}
              <Link href="/login" className="text-secondry hover:underline">
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
