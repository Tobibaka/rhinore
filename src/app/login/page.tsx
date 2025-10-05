'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Mail, Lock, HardHat, Shield, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  type LoginEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

  const handleLogin = (e: LoginEvent) => {
    e.preventDefault();
    if (!role || !email || !password) return;

    if (role === 'overman') {
      router.push('/overman');
    } else if (role === 'control-head') {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600 p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 opacity-50"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-2 border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 p-1">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8">
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full border-2 border-gray-600 shadow-xl mb-4">
                  <Shield className="w-12 h-12 text-blue-400" />
                </div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                  Rhinore
                </h1>
                <p className="text-gray-400 text-sm">Secure Mining Control System</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                      className="block w-full pl-10 pr-3 py-3 bg-gray-900 bg-opacity-50 border-2 border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                      className="block w-full pl-10 pr-12 py-3 bg-gray-900 bg-opacity-50 border-2 border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500 hover:text-gray-300" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Select Your Role
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRole('overman')}
                      className={`relative p-6 rounded-xl border-2 transition-all ${
                        role === 'overman'
                          ? 'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-400 shadow-xl scale-105'
                          : 'bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <HardHat className={`w-10 h-10 mx-auto mb-2 ${role === 'overman' ? 'text-white' : 'text-blue-400'}`} />
                      <p className={`text-sm font-bold ${role === 'overman' ? 'text-white' : 'text-gray-300'}`}>
                        Overman
                      </p>
                      {role === 'overman' && (
                        <div className="absolute top-2 right-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('control-head')}
                      className={`relative p-6 rounded-xl border-2 transition-all ${
                        role === 'control-head'
                          ? 'bg-gradient-to-br from-purple-600 to-purple-700 border-purple-400 shadow-xl scale-105'
                          : 'bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <Shield className={`w-10 h-10 mx-auto mb-2 ${role === 'control-head' ? 'text-white' : 'text-purple-400'}`} />
                      <p className={`text-sm font-bold ${role === 'control-head' ? 'text-white' : 'text-gray-300'}`}>
                        Control Head
                      </p>
                      {role === 'control-head' && (
                        <div className="absolute top-2 right-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={!role || !email || !password}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg shadow-2xl transition-all flex items-center justify-center gap-2 ${
                    role && email && password
                      ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 text-white border-2 border-blue-400 transform hover:scale-105'
                      : 'bg-gray-700 text-gray-500 border-2 border-gray-600 cursor-not-allowed'
                  }`}
                >
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 text-center">
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot your password?
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Powered by <span className="text-blue-400 font-semibold">Rhinore Security Systems</span>
          </p>
        </div>
      </div>
    </div>
  );
}