'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
    const router = useRouter();
  return (
    <>
    <Image
      onClick={() => router.push('/')}
      alt='Logo'
      className='hidden lg:block cursor-pointer'
      height={100}
      width={100}
      src="/images/logo.png"
    />
    <Image
      onClick={() => router.push('/')}
      alt='Logo'
      className='hidden lg:hidden md:block cursor-pointer'
      height={30}
      width={30}
      src="/images/airbnb-logo.png"
    />
    </>
  )
}

export default Logo