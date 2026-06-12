'use server'

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
 export const createSubscription = async (subInfo) => {
  const res = await fetch(`${baseUrl}/api/subscriptions`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subInfo)
  });

  return res.json();
}