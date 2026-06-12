import { requiredRole } from '@/lib/api/core/session';
import React from 'react';

const SeekerLayout =async ({children}) => {
  await requiredRole('seeker')
  return children;
};

export default SeekerLayout;