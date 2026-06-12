import { redirect } from 'next/navigation'
import Link from 'next/link'
import { stripe } from '@/lib/stripe'
import { createSubscription } from '@/lib/actions/subscriptions'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  // FIX: Destructure metadata from the session object here
  const { status, customer_details, metadata } = session
  const customerEmail = customer_details?.email

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    const subsInfo = {
      email: customerEmail,
      planId: metadata?.planId 
    }

    const result = await createSubscription(subsInfo);
    console.log(result)
    
    return (
      <main className="min-h-screen bg-gray-1000 flex items-center justify-center p-4 antialiased">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-xl shadow-gray-700 p-8 border border-gray-600 text-center relative overflow-hidden">
          
          {/* Success Icon Animation Wrapper */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 mb-6">
            <svg
              className="h-8 w-8 text-emerald-500 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Thank you!
          </h1>
          <p className="text-slate-100 text-base mb-8">
            Your payment was processed successfully.
          </p>

          <div className="bg-gray-700 rounded-xl p-5 text-left border border-gray-600 mb-8">
            <h2 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Order Details
            </h2>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex justify-between text-white">
                <span>Sent to:</span>
                <span className="font-medium text-white break-all max-w-[200px]">
                  {customerEmail}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2 mt-2">
                <span className='text-white'>Status:</span>
                <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                  Paid
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 mb-8 leading-relaxed">
            A confirmation email is on its way. Questions? Reach out at{' '}
            <a 
              href="mailto:orders@example.com" 
              className="text-indigo-600 hover:text-indigo-500 font-medium underline underline-offset-2 transition-colors"
            >
              orders@example.com
            </a>
          </p>

          <Link
            href="/plan"
            className="inline-flex w-full justify-center items-center rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-all duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }
}