"use client";

import React, { useState } from 'react';
import JobFilter from './JobFilter';
import JobSectionCard from './JobSectionCard';




export default function JobContainer({ initialJobs }) {
  const [displayedJobs, setDisplayedJobs] = useState(initialJobs);

  return (
    <>
      {/* Search Toolbar */}
      <JobFilter allJobs={initialJobs} onFilterChange={setDisplayedJobs} />

      {/* Responsive 3-Column Grid Layout */}
      {displayedJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedJobs.map((job) => (
            <div 
              key={job._id?.$oid || job._id} 
              className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-xl"
            >
              <JobSectionCard jobData={job} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#121212] rounded-2xl border border-zinc-800 shadow-sm">
          <p className="text-xl font-medium text-zinc-400">No jobs found</p>
          <p className="text-sm text-zinc-600 mt-1">Try modifying your filter selections or keywords.</p>
        </div>
      )}
    </>
  );
}