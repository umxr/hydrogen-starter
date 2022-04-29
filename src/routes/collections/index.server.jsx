import {CacheDays, Seo, useShopQuery, useShop, Image} from '@shopify/hydrogen';
import {Link} from '@shopify/hydrogen/client';
import gql from 'graphql-tag';
import NotFound from '../../components/NotFound.server';
import Layout from '../../components/Layout.server';

export default function Collections({country = {isoCode: 'GB'}, params}) {
  const {languageCode} = useShop();
  const {
    data: {
      shop: {title, description},
      collections,
    },
  } = useShopQuery({
    query: QUERY,
    variables: {
      handle: params.handle,
      country: country.isoCode,
      language: languageCode,
    },
    preload: true,
  });

  if (collections === null) {
    return <NotFound />;
  }

  return (
    <Layout>
      <Seo
        type="collection"
        data={{
          title,
          description,
        }}
      />
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Collections
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {collections.edges.map((collection) => (
            <div key={collection.node.id} className="group relative">
              <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                <Image
                  src={collection.node.image.url}
                  alt={collection.node.title}
                  width={collection.node.image.width}
                  height={collection.node.image.height}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">
                <Link to={`/collections/${collection.node.handle}`}>
                  <span className="absolute inset-0" />
                  {collection.node.title}
                </Link>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const QUERY = gql`
  query CollectionsPageQuery($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    shop {
      description
    }
    collections(first: 100) {
      edges {
        node {
          id
          title
          handle
          image {
            height
            width
            url
          }
        }
      }
    }
  }
`;
