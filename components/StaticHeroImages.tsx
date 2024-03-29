import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
const StaticHeroImages = ({staticImage}:any) => {
  return (
    <>
       <div className='relative hidden h-32 w-fit md:mt-2 md:block md:h-40 md:w-auto lg:h-60 xl:h-80'>
                  {staticImage?.imagePath && (
                    <Link
                      target='_blank'
                      href={staticImage.eventRedirectiveUrl}
                      passHref
                      prefetch={false}
                    >
                      <Image
                        fill
                        aria-label={staticImage.imageName}
                        className='rounded-lg object-contain  md:object-fill'
                        src={staticImage?.imagePath}
                        alt={staticImage?.imageName}
                        priority={false}
                        loading='lazy'
                      />
                    </Link>
                  )}
         </div>
    </>
  )
}

export default StaticHeroImages
