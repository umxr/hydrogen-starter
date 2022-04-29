import Layout from '../components/Layout.server';
import SeoForHomePage from '../components/pages/home/SeoForHomePage';
import {Suspense} from 'react';
import CategorySection from '../components/CategorySection';
import HeroSection from "../components/HeroSection";
import FeaturedSection from "../components/FeaturedSection";
import CollectionSection from '../components/CollectionSection';

export default function Index({country = {isoCode: 'GB'}}) {
  return (
    <Layout>
      <Suspense fallback={null}>
        <SeoForHomePage />
      </Suspense>
      <HeroSection />
      <CategorySection />
      <FeaturedSection />
      <CollectionSection />
    </Layout>
  );
}
