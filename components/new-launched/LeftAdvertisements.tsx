import Image from 'next/image';
const LeftAdvertisements = ({ src }: any) => {
    return (
      <>
        <div className='flex w-full items-center justify-center rounded-md '>
          <Image
            src={src}
            alt=''
            height={500}
            width={500}
            className='rounded-lg pt-4 lg:pt-0'
            loading='lazy'
          />
        </div>
      </>
    );
  };
  export default LeftAdvertisements;