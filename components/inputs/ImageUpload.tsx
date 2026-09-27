"use client"

import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback, useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"
import { IoClose } from "react-icons/io5"

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

interface CloudinaryUploadResult {
  info: {
    secure_url: string
  }
}

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
]

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [customUrl, setCustomUrl] = useState("")

  const handleUpload = useCallback(
    (result: unknown) => {
      const uploadResult = result as CloudinaryUploadResult
      if (uploadResult?.info?.secure_url) {
        onChange(uploadResult.info.secure_url)
      }
    },
    [onChange]
  )

  return (
    <div className="flex flex-col gap-4">
      <CldUploadWidget
        onSuccess={handleUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || "airbnb_clone"}
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open?.()}
              className="
                relative
                cursor-pointer
                hover:opacity-70
                transition
                border-dashed
                border-2
                p-12
                border-neutral-300
                flex
                flex-col
                justify-center
                items-center
                gap-4
                text-neutral-600
                rounded-xl
                bg-neutral-50
              "
            >
              <TbPhotoPlus size={48} className="text-rose-500" />
              <div className="font-semibold text-base text-neutral-800">
                Click to upload from your computer (Cloudinary)
              </div>
              <div className="text-xs text-neutral-400">
                Supports JPG, PNG, WEBP
              </div>
            </div>
          )
        }}
      </CldUploadWidget>

      {/* Instant sample image or custom URL option */}
      <div className="flex flex-col gap-2 pt-2 border-t">
        <div className="text-xs font-semibold text-neutral-600">
          Or paste image URL / pick a demo Airbnb photo:
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Paste image URL here..."
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            className="flex-1 p-2 text-sm border rounded-md outline-none focus:border-black"
          />
          <button
            type="button"
            onClick={() => {
              if (customUrl) onChange(customUrl)
            }}
            className="px-3 py-2 text-xs font-semibold bg-neutral-800 text-white rounded-md hover:bg-black transition"
          >
            Use URL
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2 mt-1">
          {SAMPLE_IMAGES.map((img, i) => (
            <div
              key={i}
              onClick={() => onChange(img)}
              className={`
                relative h-14 rounded-md overflow-hidden cursor-pointer border-2 transition hover:scale-105
                ${value === img ? "border-rose-500 ring-2 ring-rose-300" : "border-transparent"}
              `}
            >
              <Image fill src={img} alt="sample" className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Selected Image Preview */}
      {value && (
        <div className="relative w-full h-60 rounded-xl overflow-hidden border">
          <Image
            alt="Listing photo preview"
            fill
            style={{ objectFit: "cover" }}
            src={value}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black text-white rounded-full transition"
            title="Remove image"
          >
            <IoClose size={18} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
