import JobContainer from "@/components/jobs/JobContainer";
import { getJobs } from "@/lib/api/jobs";


const JobCard = async () => {
  // Fetch data cleanly on the server side
  const jobs = await getJobs() || [];

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
            Explore Open Roles
          </h1>
          <p className="mt-2 text-lg text-zinc-400">
            Find your next career move from our curated list of opportunities.
          </p>
        </div>

        {/* Client Interactive Wrapper */}
        <JobContainer initialJobs={jobs} />
        
      </div>
    </div>
  );
};

export default JobCard;