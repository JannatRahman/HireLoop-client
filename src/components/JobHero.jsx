import React from 'react';
// Assuming HeroUI v3 components are imported from '@heroui/react'
import { Input, Button, Chip } from '@heroui/react';
// Gravity UI Icons
import { Magnifier, Pin } from '@gravity-ui/icons';

export default function JobHero() {
  return (
    <div className="relative min-h-[500px] w-full text-white flex flex-col items-center justify-center px-4 overflow-hidden select-none">

      {/* Subtle background glow/stars effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="z-10 max-w-4xl w-full flex flex-col items-center text-center">

        {/* Top Badge: 50,000+ New Jobs */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md shadow-lg mb-8 transition-transform hover:scale-105">
          <span className="text-base">💼</span>
          <span className="text-xs tracking-widest uppercase font-semibold bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200 bg-clip-text text-transparent">
            <strong className="text-white font-extrabold mr-1">50,000+</strong> New Jobs This Month
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl  font-bold tracking-tight text-white mb-6 max-w-2xl">
          Find Your Dream Job Today
        </h1>

        {/* Subheading Paragraph */}
        <p className="text-zinc-400 text-base md:text-lg max-w-2xl font-light leading-relaxed mb-10">
          HireLoop connects top talent with world-class companies. Browse thousands of
          curated opportunities and land your next role — faster.
        </p>

        {/* Compound Searchbar */}
        <div className="w-full max-w-3xl bg-zinc-900/90 border border-zinc-800 rounded-2xl p-2 flex flex-col md:flex-row items-center gap-2 shadow-2xl backdrop-blur-xl mb-8">

          {/* Job Title Input */}
          <div className="w-full flex items-center px-3 gap-2">
            <Magnifier className="text-zinc-500 shrink-0" width={20} height={20} />
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="w-full bg-transparent py-3 text-sm text-white placeholder-zinc-500 focus:outline-none"
            />
          </div>

          {/* Divider Line (Visible only on desktop) */}
          <div className="hidden md:block h-6 w-[1px] bg-zinc-800" />

          {/* Location Input */}
          <div className="w-full flex items-center px-3 gap-2">
            <Pin className="text-zinc-500 shrink-0" width={20} height={20} />
            <input
              type="text"
              placeholder="Location or Remote"
              className="w-full bg-transparent py-3 text-sm text-white placeholder-zinc-500 focus:outline-none"
            />
          </div>

          {/* Search Button */}
          <Button
            isIconOnly
            className="w-full md:w-12 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0 min-w-[48px]"
            aria-label="Search jobs"
          >
            <Magnifier width={20} height={20} strokeWidth={2.5} />
          </Button>
        </div>

        {/* Trending Positions */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-500">
          <span className="mr-1">Trending Position</span>

          <Chip
            variant="bordered"
            className="bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors px-3 py-1 h-auto"
          >
            Product Designer
          </Chip>

          <Chip
            variant="bordered"
            className="bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors px-3 py-1 h-auto"
          >
            AI Engineering
          </Chip>

          <Chip
            variant="bordered"
            className="bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors px-3 py-1 h-auto"
          >
            Dev-ops Engineer
          </Chip>
        </div>

      </div>
    </div>
  );
}