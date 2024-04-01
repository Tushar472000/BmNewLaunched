/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/inline-script-id */
/* eslint-disable @next/next/no-script-in-head */
import { Suspense, useEffect, useState } from 'react';
import { getMaintainance, getTopProducts } from '@/services/spot-prices';
import { GetTopProductsBy } from '@/interfaces/typeinterfaces';
import { GridViewSkeleton } from '@/components/Loaders/Grid/GridViewSkeleton';
import data from '@/data';
import { GoFlame } from 'react-icons/go';
import useToggle from '@/hooks/useToggle';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoGridSharp } from 'react-icons/io5';
import dynamic from 'next/dynamic';
import DashboardCarousel from '@/components/DashboardCarousel';
import DashboardSkeleton from '@/components/Loaders/Dashboard/DashboardSkeleton';
// import TopProductItem from '@/containers/home/TopProductItem';
import DashboardImages from '@/services/DashboardImages';
import { useDispatch, useSelector } from 'react-redux';
import { isVisited, selectUser } from '@/features/userSlice';
// import Search from '@/components/Search';
// import GoogleAdsCode from '@/components/GoogleAdsCode';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import SearchSpinner from '@/components/Loaders/SearchSpinner';
// -------------------------- Dynamic import -------------------///
const RequestProductModal = dynamic(
  () => import('@/components/ModalForm/RequestProduct/RequestProductModal')
);
const SubscribeModal = dynamic(
  () => import('@/components/ModalForm/Subscribe/SubscribeModal')
);
const DescText = dynamic(
  () => import('@/components/HomePageComponents/DescText')
);
const LeftAdvertisements = dynamic(
  () => import('@/components/LeftAdvertisements')
);
const StaticHeroImages = dynamic(() => import('@/components/StaticHeroImages'));
const Search = dynamic(() => import('@/components/Search'));
const TopProductItem = dynamic(
  () => import('@/containers/home/TopProductItem')
);
const GoogleAdsCode = dynamic(() => import('@/components/GoogleAdsCode'));
const SearchSpinner = dynamic(
  () => import('@/components/Loaders/SearchSpinner')
);
const InfiniteScroll = dynamic(() => import('react-infinite-scroll-component'));
export default function Home() {
  const [view, setView] = useState<'detailed' | 'grid'>('grid');
  const [isRequestModal, toggleRequestModal] = useToggle();
  const [isSubscribeModal, toggleSubscribeModal] = useToggle();
  const [hydrated, setHydrated] = useState(false);
  const [dynamicImages, setDynamicImages] = useState<any>();
  const [staticImage, setStaticImage] = useState<any>();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [products, setProducts] = useState<any[]>(
   
  );
  const [abc, setAbc] = useState(false);
  useEffect(() => {
    const check = async () => {
      await getMaintainance();
    };
    check();
    const dashboardImages = DashboardImages();
    setDynamicImages(
      dashboardImages.filter((image) => image.isStatic === false)
    );
    setStaticImage(dashboardImages.find((image) => image.isStatic === true));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user.hasVisited === false) {
      setTimeout(() => {
        toggleSubscribeModal();
        dispatch(isVisited(true));
      }, 6000);
    }
  }, []);
  useEffect(() => {
    const fetchData = async ()=>{
      setAbc(true)
    let topProducts;
    topProducts = await getTopProducts(
      undefined,
      undefined,
      '',
      '4',
      '1'
    );
    setProducts(topProducts.homePageProductDetails)
    setAbc(false);
    }
    fetchData();
  }, []);

  const loadMoreProducts = async () => {
    if (products?.length != 16) {
      const getBy: GetTopProductsBy | undefined = 'NewLaunched';
      const searchKeyword = undefined;
      const nextPage = page + 1;
      let pageSize = '4';
      const newProducts = await getTopProducts(
        getBy,
        searchKeyword,
        '',
        pageSize,
        nextPage.toString()
      );
      if (newProducts.homePageProductDetails.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts: any) => [
          ...prevProducts,
          ...newProducts.homePageProductDetails
        ]);
        setPage(nextPage);
      }
    } else {
      setHasMore(false);
    }
  };
  const homePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bullion Mentor',
    url: 'https://www.bullionmentor.com/',
    logo: 'https://res.cloudinary.com/bold-pm/image/upload/BBD/BM-logo.webp'
  };
  // const itemListElement = topProducts.homePageProductDetails.map(
  //   (product: any, index: number) => ({
  //     '@type': 'ListItem',
  //     position: index + 1,
  //     url: 'https://www.bullionmentor.com/' + product.shortName
  //   })
  // );
  // const trendingProductsSchema = {
  //   '@context': 'https://schema.org',
  //   '@type': 'ItemList',
  //   itemListElement: itemListElement
  // };
  return (
    <>
      <head>
        <title>{data.site.home.page}</title>
        {/*---------- Thumbnail code modified start*/}
        <meta name='twitter:url' content={`${process.env.WEBSITE_URL}`} />
        <meta name='twitter:title' content={data.site.home.description} />
        <meta name='twitter:description' content={data.site.home.description} />
        <meta name='twitter:card' content='summary' />
        <meta
          name='twitter:image'
          content={
            'https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/thumbnail.webp'
          }
        />
        {/*----------- Thumbnail code modified end */}
        <meta property='og:type' content={data.OGTags.home.type} />
        <meta property='og:url' content={`${process.env.WEBSITE_URL}`} />
        <meta
          property='og:image'
          content={
            'https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/thumbnail.webp'
          }
        />
        <link rel='canonical' href={`${process.env.WEBSITE_URL}`} />
        <script
          async
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
          key='product-jsonld'
        ></script>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
        />
        {/* <script
          async
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(trendingProductsSchema)
          }}
          key='product-jsonld'
        ></script> */}
      </head>
      <Suspense fallback={<DashboardSkeleton />}>
        {hydrated === true ? (
          <div>
            {/******************* GRADIENT HEADING *******************/}
            <section className='w-full bg-gradient-to-b from-secondary via-white to-white'>
              <div className='container relative mx-auto flex w-full flex-col items-center justify-center pt-4 pb-2'>
                {/******************** GRADIENT TEXT ******************* */}
                <div className='w-full pb-2 md:px-10 lg:px-28'>
                  <h1 className=' mt-10 text-center text-xl font-bold text-white md:text-3xl lg:mt-0'>
                    A Catalyst in Bullion World
                  </h1>
                  <p className='mt-0.5 text-center text-xs font-semibold text-white md:text-sm lg:text-base'>
                    We monitor bullion market sales events & inform consumers of
                    the excellent ones. Compare and keep track of bullion
                    prices..
                  </p>
                </div>
                {/******************* SEARCH COMPONENT *******************/}
                <div className='md:hidden md:w-2/3'>
                  <Search />
                </div>
              </div>
              {/******************* HERO IMAGES *******************/}
              <section className='mx-auto grid-cols-3 gap-4 md:container md:grid'>
                {/******************** CAROUSEL IMAGES ********************/}
                <div className='col-span-2'>
                  <DashboardCarousel images={dynamicImages} />
                </div>
                {/******************* STATIC HERO IMAGES *******************/}
                <StaticHeroImages staticImage={staticImage} />
              </section>
            </section>
            {/******************* PAGE HEADING *******************/}
            <section className='container mx-auto mt-4 w-full text-dark-black'>
              <div className='flex grid-cols-3 flex-col-reverse gap-4 md:grid lg:grid-cols-12'>
                {/******************* LEFT ADVERTISEMENTS *******************/}

                <div className='flex h-auto flex-col gap-3 lg:col-span-3'>
                  <LeftAdvertisements src='/2024-1-oz-Canadian-Gold-Maple-Leaf-Coin.jpg' />
                  <LeftAdvertisements src='/2024-American-Eagle-Coins.jpg' />
                  <LeftAdvertisements src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Majestic-Gilded-Kookaburra_cswfqg.webp' />

                  {/****************** GOOGLE ADS CODE GOES HERE ******************/}
                  <GoogleAdsCode toggleRequestModal={toggleRequestModal} />
                </div>

                {/******************* PRODUCT LISTING *******************/}
                <div className='flex flex-col gap-2 md:col-span-2 lg:col-span-9'>
                  {/******************* PRODUCT LIST TITLE *******************/}
                  <div className='flex w-full flex-col justify-between gap-4 lg:flex-row lg:items-center lg:gap-0'>
                    <h2 className='-mt-1 flex items-center gap-2 text-xl font-semibold md:-mt-0 md:text-2xl'>
                      <GoFlame className='text-2xl text-primary md:text-3xl' />{' '}
                      Trending Deals
                    </h2>
                    {/******************* MENU TOGGLE BUTTON *******************/}
                    <div className='hidden gap-6 self-end md:flex'>
                      {/******************* DETAILED VIEW BUTTON *******************/}
                      <button
                        onClick={() => setView('detailed')}
                        className={`flex items-center gap-2 px-4 py-2 ${
                          view === 'detailed'
                            ? 'rounded-md bg-primary text-white'
                            : 'bg-white'
                        }`}
                      >
                        <GiHamburgerMenu size={25} />
                        <span>Detailed View</span>
                      </button>
                      {/******************* GRID VIEW BUTTON *******************/}
                      <button
                        onClick={() => setView('grid')}
                        className={`flex items-center gap-2 px-4 py-2 ${
                          view === 'grid'
                            ? 'rounded-md bg-primary text-white'
                            : 'bg-white'
                        }`}
                      >
                        <IoGridSharp size={25} />
                        <span>Grid View</span>
                      </button>
                    </div>
                  </div>
                  {/******************* PRODUCTS ARRAY *******************/}
                  {abc===true?<GridViewSkeleton />: <InfiniteScroll
                    dataLength={products!==undefined?products.length:0}
                    next={loadMoreProducts}
                    hasMore={hasMore}
                    loader={<SearchSpinner />}
                    scrollThreshold={0.2}
                  >
                    <div
                      className={`grid min-h-[200px] gap-x-2 gap-y-4 md:gap-y-4 ${
                        view === 'grid'
                          ? 'grid-cols-2 xl:grid-cols-4 '
                          : 'grid-cols-1 lg:grid-cols-2'
                      }`}
                    >
                      {products?.map((product: any) => (
                        <TopProductItem
                          view={view}
                          key={product.productId}
                          {...product}
                        />
                      ))}
                    </div>
                  </InfiniteScroll>}
                 
                </div>
              </div>
            </section>
            <DescText />
            {isRequestModal && (
              <RequestProductModal closeModal={toggleRequestModal} />
            )}
            {isSubscribeModal && (
              <SubscribeModal closeModal={toggleSubscribeModal} />
            )}
          </div>
        ) : (
          <DashboardSkeleton />
        )}
      </Suspense>
    </>
  );
}
// export const getServerSideProps: GetServerSideProps<{
//   title: any;
//   description: any;
//   topProducts?: Awaited<ReturnType<typeof getTopProducts>>;
// }> = async ({ res, query, req }) => {
//   const { getBy, searchKeyword } = query as {
//     getBy?: GetTopProductsBy;
//     searchKeyword?: string;
//   };
//   const userAgent = req.headers['user-agent'] ?? '';
//   const isMobile = /Mobile|Android/i.test(userAgent);
//   const size = isMobile ? 4 : 16;
//   res.setHeader(
//     'Cache-Control',
//     'public, s-maxage=10, stale-while-revalidate=60'
//   );
//   let topProducts;
//   topProducts = await getTopProducts(
//     getBy,
//     searchKeyword,
//     '',
//     size.toString(),
//     '1'
//   );
//   const title = data.site.home.page;
//   const description = data.site.home.description;
//   return {
//     props: {
//       title,
//       description,
//       topProducts
//     }
//   };
// };
