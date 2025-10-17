"use client";
import dynamic from "next/dynamic";
import Link from "next/link";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: true });

export default function HomePage() {
  return (
    <div className="relative w-full h-screen ">
      {/* Spline background canvas */}
      <div className="fixed inset-0 w-full h-full z-10 border-shadow-lg ">
        <Spline scene="https://prod.spline.design/0wEpI2JUaAOhduOJ/scene.splinecode" />
      </div>
      
      {/* Content overlay */}
      <div className="relative py-3 px-2 z-10 flex flex-col items-center justify-center">
        <Link
          href="/about"
          className="relative inline-flex items-center justify-center px-10 py-4 font-bold text-white text-lg rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 bg-hero-gradient bg-[length:200%_200%] animate-gradient"
        >
          Know More
        </Link>
      </div>

      {/* Footer */}
      <footer className="absolute -bottom-2 left-0 right-0 z-20 px-2 py-6 pb-12 bg-black/40 backdrop-blur-3xl bg-gradient-to-r from-black via-transparent to-black">
        <div className="max-w-7xl mx-auto">
          {/* Links */}
          <div className="grid grid-cols-3 gap-3 mb-10 text-gray-200">
            <div>
              <h3 className="text-lg font-semibold mb-3">Navigation</h3>
              <div className="space-y-2">
                <Link href="/" className="block hover:text-white transition-colors">Home</Link>
                <Link href="/about" className="block hover:text-white transition-colors">About</Link>
                <Link href="/contact" className="block hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Access</h3>
              <div className="space-y-2">
                <Link href="/login" className="block hover:text-white transition-colors">Login</Link>
                <Link href="/register" className="block hover:text-white transition-colors">Register</Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Dashboards</h3>
              <div className="space-y-2">
                <Link href="/overman" className="block hover:text-white transition-colors">Overman Portal</Link>
                <Link href="/admin" className="block hover:text-white transition-colors">Control Head Portal</Link>
              </div>
            </div>
          </div>

          {/* Copyright and Powered by */}
          <div className="border-t border-white/10 pt-4 text-gray-300">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <p>&copy; 2025 Rhinore. All rights reserved.</p>
              <p className="text-sm">Powered by Intelligent IoT, Cloud & AI Analytics.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
