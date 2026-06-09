"use client"; // Required in Next.js App Router for hooks like useState/useEffect

import React, { useState, useEffect } from "react";
import { Card, Button } from "@heroui/react";
import { Pin, Layers, CircleDollar } from "@gravity-ui/icons";

export default function JobCards() {
  const [jobCards, setJobCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch job data");
        }
        return res.json();
      })
      .then((data) => {
        setJobCards(data);
        setLoading(false);
      })
      .catch((error) => {
        // console.error("Error loading JSON data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-black text-white min-h-screen py-16 px-4 flex flex-col items-center justify-center font-sans">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <span className="text-xs font-mono tracking-widest text-purple-400 uppercase flex items-center justify-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 bg-purple-500 inline-block"></span>
          Smart Job Discovery
          <span className="w-1.5 h-1.5 bg-purple-500 inline-block"></span>
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-xl mx-auto leading-tight">
          The roles you'd never <br /> find by searching
        </h2>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-neutral-400 font-medium text-lg">Loading opportunities...</div>
      ) : (
        /* Cards Grid - Sliced to display exactly 6 entries */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-4 mb-12">
          {jobCards.slice(0, 6).map((job, index) => (
            <Card 
              key={index} 
              className="bg-[#121212] border border-neutral-800/60 rounded-2xl p-6 text-white shadow-xl hover:border-neutral-700 transition-colors flex flex-col justify-between"
              shadow="none"
            >
              {/* Main Content Area */}
              <div className="flex flex-col gap-4">
                {/* Job Title & Description */}
                <div>
                  <h3 className="text-xl font-medium mb-2">{job.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Tags / Badges */}
                <div className="flex flex-wrap gap-2 my-2">
                  {/* Location Tag */}
                  <div className="flex items-center gap-1.5 bg-[#1c1c1e] text-xs text-neutral-300 px-3 py-1.5 rounded-full">
                    <Pin className="w-3.5 h-3.5 text-purple-400" />
                    {job.location}
                  </div>
                  {/* Work Type Tag */}
                  <div className="flex items-center gap-1.5 bg-[#1c1c1e] text-xs text-neutral-300 px-3 py-1.5 rounded-full">
                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                    {job.workType}
                  </div>
                  {/* Salary Tag */}
                  <div className="w-full flex">
                    <div className="flex items-center gap-1.5 bg-[#1c1c1e] text-xs text-neutral-300 px-3 py-1.5 rounded-full">
                      <CircleDollar className="w-3.5 h-3.5 text-purple-400" />
                      {job.salary}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-6 pt-2">
                <Button className="text-sm font-medium text-white hover:text-neutral-300 transition-colors flex items-center gap-1 group">
                  Apply Now 
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Bottom Button */}
      <div className="text-center">
        <Button 
          className="bg-white text-black font-medium px-6 py-2.5 rounded-xl hover:bg-neutral-200 transition-colors text-sm shadow-md"
          radius="md"
        >
          View all job open
        </Button>
      </div>

    </div>
  );
}