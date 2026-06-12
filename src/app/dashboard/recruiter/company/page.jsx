import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getRecruiterCompany } from '@/lib/actions/companies';
import { getUserSession } from '@/lib/api/core/session';


const CompanyPage =async () => {

  const user =await getUserSession();
  const company = await getRecruiterCompany(user?.id);
  console.log('company before create', company)

  return (
    <div>
      <CompanyProfile recruiter={user} recruiterCompany={company} />
    </div>
  );
};

export default CompanyPage;