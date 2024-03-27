import Image from 'next/image';
const RightAdvertisements = () => {
  return (
    <>
      <div className='hidden md:ml-4 lg:flex lg:w-[25%] xl:w-[20%]'>
        <div className='sm:sticky sm:top-32 sm:h-fit ml-8'>
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
