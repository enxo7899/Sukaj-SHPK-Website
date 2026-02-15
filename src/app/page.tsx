import { Hero } from "@/components/hero";
import { BentoGrid } from "@/components/bento-grid";
import { Categories } from "@/components/categories";
import { Stats } from "@/components/stats";
import { Timeline } from "@/components/timeline";
import { CTA } from "@/components/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <BentoGrid />
      <Categories />
      <Timeline />
      <CTA />
    </>
  );
}
