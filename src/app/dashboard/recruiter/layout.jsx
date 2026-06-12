import { requiredRole } from "@/lib/api/core/session";


const RecruiterLayout =async ({children}) => {

  await requiredRole('recruiter')
  return children;
};

export default RecruiterLayout;