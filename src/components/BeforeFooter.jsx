import React from "react";
import { Button } from "@heroui/react";
// Import Gravity UI icons if needed (e.g., ArrowRight)
import { ArrowRight } from "@gravity-ui/icons";

export default function BeforeFooter() {
  return (
    <section 
      className="relative w-full min-h-[600px] flex flex-col items-center justify-center text-center bg-black overflow-hidden px-4"
      style={{
        // Replace this URL with your actual background image path
        backgroundImage: "url('/images/cta-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4f46e580,transparent_60%)]" />
      {/* Optional: Dark overlay to ensure text readability */}
      {/* <div className="absolute inset-0 bg-black/40 pointer-events-none" /> */}

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
          Your next role is <br className="sm:hidden" /> already looking for you
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-400 text-base md:text-lg max-w-xl font-normal">
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-row items-center gap-4 mt-4">
          <Button
            size="lg"
            radius="sm"
            className="bg-white text-black font-medium hover:bg-zinc-200 transition-colors px-6"
          >
            Create a free account
          </Button>
          
          <Button
            size="lg"
            radius="sm"
            variant="bordered"
            className="border-zinc-800 text-white font-medium hover:bg-zinc-900/50 hover:border-zinc-700 transition-all px-6"
          >
            View pricing
          </Button>
        </div>

      </div>
    </section>
  );
}