import { getCurrentUser, getReservations } from "@/app/actions";
import { ClientOnly, EmptyState } from "@/app/components";
import ReservationsClient from "./ReservationsClient";

const ReservationPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unathorized"
                    subtitle="Please Login"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id,
    });

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="No reservations found"
                    subtitle="Looks like you have no reservations on your properties"
                />
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <ReservationsClient 
            reservations={reservations}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default ReservationPage