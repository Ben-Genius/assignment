"use client";

import logo from "../assets/loginimage.jpg";
import Image from "next/image";
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import * as Yup from 'yup';
import { useFormik } from "formik";
import axios from '../services/utils/axiosConfig';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { loginUser } from "../services/utils/auth";



const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .trim()
    .min(1, 'Email cannot be empty'),
  password: Yup.string()
    .required('Password is required')
    .trim()
    .min(1, 'Password cannot be empty'),
});

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setIsLoading(true);
        const result = await loginUser(values.email, values.password);
        if (result.success) {
          toast.success('Login successful!');
          router.push('/dashboard');
        } else {
          toast.error(result.error);
        }
        setIsLoading(false);
      
      }
    });

    return (
      <>

  
        <div className="flex min-h-full flex-1">
  <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
    <div className="mx-auto w-full max-w-sm lg:w-96 mt-10">
      <div>
        <h2 className="text-3xl/12 font-bold tracking-tight text-[#4CAF50] text-5xl">Login</h2>
        <p className="mt-2 text-lg font-semibold text-gray-500">How do I get started?</p>
      </div>

      <div className="mt-10">
        <div>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  required
                  autoComplete="email"
                  disabled={isLoading}
                  className={`block w-full rounded-full py-3 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6 px-4 outline-none ${
                    formik.touched.email && formik.errors.email 
                      ? 'ring-red-300 focus:ring-red-500' 
                      : 'ring-green-300 focus:ring-green-500'
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  disabled={isLoading}
                  autoComplete="current-password"
                  className={`block w-full rounded-full py-3 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6 px-4 outline-none ${
                    formik.touched.password && formik.errors.password 
                      ? 'ring-red-300 focus:ring-red-500' 
                      : 'ring-green-300 focus:ring-green-500'
                  }`}
                />
                
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  disabled={isLoading}
                  className="size-4 rounded text-[#4CAF50] focus:ring-[#4CAF50] border-gray-300"
                />
                <label htmlFor="remember-me" className="ml-3 block text-md text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-md">
                <a href="#" className="font-semibold text-[#388E3C] hover:text-[#1B5E20]">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
            <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-gradient-to-r from-green-600 to-green-400 text-white py-3 rounded-full font-medium shadow-lg transition-all duration-200 ${
                          isLoading 
                            ? 'opacity-70 cursor-not-allowed' 
                            : 'hover:shadow-xl hover:from-green-700 hover:to-green-500'
                        }`}
                      >
                        {isLoading ? (
                          <center>
                    
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1">
                          <animate
                            id="svgSpinnersBlocksShuffle30"
                            fill="freeze"
                            attributeName="x"
                            begin="0;svgSpinnersBlocksShuffle3b.end"
                            dur="0.2s"
                            values="1;13"
                          />
                          <animate
                            id="svgSpinnersBlocksShuffle31"
                            fill="freeze"
                            attributeName="y"
                            begin="svgSpinnersBlocksShuffle38.end"
                            dur="0.2s"
                            values="1;13"
                          />
                          <animate
                            id="svgSpinnersBlocksShuffle32"
                            fill="freeze"
                            attributeName="x"
                            begin="svgSpinnersBlocksShuffle39.end"
                            dur="0.2s"
                            values="13;1"
                          />
                          <animate
                            id="svgSpinnersBlocksShuffle33"
                            fill="freeze"
                            attributeName="y"
                            begin="svgSpinnersBlocksShuffle3a.end"
                            dur="0.2s"
                            values="13;1"
                          />
                        </rect>
                        <rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1">
                          <animate
                            id="svgSpinnersBlocksShuffle34"
                            fill="freeze"
                            attributeName="y"
                            begin="svgSpinnersBlocksShuffle30.end"
                            dur="0.2s"
                            values="13;1"
                          />
                          <animate
                            id="svgSpinnersBlocksShuffle35"
                            fill="freeze"
                            attributeName="x"
                            begin="svgSpinnersBlocksShuffle31.end"
                            dur="0.2s"
                            values="1;13"
                          />
                          <animate
                            id="svgSpinnersBlocksShuffle36"
                            fill="freeze"
                            attributeName="y"
                            begin="svgSpinnersBlocksShuffle32.end"
                            dur="0.2s"
                            values="1;13"
                          />
                          <animate
                            id="svgSpinnersBlocksShuffle37"
                            fill="freeze"
                            attributeName="x"
                            begin="svgSpinnersBlocksShuffle33.end"
                            dur="0.2s"
                            values="13;1"
                          />
                        </rect>
                        <rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1">
                          <animate
                            id="svgSpinnersBlocksShuffle38"
                            fill="freeze"
                            attributeName="x"
                            begin="svgSpinnersBlocksShuffle34.end"
                            dur="0.2s"
                            values="13;1"
                          />
                          <animate
                            id="svgSpinnersBlocksShuffle39"
                            fill="freeze"
                            attributeName="y"
                            begin="svgSpinnersBlocksShuffle35.end"
                            dur="0.2s"
                            values="13;1"
                          />
                          <animate
                            id="svgSpinnersBlocksShuffle3a"
                            fill="freeze"
                            attributeName="x"
                            begin="svgSpinnersBlocksShuffle36.end"
                            dur="0.2s"
                            values="1;13"
                          />
                          <animate
                            id="svgSpinnersBlocksShuffle3b"
                            fill="freeze"
                            attributeName="y"
                            begin="svgSpinnersBlocksShuffle37.end"
                            dur="0.2s"
                            values="1;13"
                          />
                        </rect>
                      </svg>
                          </center>
                        )
                        
                        
                        
                        : 'Login'}
                      </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div className="relative hidden w-0 flex-1 lg:block mr-10">
    <Image
      alt=""
      src={logo}
      className="absolute inset-0 size-full object-cover rounded-xl h-[35rem] mx-auto"
    />
  </div>
</div>
      </>
    );
}