import Anniversary from "@/components/Anniversary";
import Birthday from "@/components/Birthday";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
// import Heritage from "@/components/Heritage";
import Hero from "@/components/Hero";
import MovingText from "@/components/MovingText";

export default function Home() {
  return (
   <>
   <Header />
   <Hero />
   <Birthday />
   <MovingText />
   <Anniversary />
   {/* <Heritage /> */}
   <Gallery />
   <Footer />
   </>
  );
}
