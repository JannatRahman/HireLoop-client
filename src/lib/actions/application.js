import { serverFetch } from "../api/core/server"

export const getApplicationsByApplicant= async (applicantId) => {
  return serverFetch(`/api/applications?applicantId=${applicantId}`);
} 