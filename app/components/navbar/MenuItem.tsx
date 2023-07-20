'use client';

interface MenuItemProps {
    className?: string;
    onClick: () => void;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
    className,
    onClick,
    label,
}) => {
  return (
    <div 
        onClick={onClick}
        className={`px-4 py-3 hover:bg-neutral-100 transition font-semibold select-none ${className}`}
    >
        {label}
    </div>
  )
}

export default MenuItem