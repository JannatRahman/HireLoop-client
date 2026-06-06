'use client';

import ApplicationTable from '@/components/dashboard/ApplicationTable';
import DashboardStats from '@/components/dashboard/DashboardStats';
import TopCompaniesCard from '@/components/dashboard/TopCompaniesCard';
import { useSession } from '@/lib/auth-client';
import { File, Persons, Thunderbolt, CircleCheck } from '@gravity-ui/icons';

const RecruiterPage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400 text-sm">
        Loading...
      </div>
    );
  }

  const recruiterStats = [
    { id: 'total-posts', title: 'Total Job Posts', value: '48', icon: File },
    { id: 'total-applicants', title: 'Total Applicants', value: '1,284', icon: Persons },
    { id: 'active-jobs', title: 'Active Jobs', value: '18', icon: Thunderbolt },
    { id: 'jobs-closed', title: 'Jobs Closed', value: '32', icon: CircleCheck },
  ];

  const columns = [
    { name: "Candidate Name", uid: "name" },
    { name: "Role", uid: "role" },
    { name: "Date Applied", uid: "date" },
    { name: "Experience", uid: "experience" },
    { name: "Status", uid: "status" },
  ];

  const data = [
    {
      id: "1",
      name: "Julianne Moore",
      role: "Senior Product Designer",
      date: "Oct 24, 2023",
      experience: "6 years",
      status: "Interviewing",
    },
    {
      id: "2",
      name: "Robert Downey",
      role: "Backend Engineer",
      date: "Oct 23, 2023",
      experience: "4 years",
      status: "New",
    },
    {
      id: "3",
      name: "Emma Stone",
      role: "Marketing Lead",
      date: "Oct 22, 2023",
      experience: "8 years",
      status: "Reviewing",
    },
    {
      id: "4",
      name: "Chris Pratt",
      role: "Product Manager",
      date: "Oct 21, 2023",
      experience: "5 years",
      status: "Rejected",
    },
  ];

  const customCompaniesData = [
    {
      id: "c1",
      name: "Google Inc.",
      industry: "Technology",
      location: "Mountain View",
      activeJobs: 24,
      iconKey: "google"
    },
    {
      id: "c2",
      name: "Meta Platforms",
      industry: "Social Media",
      location: "Menlo Park",
      activeJobs: 18,
      iconKey: "meta"
    },
    {
      id: "c3",
      name: "Stripe",
      industry: "Fintech",
      location: "San Francisco",
      activeJobs: 12,
      iconKey: "stripe"
    },
    {
      id: "c4",
      name: "Tesla",
      industry: "Automotive",
      location: "Austin",
      activeJobs: 31,
      iconKey: "tesla"
    }
  ];
  
  const user = session?.user;

  console.log("session in RecruiterPage:", session);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      
      {/* Dynamic Header Section */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-zinc-100 py-2">
        Welcome Back, {user?.name || "Recruiter"}
      </h2>
      
      {/* Dashboard Stats Container */}
      <div className="w-full">
        <DashboardStats stats={recruiterStats} />
      </div>
      
      {/* Two-Column Core Layout Workspace */}
      <div className="flex flex-col xl:flex-row gap-6 items-start w-full">
        
        {/* Main Workspace Left Side: Takes full width on mobile/tablet, expands dynamically */}
        <div className="w-full xl:flex-1 min-w-0">
          <ApplicationTable columns={columns} data={data} />
        </div>
        
        {/* Right Sidebar: Custom width configuration across responsive tiers */}
        <div className="w-full xl:w-[400px] shrink-0">
          <TopCompaniesCard data={customCompaniesData} />
        </div>

      </div>

    </div>  
  );
};

export default RecruiterPage;