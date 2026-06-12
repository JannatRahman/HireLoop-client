'use server'

import { revalidatePath } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const serverFetch = async (path) => {
  const res = await fetch (`${baseUrl}${path}`)

  return res.json();
}



export const updateCompany = async (id, data) => {
 const res = await fetch(`${baseUrl}/api/companies/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    
    body: JSON.stringify( data)
  }
);
revalidatePath('/dashboard/admin/companies')


  return res.json();
}
export const createCompany = async (newCompanyData) => {
  const res = await fetch(`${baseUrl}/api/companies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCompanyData)
  });

  return res.json();
}