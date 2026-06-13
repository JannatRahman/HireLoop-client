import { getApplicationsByApplicant } from '@/lib/actions/application';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/api/core/session';
import Link from 'next/link';

// Import Gravity UI Icons
import { ShieldKeyhole, CircleInfo, ArrowUpRight, Lock } from '@gravity-ui/icons';
import { getPlanById } from '@/lib/api/plan';

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  
  const user = await getUserSession();

  if (!user) {
    redirect(`/auth/signin?callbackUrl=/jobs/${id}/apply`);
  }

  if (user.role !== 'seeker') {
    return (
      <div className="flex justify-center items-center min-h-[70vh] px-4">
        <div className="max-w-md text-center bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <ShieldKeyhole width={24} height={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Access Denied</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Only job seekers can apply for jobs. Please sign in with a candidate account to proceed.
          </p>
        </div>
      </div>
    );
  } 

  const applications = await getApplicationsByApplicant(user.id);
  
   const plan = await getPlanById(user?.plan || 'seeker_free')
  //  console.log('plan information', plan);
   

  const job = await getJobById(id);
  const hasRemainingApplications = applications.length < plan.maxApplicationsPerMonth;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Tracker Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full">
              {plan.name} Plan
            </span>
            <h2 className="text-lg font-semibold text-slate-200 mt-2">
              Monthly Usage: <span className="text-white font-bold">{applications.length}</span> / {plan.maxApplicationsPerMonth} applications
            </h2>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full sm:w-48 bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${!hasRemainingApplications ? 'bg-rose-500' : 'bg-indigo-500'}`}
              style={{ width: `${Math.min((applications.length / plan.maxApplicationsPerMonth) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Upgrade Prompt / Limit Reached */}
        {!hasRemainingApplications && (
          <div className="mt-5 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-3 items-start">
              <div className="text-rose-400 mt-0.5 shrink-0">
                <CircleInfo width={18} height={18} />
              </div>
              <p className="text-sm text-rose-300">
                You have reached your monthly application limit. Upgrade your plan to apply for more positions.
              </p>
            </div>
            <Link 
              href="/plan" 
              className="text-sm font-semibold bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5"
            >
              View Plans
              <ArrowUpRight width={14} height={14} />
            </Link>
          </div>
        )}
        
        {hasRemainingApplications && (
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-4 border-t border-slate-800/60 pt-3">
            <CircleInfo width={14} height={14} className="text-slate-500" />
            <span>
              Need more submissions?{' '}
              <Link href="/plan" className="text-indigo-400 hover:underline font-medium inline-flex items-center gap-0.5">
                Upgrade your tier <ArrowUpRight width={12} height={12} />
              </Link>
            </span>
          </div>
        )}
      </div>

      {/* Application Form Section */}
      {hasRemainingApplications ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
          <JobApply applicant={user} job={job} />
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900 border border-dashed border-slate-800 rounded-2xl px-4">
          <div className="w-10 h-10 bg-slate-800 text-slate-400 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Lock width={18} height={18} />
          </div>
          <p className="text-slate-400 font-medium text-sm">Application form locked until next month or tier upgrade.</p>
        </div>
      )}
    </div>
  );
};

export default ApplyPage;