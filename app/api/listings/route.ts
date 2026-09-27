import { NextResponse } from "next/server"
import prisma from "@/lib/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
    } = body

    if (
      !title ||
      !description ||
      !imageSrc ||
      !category ||
      !location ||
      !price
    ) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount: Number(roomCount) || 1,
        bathroomCount: Number(bathroomCount) || 1,
        guestCount: Number(guestCount) || 1,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.error("CREATE_LISTING_ERROR", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
