import React from 'react';
import Image from 'next/image';
const GoogleAdsCode = ({toggleRequestModal}:any) => {
  return (
    <>
      <div className='flex flex-col items-center'>
        <h2 className='pt-4 text-2xl font-semibold'>Sponsored</h2>
        <hr className='my-2 w-full' />
        <Image
          className='item-centerh-[300px] w-[445px] cursor-pointer md:h-[250px] lg:w-[500px] xl:h-[300px] '
          onClick={toggleRequestModal}
          src='https://res.cloudinary.com/bullionmentor/image/upload/Images/ads-looking_fnfe0i.webp'
          height={500}
          width={500}
          alt='ads'
          priority={false}
          loading='lazy'
        />
      </div>
    </>
  );
};

export default GoogleAdsCode;
