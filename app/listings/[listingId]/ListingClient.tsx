'use client'

import { Container, ListingHead, ListingInfo, ListingReservation, categories } from "@/app/components";
import { useLoginModal } from "@/app/hooks";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types"
import axios from "axios";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}

interface listingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser: SafeUser | null;
}

const ListingClient: React.FC<listingClientProps> = ({
    listing, currentUser, reservations = []
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
        const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
        });

        dates = [...dates, ...range];
    });

    return dates;
    }, [reservations]);

    const category = useMemo(() => {
        return categories.find((items) => 
        items.label === listing.category);
    }, [listing.category]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
        return loginModal.onOpen();
        }
        setIsLoading(true);

        axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
        })
        .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
        router.refresh();
        })
        .catch(() => {
        toast.error('Something went wrong.');
        })
        .finally(() => {
        setIsLoading(false);
        })
    },
    [
    totalPrice, 
    dateRange, 
    listing?.id,
    router,
    currentUser,
    loginModal
    ]);

    useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
        const dayCount = differenceInDays(
        dateRange.endDate, 
        dateRange.startDate
        );
        
        if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
        } else {
        setTotalPrice(listing.price);
        }
    }
    }, [dateRange, listing.price]);
  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-2 lg:gap-6">
                <ListingHead 
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                />
                <div className="
                    grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6
                ">
                    <ListingInfo 
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        bathroomCount={listing.bathroomCount}
                        guestCount={listing.guestCount}
                        locationValue={listing.locationValue}
                    />
                    <div className="order-first mb-10 md:order-last md:col-span-3">
                        <ListingReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            onChange={(value)=> setDateRange(value)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                            disabledDates={disabledDates}
                        />
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default ListingClient