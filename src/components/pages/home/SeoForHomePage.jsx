import {CacheDays, Seo, useShopQuery} from '@shopify/hydrogen';
import gql from 'graphql-tag';

const SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      description
    }
  }
`;

export default function SeoForHomepage() {
  const {
    data: {
      shop: {title, description},
    },
  } = useShopQuery({
    query: SEO_QUERY,
    cache: CacheDays(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title,
        description,
      }}
    />
  );
}
