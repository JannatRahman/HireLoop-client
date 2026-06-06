import BeforeFooter from "@/components/BeforeFooter";
import FeaturesJob from "@/components/FeaturedJob";
import JobCards from "@/components/JobCards";
import PricingCard from "@/components/PricingCard";
import StatsSection from "@/components/StatsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-zinc-50 font-sans dark:bg-black">
     <StatsSection/>
     <JobCards/>
     <FeaturesJob/>
     <PricingCard/>
     <BeforeFooter/>
    </div>
  );
}
