"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 opacity-10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white opacity-20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Main Logo/Brand */}
        <div
          className={`text-center transition-all duration-2000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Link href="/products" className="group cursor-pointer block">
            <div className="relative mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-lg blur-2xl opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse"></div>
              <h1 className="relative text-6xl md:text-8xl lg:text-9xl font-bold gradient-text hover:scale-105 transition-transform duration-500">
                AMAZONIA
              </h1>
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4">
                <span className="text-yellow-400 text-2xl animate-spin inline-block">✨</span>
              </div>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 group-hover:text-white transition-colors duration-300 font-light">
              Your Premium Shopping Destination
            </p>
            <div className="flex items-center justify-center space-x-2 text-gray-400 group-hover:text-purple-300 transition-colors duration-300">
              <span className="text-yellow-400">⭐</span>
              <span className="text-sm">Click to explore amazing products</span>
              <span className="text-yellow-400">⭐</span>
            </div>
          </Link>
        </div>

        {/* Feature Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transition-all duration-2000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:scale-105 hover:rotate-1">
            <div className="text-4xl mb-3 animate-bounce">⚡</div>
            <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-300 text-sm">Instant search and seamless browsing experience</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:scale-105 hover:-rotate-1">
            <div className="text-4xl mb-3 animate-pulse">🛡️</div>
            <h3 className="text-white font-semibold mb-2">Secure Shopping</h3>
            <p className="text-gray-300 text-sm">Your data and payments are always protected</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:scale-105 hover:rotate-1">
            <div className="text-4xl mb-3 animate-bounce delay-300">🚚</div>
            <h3 className="text-white font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-300 text-sm">Get your orders delivered at lightning speed</p>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`grid grid-cols-3 gap-8 mb-12 transition-all duration-2000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1 animate-pulse">1M+</div>
            <div className="text-gray-400 text-sm">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400 mb-1 animate-pulse delay-200">50K+</div>
            <div className="text-gray-400 text-sm">Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1 animate-pulse delay-400">99.9%</div>
            <div className="text-gray-400 text-sm">Uptime</div>
          </div>
        </div>

        {/* CTA Button */}
        <div
          className={`transition-all duration-2000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Link href="/products">
            <button className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-12 py-6 text-xl rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative flex items-center">
                <span className="animate-bounce mr-3">🛍️</span>
                Start Shopping Now
                <span className="ml-3 group-hover:translate-x-2 transition-transform duration-300">→</span>
              </span>
            </button>
          </Link>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-20 animate-bounce delay-1000">
          <span className="text-yellow-400 text-2xl animate-spin inline-block">⭐</span>
        </div>
        <div className="absolute bottom-20 right-20 animate-bounce delay-2000">
          <span className="text-purple-400 text-2xl animate-pulse">🛍️</span>
        </div>
        <div className="absolute top-1/3 right-20 animate-bounce delay-1500">
          <span className="text-pink-400 text-xl animate-ping">✨</span>
        </div>
        <div className="absolute bottom-1/3 left-20 animate-bounce delay-2500">
          <span className="text-blue-400 text-xl animate-pulse">⚡</span>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  )
}