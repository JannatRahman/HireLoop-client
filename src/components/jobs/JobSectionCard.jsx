import React from "react";
import { Card, Link } from "@heroui/react";
import { Briefcase, MapPin, CircleDollar, ArrowRight, ShieldCheck, Gift } from "@gravity-ui/icons";
import Image from "next/image";

export default function JobSectionCard({ jobData }) {
  const currencySymbol = jobData.currency === "USD" ? "$" : jobData.currency;

  return (
    <Card className="w-full h-full bg-[#121212] border border-zinc-800 text-zinc-100 p-6 rounded-[24px] shadow-xl flex flex-col justify-between transition-all duration-300 hover:border-zinc-700/80">
      
      <div>
        {/* Header Section */}
        <div className="flex flex-col items-start gap-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden p-1 flex items-center justify-center">
              <Image
                src={jobData.companyLogo} 
                alt={`${jobData.companyName} Logo`}
                width={28} 
                height={28}
                className="object-contain"
              />
            </div>
            <span className="text-sm font-medium text-zinc-400">{jobData.companyName}</span>
          </div>
          
          <h3 className="text-2xl font-semibold tracking-tight text-white mt-1 line-clamp-2">
            {jobData.title}
          </h3>
          
          <p className="text-zinc-400 text-sm leading-relaxed mt-1 line-clamp-3">
            {jobData.responsibilities}
          </p>
        </div>

        {/* Content Section */}
        <div className="py-4 flex flex-col gap-5">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 bg-zinc-800/60 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-pink-400" />
              <span>{jobData.location}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-zinc-800/60 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300">
              <Briefcase className="w-3.5 h-3.5 text-pink-400" />
              <span>{jobData.jobType}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-zinc-800/60 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300">
              <CircleDollar className="w-3.5 h-3.5 text-pink-400" />
              <span>
                {currencySymbol}{Number(jobData.minSalary).toLocaleString()} - {currencySymbol}{Number(jobData.maxSalary).toLocaleString()} / yr
              </span>
            </div>
          </div>

          <hr className="border-zinc-800/80" />

          {/* Requirements & Benefits Section */}
          <div className="flex flex-col gap-3.5">
            {/* Requirements */}
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 bg-zinc-800/80 p-1.5 rounded-lg text-pink-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Requirements</h4>
                <p className="text-zinc-300 text-sm mt-0.5 line-clamp-2">{jobData.requirements}</p>
              </div>
            </div>

            {/* Benefits */}
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 bg-zinc-800/80 p-1.5 rounded-lg text-pink-400 shrink-0">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Benefits</h4>
                <p className="text-zinc-300 text-sm mt-0.5 line-clamp-2">{jobData.benefits}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="pt-4 flex justify-start">
        <Link 
          href={`/jobs/${jobData._id?.$oid || jobData._id}`} 
          className="group inline-flex items-center gap-2 text-white font-medium hover:text-pink-400 transition-colors text-sm sm:text-base"
        >
          Apply Now 
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

    </Card>
  );
}