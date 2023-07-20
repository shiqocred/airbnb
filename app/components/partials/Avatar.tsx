'use client';

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
  width?: number;
  height?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  src, height, width
}) => {
  return (
    <Image
        className="rounded-full"
        height={height ? height : 30}
        width={width ? width : 30}
        alt="Avatar"
        src={src || "/images/placeholder.jpeg"}
    />
  )
}

export default Avatar