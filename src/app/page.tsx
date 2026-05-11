import { HeroUltimate } from "@/components/hero-ultimate";
import { StatsPremium } from "@/components/stats-premium";
import { WhyUs } from "@/components/why-us";
import { PartnersSection } from "@/components/partners-section";
import { CategoriesPremium } from "@/components/categories-premium";
import { FeaturedProducts } from "@/components/featured-products";
import { LocationsSection } from "@/components/locations-section";
import { TimelinePremium } from "@/components/timeline-premium";
import { CTA } from "@/components/cta";

export default function Home() {
  return (
    <>
      <HeroUltimate />
      <StatsPremium />
      <WhyUs />
      <PartnersSection />
      <CategoriesPremium />
      <FeaturedProducts />
      <LocationsSection />
      <TimelinePremium />
      <CTA />
    </>
  );
}
