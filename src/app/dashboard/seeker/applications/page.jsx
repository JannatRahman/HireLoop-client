import { Table, Chip, Button } from '@heroui/react';
import { getApplicationsByApplicant } from '@/lib/actions/application';
import { getUserSession } from '@/lib/api/core/session';
import { Briefcase, Code, Pencil, Database, Cloud, Smartphone } from '@gravity-ui/icons';

// Helper function to calculate relative time (e.g., "2 hours ago", "1 day ago")
const getRelativeTime = (dateString) => {
  const now = new Date();
  const appliedDate = new Date(dateString);
  const diffInMs = now - appliedDate;

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  if (diffInDays < 7) return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
};

// Helper function to pick the correct icon based on the job title
const getJobIcon = (title = '') => {
  const lowercaseTitle = title.toLowerCase();
  if (lowercaseTitle.includes('frontend') || lowercaseTitle.includes('software') || lowercaseTitle.includes('web')) {
    return <Code className="text-zinc-400" size={18} />;
  }
  if (lowercaseTitle.includes('design')) {
    return <Pencil className="text-zinc-400" size={18} />;
  }
  if (lowercaseTitle.includes('data') || lowercaseTitle.includes('analyst')) {
    return <Database className="text-zinc-400" size={18} />;
  }
  if (lowercaseTitle.includes('cloud') || lowercaseTitle.includes('devops')) {
    return <Cloud className="text-zinc-400" size={18} />;
  }
  if (lowercaseTitle.includes('ai') || lowercaseTitle.includes('ml')) {
    return <Smartphone className="text-zinc-400" size={18} />;
  }
  return <Briefcase className="text-zinc-400" size={18} />;
};

// Helper function to handle status styles matching your screenshot colors
const getStatusStyles = (status = 'Applied') => {
  const currentStatus = status.toLowerCase();
  switch (currentStatus) {
    case 'applied':
      return { variant: 'bordered', className: 'border-zinc-500 text-zinc-300' };
    case 'review':
      return { variant: 'bordered', className: 'border-amber-500 text-amber-500' };
    case 'shortlisted':
      return { variant: 'bordered', className: 'border-emerald-500 text-emerald-500' };
    case 'rejected':
      return { variant: 'bordered', className: 'border-rose-500 text-rose-500' };
    case 'offered':
      return { variant: 'bordered', className: 'border-zinc-400 text-zinc-100 bg-zinc-800' };
    default:
      return { variant: 'bordered', className: 'border-zinc-500 text-zinc-300' };
  }
};

const SeekerApplicationPage = async () => {
  const user = await getUserSession();
  const jobs = await getApplicationsByApplicant(user.id);

  return (
    <div className="w-full min-h-screen bg-[#121212] text-zinc-100 p-8">
      <div className="max-w-6xl mx-auto border border-zinc-800 rounded-xl bg-[#18181b] overflow-hidden shadow-2xl">
        <Table className="w-full text-left border-collapse bg-transparent p-0">
          <Table.ScrollContainer>
            <Table.Content aria-label="Job Applications Table">
              <Table.Header>
                <Table.Column className="bg-transparent border-b border-zinc-800 text-zinc-400 font-medium py-4 px-6 text-sm">Job Title</Table.Column>
                <Table.Column className="bg-transparent border-b border-zinc-800 text-zinc-400 font-medium py-4 px-6 text-sm">Company</Table.Column>
                <Table.Column className="bg-transparent border-b border-zinc-800 text-zinc-400 font-medium py-4 px-6 text-sm">Applied</Table.Column>
                <Table.Column className="bg-transparent border-b border-zinc-800 text-zinc-400 font-medium py-4 px-6 text-sm">Status</Table.Column>
                <Table.Column className="bg-transparent border-b border-zinc-800 text-zinc-400 font-medium py-4 px-6 text-sm text-right">Action</Table.Column>
              </Table.Header>

              <Table.Body>
                {jobs.map((job) => {
                  const statusConfig = getStatusStyles(job.status || 'Applied');
                  const workplaceType = job.workplaceType || 'Full-time • Remote';

                  return (
                    <Table.Row key={job._id.$oid} className="border-b border-zinc-800/50 hover:bg-zinc-900/40 transition-colors">
                      {/* Job Title Cell */}
                      <Table.Cell className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 bg-zinc-800/60 rounded-lg border border-zinc-700/50 flex items-center justify-center">
                            {getJobIcon(job.title)}
                          </div>
                          <div>
                            <div className="font-semibold text-zinc-100 text-[15px]">{job.title}</div>
                            <div className="text-zinc-500 text-xs mt-0.5">{workplaceType}</div>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* Company Cell */}
                      <Table.Cell className="py-4 px-6 text-[15px] text-zinc-300">
                        {job.CompanyPage}
                      </Table.Cell>

                      {/* Applied Time Cell */}
                      <Table.Cell className="py-4 px-6 text-[15px] text-zinc-400">
                        {getRelativeTime(job.createdAt)}
                      </Table.Cell>

                      {/* Status Cell */}
                      <Table.Cell className="py-4 px-6">
                        <Chip
                          variant={statusConfig.variant}
                          className={`px-3 py-1 text-xs font-semibold rounded-full tracking-wide ${statusConfig.className}`}
                        >
                          {job.status || 'Applied'}
                        </Chip>
                      </Table.Cell>

                      {/* Action Cell */}
                      <Table.Cell className="py-4 px-6 text-right">
                        <Button
                          variant="light"
                          className="text-zinc-400 hover:text-zinc-100 text-sm font-medium transition-colors"
                          size="sm"
                        >
                          Details
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
};

export default SeekerApplicationPage;