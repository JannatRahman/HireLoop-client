'use server'

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const serverFetch = async (path) => {
  const res = await fetch (`${baseUrl}${path}`)

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