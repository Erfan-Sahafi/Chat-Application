"use client";
import { RegisterInput } from "@/@types/Input.type";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import z from "zod";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

const schema = z.object({
  username: z
    .string()
    .min(1, "username is required")
    .trim()
    .min(3, "Please enter at least 3 characters."),
  email: z
    .string()
    .email("Enter a valid email.")
    .trim()
    .nonempty("Email is required"),
  password: z
    .string()
    .trim()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "The password must contain at least 8 characters (at least one uppercase letter, at least one lowercase letter, at least one number)"
    )
    .nonempty("Password is required"),
});

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = handleSubmit((data) => {
    setTimeout(() => {
      setLoading(true);
    }, 0);
    axios
      .post("http://localhost:8000/auth/register", data)
      .then((response) => {
        setLoading(false);
        Cookies.set("token", response.data.token, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          expires: 30,
          sameSite: "Strict",
        });
        toast.success(response.data.message);
        //navigate to user profile
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[350px] md:w-[400px]">
        <div className="bg-white/10 backdrop-blur-md border-white/20 shadow-lg rounded-lg max-w-sm p-4 sm:p-6 lg:p-8">
          <form className="space-y-4" onSubmit={onSubmit}>
            <h1 className="text-xl md:text-4xl md:font-bold text-center uppercase font-medium bg-gradient-to-r from-white to-primary text-transparent bg-clip-text">
              Sign Up
            </h1>
            <div>
              <input
                type="text"
                id="username"
                className={`bg-white/5 backdrop-blur-md border border-white/20 focus:outline-none sm:text-sm rounded-lg block w-full p-2.5 placeholder:text-white/60 ${
                  errors.username && "focus:border-red-500"
                }`}
                placeholder="User Name"
                autoComplete="off"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 mt-1 pl-2 text-xs md:text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="email"
                id="email"
                className={`bg-white/5 backdrop-blur-md border border-white/20 focus:outline-none sm:text-sm rounded-lg block w-full p-2.5 placeholder:text-white/60 ${
                  errors.email && "focus:border-red-500"
                }`}
                placeholder="Email"
                autoComplete="off"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 mt-1 pl-2 text-xs md:text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className={`bg-white/5 backdrop-blur-md border border-white/20 focus:outline-none sm:text-sm rounded-lg block w-full p-2.5 placeholder:text-white/60 ${
                  errors.password && "focus:border-red-500"
                }`}
                autoComplete="off"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 mt-1 pl-2 text-xs md:text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary hover:bg-shade_2 focus:ring-4 focus:ring-secondry font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {loading ? (
                <BeatLoader color={"#ffffff"} size={10} />
              ) : (
                <span>Create an account</span>
              )}
            </button>
            <div className="text-sm font-medium text-gray-500">
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
