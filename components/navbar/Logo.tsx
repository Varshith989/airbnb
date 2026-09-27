"use client"

import { useRouter } from "next/navigation"
import { FaAirbnb } from "react-icons/fa"

const Logo = () => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push("/")}
      className="flex items-center gap-2 cursor-pointer"
    >
      <FaAirbnb size={36} className="text-rose-500" />
      <span className="hidden md:block font-bold text-xl text-rose-500 tracking-tight">
        airbnb
      </span>
    </div>
  )
}

export default Logo
