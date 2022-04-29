import {Suspense} from 'react';
import {
  useShop,
  useShopQuery,
  flattenConnection,
  Seo,
  Link,
  Image,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Layout from '../../components/Layout.server';
import MoneyCompareAtPrice from '../../components/MoneyCompareAtPrice.client';
import MoneyPrice from '../../components/MoneyPrice.client';
import ProductCard from '../../components/ProductCard';
import NotFound from '../../components/NotFound.server';

export default function Collection({
  country = {isoCode: 'GB'},
  collectionProductCount = 24,
  params,
}) {
  const {languageCode} = useShop();

  const {handle} = params;
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      handle,
      country: country.isoCode,
      language: languageCode,
      numProducts: collectionProductCount,
    },
    preload: true,
  });

  if (data?.collection == null) {
    return <NotFound />;
  }

  const collection = data.collection;
  const products = flattenConnection(collection.products);
  // const hasNextPage = data.collection.products.pageInfo.hasNextPage;

  return (
    <Layout>
      {/* the seo object will be expose in API version 2022-04 or later */}
      <Seo type="collection" data={collection} />
      <div className="max-w-xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
          {collection.title}
        </h1>
        <div
          className="mt-4 text-base text-gray-500"
          dangerouslySetInnerHTML={{
            __html: collection.descriptionHtml,
          }}
        />
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => {
            const selectedVariant = product.variants.edges[0].node;
            return (
              <div key={product.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <Image
                    data={selectedVariant.image}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/products/${product.handle}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.vendor}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900 flex">
                    {selectedVariant.compareAtPriceV2 && (
                      <Suspense fallback={null}>
                        <MoneyCompareAtPrice
                          money={selectedVariant.compareAtPriceV2}
                        />
                      </Suspense>
                    )}
                    <Suspense fallback={null}>
                      <MoneyPrice money={selectedVariant.priceV2} />
                    </Suspense>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* {hasNextPage && (
        <LoadMoreProducts startingCount={collectionProductCount} />
      )} */}
    </Layout>
  );
}

const QUERY = gql`
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $numProducts: Int!
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      title
      descriptionHtml
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: $numProducts) {
        edges {
          node {
            id
            title
            vendor
            handle
            descriptionHtml
            compareAtPriceRange {
              maxVariantPrice {
                currencyCode
                amount
              }
              minVariantPrice {
                currencyCode
                amount
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  image {
                    id
                    url
                    altText
                    width
                    height
                  }
                  priceV2 {
                    currencyCode
                    amount
                  }
                  compareAtPriceV2 {
                    currencyCode
                    amount
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
`;
