"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { IconType } from "react-icons"

interface CategoryBoxProps {
  icon: IconType
  label: string
  selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const params = useSearchParams()

  const currentParams = new URLSearchParams(params ? params.toString() : "")

  if (currentParams.get("category") === label) {
    currentParams.delete("category")
  } else {
    currentParams.set("category", label)
  }

  const targetUrl = currentParams.toString()
    ? `/?${currentParams.toString()}`
    : "/"

  return (
    <Link
      href={targetUrl}
      scroll={false}
      prefetch={true}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        select-none
        ${selected ? "border-b-neutral-800 text-neutral-800" : "border-transparent text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-xs whitespace-nowrap">{label}</div>
    </Link>
  )
}

export default CategoryBox
