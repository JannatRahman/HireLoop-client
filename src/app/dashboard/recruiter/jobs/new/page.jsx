import React from 'react';
import PostJobForm from './PostJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/actions/companies';

const PostJobPage =async () => {
  const company = await getLoggedInRecruiterCompany();
  // console.log("Company Data in PostJobPage:", company);
  return (
    <div>
      <PostJobForm company={company}  />
    </div>
  );
};

export default PostJobPage;