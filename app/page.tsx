import Anniversary from "@/components/Anniversary";
import Birthday from "@/components/Birthday";

import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
// import Heritage from "@/components/Heritage";
import Hero from "@/components/Hero";
import MovingText from "@/components/MovingText";
import IntroSection from "@/components/IntroSection";

export default function Home() {
  return (
    <>
      <Header />
      <IntroSection />
      <Hero />
      <MovingText />
      <Birthday />
      <Anniversary />
      {/* <Heritage /> */}
      <Gallery />
    </>
  );
}
