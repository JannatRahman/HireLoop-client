import { protectedFetch, serverFetch } from "../api/core/server";
import { getUserSession } from "../api/core/session";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getCompanies = async () => {
  return protectedFetch (`/api/companies`);
}

export const getRecruiterCompany = async (recruiterId) => {
  return serverFetch (`/api/my/companies?recruiterId=${recruiterId}`);
}

export const getLoggedInRecruiterCompany = async () => {
  const user = await getUserSession();
  return getRecruiterCompany(user?.id);
}