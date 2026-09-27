"use client"

import Image from "next/image"

interface AvatarProps {
  src?: string | null
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        className="rounded-full"
        height="30"
        width="30"
        alt="Avatar"
        src={src}
      />
    )
  }

  return (
    <div className="rounded-full bg-neutral-300 w-[30px] h-[30px] flex items-center justify-center text-neutral-600 font-semibold text-xs">
      ?
    </div>
  )
}

export default Avatar
