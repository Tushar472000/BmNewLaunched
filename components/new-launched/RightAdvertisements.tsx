import Image from 'next/image';
const RightAdvertisements = () => {
    return (
      <>
        <div className='flex-col gap-4 pt-6 md:sticky md:top-32  md:flex md:h-fit lg:pt-0'>
          <div className='flex  w-full items-center justify-center rounded-md'>
            <Image
              src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Bullion-Mentor-motive_anp3hj.webp'
              alt=''
              height={500}
              width={500}
              className='rounded-lg'
              loading='lazy'
            />
          </div>
        </div>
      </>
    );
  };
  export default RightAdvertisements;