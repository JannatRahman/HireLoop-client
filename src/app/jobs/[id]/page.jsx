
import React from 'react';
import Link from 'next/link';
// import ApplyButton from '@/components/ApplyButton'; // Adjust this import path based on your folder structure
import Image from 'next/image';
import { Button } from '@heroui/react';
import { getJobById } from '@/lib/api/jobs';

const JobDetailPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">Job not found.</p>
      </div>
    );
  }

  // Format the deadline date beautifully using standard JavaScript
  const formattedDeadline = new Date(job.deadline).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Extract string ID seamlessly whether it is a string or an object from MongoDB ($oid)
  const jobIdString = job._id?.$oid || job._id;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 bg-gray-900 my-5 rounded-lg">
      {/* Back Link */}
      <Link href="/jobs" className="text-white hover:underline mb-6 inline-block text-md font-medium">
        &larr; Back to All Jobs
      </Link>

      {/* Header Info Banner */}
      <div className="flex flex-col md:flex-row md:items-center  justify-between border-b border-gray-200 pb-8 mb-8 gap-4">
        <div className="flex items-start gap-4">
          {job.companyLogo && (
            <Image
            width={30}
            height={30} 
              src={job.companyLogo} 
              alt={`${job.companyName} logo`} 
              className="w-16 h-16 object-contain rounded-lg border p-2 bg-white"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-lg text-white font-medium">{job.companyName}</p>
            
            {/* Meta Tags / Badges */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                {job.jobType}
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                {job.location} {job.isRemote && '(Remote)'}
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                {job.category}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Client Side Interactive Button */}
        
      </div>

      {/* Layout Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: Dynamic Text Content */}
        <div className="md:col-span-2 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-white mb-2">Job Description & Responsibilities</h2>
            <p className="text-white leading-relaxed whitespace-pre-line">{job.responsibilities}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">Requirements</h2>
            <p className="text-white leading-relaxed whitespace-pre-line">{job.requirements}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">Benefits</h2>
            <p className="text-white leading-relaxed whitespace-pre-line">{job.benefits}</p>
          </section>
        </div>

        {/* Right Side: Quick Sidebar Metadata Cards */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 h-fit space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Job Overview</h3>
          
          <div>
            <p className="text-sm text-gray-500">Salary Range</p>
            <p className="font-semibold text-gray-800">
              {Number(job.minSalary).toLocaleString()} - {Number(job.maxSalary).toLocaleString()} {job.currency} / year
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Application Deadline</p>
            <p className="font-semibold text-red-600">{formattedDeadline}</p>
          </div>
          <div>
          <Link
          href={`/jobs/${id}/apply`}
          className={'w-full  text-white font-semibold bg-blue-600 hover:bg-blue-800 py-2 px-4 rounded-md  shadow-md transition-colors flex  items-center justify-center'}>Apply For This Job</Link>
          {/* <ApplyButton jobId={jobIdString} jobTitle={job.title} /> */}
        </div>
        </div>

      </div>
    </main>
  );
};

export default JobDetailPage;