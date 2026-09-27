"use client"

import { IconType } from "react-icons"

interface CategoryInputProps {
  icon: IconType
  label: string
  selected?: boolean
  onClick: (value: string) => void
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? "border-black bg-neutral-50 shadow-sm" : "border-neutral-200"}
      `}
    >
      <Icon size={30} className={selected ? "text-rose-500" : "text-neutral-600"} />
      <div className="font-semibold text-sm">{label}</div>
    </div>
  )
}

export default CategoryInput
