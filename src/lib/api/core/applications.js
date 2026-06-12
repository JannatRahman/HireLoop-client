'use server'

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
 export const submitApplication = async (applicationData) => {
  const res = await fetch(`${baseUrl}/api/applications`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(applicationData)
  });

  return res.json();
}