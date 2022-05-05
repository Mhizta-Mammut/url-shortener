import React from "react"

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center pt-10 pb-20 space-y-2 text-6xl font-bold text-center lg:text-8xl">
      <h1 className="pb-10 text-gray-900">
        Responsive URL Shortener using{" "}
        <span className="text-blue-500">Next.js</span> &{" "}
        <span className="text-blue-400">Prisma</span>
      </h1>
      <div className="flex items-center justify-center w-64 h-16 text-3xl font-semibold text-white bg-gray-900 rounded-lg cursor-pointer hover:shadow-lg">
        <h1 className="text-center">Let's start 🚀 </h1>
      </div>
    </div>
  )
}

export default Hero
