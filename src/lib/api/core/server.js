'use server'

import { revalidatePath } from "next/cache";
import {  getUserToken } from "./session";
import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {};
  return header;
}

export const serverFetch = async (path) => {
  const res = await fetch (`${baseUrl}${path}`)

  return handleStatusCode(res);
}

export const protectedFetch = async (path) => {
  const res = await fetch (`${baseUrl}${path}`, 
    {
      headers: await authHeader()
    }
  )
  return handleStatusCode(res);
}

export const updateCompany = async (id, data) => {
 const res = await fetch(`${baseUrl}/api/companies/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ... await authHeader()
    },
    
    body: JSON.stringify( data)
  }
);
revalidatePath('/dashboard/admin/companies')

  return handleStatusCode(res);
}


export const createCompany = async (newCompanyData) => {
  const res = await fetch(`${baseUrl}/api/companies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...await authHeader()
    },
    body: JSON.stringify(newCompanyData)
  });



  return handleStatusCode(res);
}

const handleStatusCode = res => {
if(res.status === 401){
    redirect('/unauthorized')
  }
  else if(res.status === 403){
    redirect('/forbidden')
  }


  return res.json();
}