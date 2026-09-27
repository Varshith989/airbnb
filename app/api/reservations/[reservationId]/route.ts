import { NextResponse } from "next/server"
import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/lib/prismadb"

interface IParams {
  reservationId?: string
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { reservationId } = params

    if (!reservationId || typeof reservationId !== "string") {
      return new NextResponse("Invalid ID", { status: 400 })
    }

    // Only allow the reservation creator (guest) OR the property owner (host) to delete/cancel
    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    })

    return NextResponse.json(reservation)
  } catch (error) {
    console.error("RESERVATION_CANCEL_ERROR", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
