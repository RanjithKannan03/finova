import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full px-4 md:px-8 lg:px-20 xl:px-32 pt-5 md:pt-8 lg:pt-10 xl:pt-20">
      <Hero />
    </div>
  );
}
