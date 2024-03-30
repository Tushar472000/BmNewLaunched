const StaticHeroImages = ({staticImage}:any) => {
  return (
    <>
       <div className='relative hidden h-32 w-fit md:mt-2 md:block md:h-40 md:w-auto lg:h-60 xl:h-80'>
                  {staticImage?.imagePath && (
                    <a
                      target='_blank'
                      rel="noreferrer"
                      href={staticImage.eventRedirectiveUrl}
                
                    >
                      <img
                    
                        aria-label={staticImage.imageName}
                        className='rounded-lg object-contain  md:object-fill w-full'
                        src={staticImage?.imagePath}
                        alt={staticImage?.imageName}
                       
                      />
                    </a>
                  )}
         </div>
    </>
  )
}

export default StaticHeroImages
