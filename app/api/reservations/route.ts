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
    const { listingId, startDate, endDate, totalPrice } = body

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return new NextResponse("Invalid reservation data", { status: 400 })
    }

    const listingAndReservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            totalPrice: Number(totalPrice),
          },
        },
      },
    })

    return NextResponse.json(listingAndReservation)
  } catch (error) {
    console.error("RESERVATION_CREATE_ERROR", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
