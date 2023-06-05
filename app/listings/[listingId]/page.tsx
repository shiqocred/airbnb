import { getCurrentUser, getListingById, getReservations } from "@/app/actions"
import { ClientOnly, EmptyState } from "@/app/components";
import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string
}

const ListingPage = async ({params}: {params: IParams}) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <ListingClient 
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  )
}

export default ListingPage