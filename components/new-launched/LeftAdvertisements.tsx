import Image from 'next/image';
const LeftAdvertisements = ({ src }: any) => {
  return (
    <>
      <Image
        src={src}
        alt=''
        height={500}
        width={500}
        className='rounded-lg pt-4'
        loading='lazy'
      />
    </>
  );
};
export default LeftAdvertisements;
