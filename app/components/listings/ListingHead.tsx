'use client'

import { useCountries } from "@/app/hooks";
import { SafeUser } from "@/app/types";
import { Heading, HeartButton } from "@/app/components";
import Image from "next/image";

interface ListingHeadProps {
    id: string;
    title: string;
    locationValue: string;
    imageSrc: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    id, title, locationValue, imageSrc, currentUser
}) => {
    const {getByValue} = useCountries();
    const location = getByValue(locationValue);

  return (
    <>
        <Heading 
            title={title}
            subtitle={`${location?.region}, ${location?.label}`}
        />
        <div
            className="
                w-full lg:h-[60vh] md:aspect-video aspect-square overflow-hidden rounded-xl relative mt-3
            "
        >
            <Image 
                src={imageSrc}
                alt={title}
                fill
                className="w-full object-cover"
            />
            <div className="absolute right-5 top-5">
                <HeartButton 
                    listingId={id}
                    currentUser={currentUser}
                />
            </div>
        </div>
    </>
  )
}

export default ListingHead