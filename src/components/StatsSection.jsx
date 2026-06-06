"use client";

import Image from "next/image";
import {
  Briefcase,
  Factory,
  CircleInfo,
  Star,
} from "@gravity-ui/icons";
import JobHero from "./JobHero";
import { motion } from "motion/react"
export default function StatsSection() {
  const stats = [
    {
      icon: Briefcase,
      value: "50K",
      label: "Active Jobs",
    },
    {
      icon: Factory,
      value: "12K",
      label: "Companies",
    },
    {
      icon: CircleInfo,
      value: "2M",
      label: "Job Seekers",
    },
    {
      icon: Star,
      value: "97%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-24 lg:py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4f46e580,transparent_60%)]" />

      {/* Globe Image */}
      <div className="absolute inset-0 flex justify-center">
        <div >
          <Image
            src="/images/globe.png" // put your globe image inside public folder
            alt="Globe"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />


      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="pb-30">
          <JobHero></JobHero>
        </div>
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-light leading-relaxed text-white ">
            Assisting over{" "}
            <span className="font-semibold text-white">
              15,000 job seekers
            </span>
            <br />
            find their dream positions.
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="
                  group
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-indigo-500/30
                  hover:bg-white/[0.05]
                "
              >
                <Icon className="h-5 w-5 text-white/70" />

                <h3 className="mt-10 text-5xl font-bold text-white">
                  {stat.value}
                </h3>

                <p className="mt-3 text-sm text-slate-300">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}