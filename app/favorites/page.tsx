import EmptyState from "@/components/EmptyState"
import getCurrentUser from "@/app/actions/getCurrentUser"
import getFavoriteListings from "@/app/actions/getFavoriteListings"
import FavoritesClient from "./FavoritesClient"

export default async function FavoritesPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login to view your favorites"
      />
    )
  }

  const listings = await getFavoriteListings()

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    )
  }

  return (
    <FavoritesClient
      listings={listings}
      currentUser={currentUser}
    />
  )
}
