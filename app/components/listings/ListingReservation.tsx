'use client';

import {Range} from 'react-date-range';
import { Button, Calendar } from '@/app/components';

interface ListingReservationProps {
    price: number;
    totalPrice: number;
    dateRange: Range;
    onChange: (value: Range) => void;
    onSubmit: ()=>void;
    disabled?: boolean;
    disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price, totalPrice, dateRange, onChange, onSubmit, disabled, disabledDates
}) => {
  return (
    <div className="
        bg-white border-[1px] rounded-xl border-neutral-200 overflow-hidden
    ">
        <div className="
            flex flex-row gap-1 p-4 items-center
        ">
            <div className="text-2xl font-semibold">
                ${price}
            </div>
            <div className="text-neutral-600 font-light">
                night
            </div>
        </div>
        <hr />
        <Calendar
            value={dateRange}
            onChange={(value) => onChange(value.selection)}
            disabledDates={disabledDates}
        />
        <hr />
        <div className="p-4">
            <Button
                disabled={disabled}
                onClick={onSubmit}
                label='Reserve'
            />
        </div>
        <div className="
            p-4 flex flex-row items-center justify-between font-semibold text-lg
        ">
            <div>
                Total
            </div>
            <div>
                $ {totalPrice}
            </div>
        </div>
    </div>
  )
}

export default ListingReservation