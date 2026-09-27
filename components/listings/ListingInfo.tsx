"use client"

import { IconType } from "react-icons"
import { SafeUser } from "@/types"
import Avatar from "@/components/Avatar"
import ListingCategory from "./ListingCategory"
import useCountries from "@/app/hooks/useCountries"

interface ListingInfoProps {
  user: SafeUser
  description: string
  guestCount: number
  roomCount: number
  bathroomCount: number
  category:
    | {
        icon: IconType
        label: string
        description: string
      }
    | undefined
  locationValue: string
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries()
  const coordinates = getByValue(locationValue)

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl
            font-semibold
            flex
            flex-row
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.name || "Host"}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
            flex
            flex-row
            items-center
            gap-4
            font-light
            text-neutral-500
          "
        >
          <div>{guestCount} guests</div>
          <div>·</div>
          <div>{roomCount} rooms</div>
          <div>·</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500 whitespace-pre-line">
        {description}
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold">Location</div>
        <div className="text-neutral-500 font-light">
          {coordinates?.region}, {coordinates?.label} ({coordinates?.flag})
        </div>
      </div>
    </div>
  )
}

export default ListingInfo
