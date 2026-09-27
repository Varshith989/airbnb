import prisma from "@/lib/prismadb"
import getCurrentUser from "./getCurrentUser"
import { SafeListing } from "@/types"

export default async function getFavoriteListings(): Promise<SafeListing[]> {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return []
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    })

    return favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }))
  } catch (error: unknown) {
    const err = error as { digest?: string }
    if (err?.digest === "DYNAMIC_SERVER_USAGE") {
      throw error
    }
    console.error("GET_FAVORITES_ERROR", error)
    return []
  }
}
