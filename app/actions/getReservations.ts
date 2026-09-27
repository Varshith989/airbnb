import prisma from "@/lib/prismadb"
import { SafeReservation } from "@/types"

interface IParams {
  listingId?: string
  userId?: string
  authorId?: string
}

export default async function getReservations(
  params: IParams
): Promise<SafeReservation[]> {
  try {
    const { listingId, userId, authorId } = params

    const query: Record<string, unknown> = {}

    if (listingId) {
      query.listingId = listingId
    }

    if (userId) {
      query.userId = userId
    }

    if (authorId) {
      query.listing = { userId: authorId }
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }))
  } catch (error: unknown) {
    const err = error as { digest?: string }
    if (err?.digest === "DYNAMIC_SERVER_USAGE") {
      throw error
    }
    console.error("GET_RESERVATIONS_ERROR", error)
    return []
  }
}
