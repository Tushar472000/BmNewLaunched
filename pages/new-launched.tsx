import TopProductItem from '@/containers/home/TopProductItem';
import data from '@/data';
import { getTopProducts } from '@/services/spot-prices';
import { GetTopProductsBy } from '@/interfaces/typeinterfaces';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
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
        <link
          rel='preload'
          as='image'
          href='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Royal-Canadian-Mint_xqgsz4.webp'
        />
        <link
          rel='preload'
          as='image'
          href='https://res.cloudinary.com/bullionmentor/image/upload/v1689165092/Banners/Canadian-Maple-Leaf_c1juxl.webp'
        />
        <link
          rel='preload'
          as='image'
          href='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Bullion-Mentor-motive_anp3hj.webp'
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
        <div className='container mx-auto py-8 md:mt-2  lg:mt-1'>
          <h1 className='mb-2 mt-3 text-lg font-bold md:text-xl lg:mt-0'>
            Explore the best prices of bullion with Bullion Mentor
          </h1>
          {/* ******************** DESCRIPTION ******************** */}
          <p className='text-sm text-slate-600 md:text-base'>
            {topProducts.homepagecontent &&
              topProducts.homepagecontent.seoContent}
          </p>
        </div>
      </div>
      <Suspense fallback={<MiscSkeleton1 />}>
        <div className='container mx-auto text-dark-black'>
          {/* ******************** PAGE CONTENT ******************** */}
          <div className='flex flex-col gap-2 md:grid md:grid-cols-5'>
            {/* ******************** LEFT ADVERTISEMENT ******************** */}
            <div className='hidden flex-col gap-4 md:sticky md:top-32 md:block md:h-fit lg:flex '>
              <LeftAdvertisements src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Royal-Canadian-Mint_xqgsz4.webp' />
              <LeftAdvertisements src='https://res.cloudinary.com/bullionmentor/image/upload/v1689165092/Banners/Canadian-Maple-Leaf_c1juxl.webp' />
            </div>
            {/* ******************** PRODUCTS ******************** */}
            <div className='col-span-3 mx-0 grow gap-0 lg:mx-4 lg:gap-4'>
              {/* ******************** VIEW TOGGLE BUTTONS ******************** */}
              <ToggleButton view={view} setView={setView} />

              {/* ******************** PRODUCT LIST ******************** */}
              <Suspense>
                <div
                  className={` grid gap-4 ${
                    view === 'detailed'
                      ? 'grid-cols-1 xl:grid-cols-2'
                      : 'grid-cols-2 xl:grid-cols-3'
                  }`}
                >
                  {topProducts.homePageProductDetails.map((product: any) => (
                    <TopProductItem
                      view={view}
                      key={product.productId}
                      {...product}
                    />
                  ))}
                </div>
              </Suspense>
            </div>
            {/* ******************** LEFT ADVERTISEMENT ******************** */}
            <div className='block flex-col gap-4 md:sticky md:top-32 md:hidden md:h-fit'>
              <LeftAdvertisements src='https://res.cloudinary.com/bullionmentor/image/upload/Banners/Royal-Canadian-Mint_xqgsz4.webp' />
              <LeftAdvertisements src='https://res.cloudinary.com/bullionmentor/image/upload/v1689165092/Banners/Canadian-Maple-Leaf_c1juxl.webp' />
            </div>
            {/* ******************** RIGHT ADVERTISEMENTS ******************** */}
            <RightAdvertisements />
          </div>
        </div>
      </Suspense>
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
  const topProducts = await getTopProducts(getBy, searchKeyword);
  const title = data.site.newLaunched.page;
  return {
    props: {
      title,
      topProducts
    }
  };
};
