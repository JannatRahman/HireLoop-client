import React from 'react';
import PostJobForm from './PostJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/actions/companies';

const PostJobPage =async () => {
  const company = await getLoggedInRecruiterCompany();
  return (
    <div>
      <PostJobForm company={company}  />
    </div>
  );
};

export default PostJobPage;