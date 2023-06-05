'use client';

import { useRouter } from "next/navigation";
import {Button, Heading} from "@/app/components";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'No exact matches',
    subtitle = 'Try changing or removing some of your filters',
    showReset,
}) => {
    const router = useRouter();
  return (
    <div className="
        h-[60vh] flex flex-col gap-2 items-center justify-center
    ">
        <Heading
            title={title}
            subtitle={subtitle}
            center
        />
        <div className="w-48 mt-4">
            {showReset && (
                <Button 
                    label="Remove all filters"
                    outline
                    onClick={()=> router.push('/')}
                />
            )}
        </div>
    </div>
  )
}

export default EmptyState