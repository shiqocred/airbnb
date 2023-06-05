import { ClientOnly, Container, EmptyState, Heading } from "@/app/components"
import { getCurrentUser, getFavoriteListings } from "@/app/actions"
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Favorites Found"
                    subtitle="Looks like you have no favorite listings."
                />
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <FavoritesClient 
            listings={listings}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default FavoritesPage