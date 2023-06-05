import {NextResponse} from 'next/server';

import {prisma} from '@/app/libs';
import {getCurrentUser} from '@/app/actions';

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price
    } = body;

    const listing = await prisma.listing.create({
        data: {
            title, description, imageSrc, category, roomCount, bathroomCount, guestCount, locationValue: location.value, price: parseInt(price, 0), userId: currentUser.id
        }
    })

    return NextResponse.json(listing);
}