import prisma from "@/lib/prismadb"
import { SafeListing, SafeUser } from "@/types"

interface IParams {
  listingId?: string
}

export type SafeListingWithUser = SafeListing & {
  user: SafeUser
}

export default async function getListingById(
  params: IParams
): Promise<SafeListingWithUser | null> {
  try {
    const { listingId } = params

    if (!listingId) {
      return null
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    })

    if (!listing) {
      return null
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    }
  } catch (error: unknown) {
    const err = error as { digest?: string }
    if (err?.digest === "DYNAMIC_SERVER_USAGE") {
      throw error
    }
    console.error("GET_LISTING_BY_ID_ERROR", error)
    return null
  }
}
