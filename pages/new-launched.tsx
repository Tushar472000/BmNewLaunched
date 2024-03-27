import TopProductItem from '@/containers/home/TopProductItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchSpinner from '@/components/Loaders/SearchSpinner';
import data from '@/data';
import { getTopProducts } from '@/services/spot-prices';
import type { GetTopProductsBy } from '@/interfaces/typeinterfaces';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import Head from 'next/head';
import { Suspense, useEffect, useState } from 'react';
import MiscSkeleton1 from '@/components/Loaders/Misc1/MiscSkeleton1';
import dynamic from 'next/dynamic';
const ToggleButton = dynamic(
  () => import('@/components/new-launched/ToggleButton')
);
const LeftAdvertisements = dynamic(
  () => import('@/components/new-launched/LeftAdvertisements')
);
const RightAdvertisements = dynamic(
  () => import('@/components/new-launched/RightAdvertisements')
);
export default function NewLaunched({
  title,
  topProducts
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [view, setView] = useState<'detailed' | 'grid'>('grid');
  const [hydrated, setHydrated] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [products, setProducts] = useState<any[]>(topProducts.homePageProductDetails);

    const loadMoreProducts = async () => {
      console.log('called');
      const getBy: GetTopProductsBy | undefined = 'NewLaunched';
      const searchKeyword =  undefined;
      const nextPage = page + 1;
      let pageSize = '4';
      const newProducts = await getTopProducts(getBy, searchKeyword,'',pageSize,  nextPage.toString());
      console.log(newProducts.homePageProductDetails)
      if (newProducts.homePageProductDetails.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts: any) => [...prevProducts, ...newProducts.homePageProductDetails]);
        setPage(nextPage);
      }
    };
  useEffect(() => {
    setHydrated(true);
  }, [topProducts]);
  
  const itemListElement = topProducts.homePageProductDetails.map(
    (product: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: 'https://www.bullionmentor.com/' + product.shortName
    })
  );
  const trendingProductsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: itemListElement
  };
  return (
    <>
      {/* ******************** SEO CONTENT ******************** */}
      <Head>
        <title>{title}</title>
        <meta property='og:type' content={data.OGTags.home.type} />
        <meta
          property='og:url'
          content={`${process.env.WEBSITE_URL}/new-launched`}
          key={`${process.env.WEBSITE_URL}/new-launched`}
        />
        <link
          rel='canonical'
          href={`${process.env.WEBSITE_URL}/new-launched`}
        />
        <script
          async
          defer
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(trendingProductsSchema)
          }}
          key='product-jsonld'
        ></script>
      </Head>
      {/* ******************** GRADIENT ******************** */}
      <div className='bg-gradient-to-b from-secondary via-white to-white text-dark-black'>
        {/* ******************** HEADING ******************** */}
        <div className='container mx-auto pt-8 md:mt-2 lg:mt-1'>
          <h1 className='mt-4 text-lg font-bold md:text-xl lg:mt-0'>
            Explore the best prices of bullion with Bullion Mentor
          </h1>
          {/* ******************** SEO CONTENT TOP ******************** */}
          <p className='hidden text-sm md:text-base lg:block'>
            {topProducts.homepagecontent &&
              topProducts.homepagecontent.seoContent}
          </p>
        </div>
      </div>
      {hydrated === true ? (
        <div className='container mx-auto mt-3 text-dark-black'>
          <div className='sm:flex sm:flex-row'>
            {/* ******************** LEFT ADVERTISEMENT ******************** */}
            <div className='hidden sm:sticky sm:top-32 sm:block sm:w-[32%] md:h-fit lg:w-[200px] xl:w-[300px]'>
              <LeftAdvertisements src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Royal-Canadian-Mint_xqgsz4.webp' />
              <LeftAdvertisements src='https://res.cloudinary.com/bullionmentor/image/upload/v1689165092/Banners/Canadian-Maple-Leaf_c1juxl.webp' />
            </div>
            <div className='md:flex-2 sm:w-[68%] lg:w-[60%]'>
            <div className='flex flex-col gap-2'>
              {/* ******************** PRODUCTS ******************** */}

              {/* ******************** VIEW TOGGLE BUTTONS ******************** */}
              <ToggleButton view={view} setView={setView} />

              {/* ******************** PRODUCT LIST ******************** */}
              <Suspense>
              <InfiniteScroll
              dataLength={products.length}
              next={loadMoreProducts}
              hasMore={hasMore}
              loader={<SearchSpinner />}
              scrollThreshold={0.3}
              >
                <div
                  className={`mx-1  mb-5 grid gap-4 ${
                    view === 'detailed'
                      ? 'grid-cols-1 xl:grid-cols-2'
                      : 'grid-cols-2 xl:grid-cols-3'
                  }`}
                >
                  {products.map((product: any) => (
                    <TopProductItem
                      view={view}
                      key={product.productId}
                      {...product}
                    />
                  ))}
                </div>
              </InfiniteScroll>
              </Suspense>
              {/* ******************** LEFT ADVERTISEMENT ******************** */}
              <div className='mx-2 flex-col gap-4 sm:hidden md:static md:top-[32px] md:h-fit'>
                <LeftAdvertisements src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Royal-Canadian-Mint_xqgsz4.webp' />
                <LeftAdvertisements src='https://res.cloudinary.com/bullionmentor/image/upload/v1689165092/Banners/Canadian-Maple-Leaf_c1juxl.webp' />
              </div>
              {/* ******************** SEO CONTENT Bottom ******************** */}
              <div
                className={`text-justify' mx-2 text-sm sm:container sm:mx-auto sm:mt-10 md:relative md:col-span-4 md:mt-5  md:text-base`}
              >
                <div className=' md:mt-2 lg:mt-1 lg:hidden'>
                  <p>
                    {topProducts.homepagecontent &&
                      topProducts.homepagecontent.seoContent}
                  </p>
                </div>
              </div>
              </div>
            </div>

            {/* ******************** RIGHT ADVERTISEMENTS ******************** */}
            <RightAdvertisements />
          </div>
        </div>
      ) : (
        <MiscSkeleton1 />
      )}
    </>
  );
}
export const getServerSideProps: GetServerSideProps<{
  title: any;
  topProducts: Awaited<ReturnType<typeof getTopProducts>>;
}> = async ({ query, res }) => {
  const getBy: GetTopProductsBy | undefined = 'NewLaunched';
  const searchKeyword = query.search as string | undefined;
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=60'
  );
  const topProducts = await getTopProducts(getBy, searchKeyword,'','4','1');
  const title = data.site.newLaunched.page;

  return {
    props: {
      title,
      topProducts
    }
  };
};
