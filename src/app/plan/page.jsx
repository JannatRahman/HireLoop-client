'use client';

import React, { useState } from 'react';
// Import relevant Gravity UI Icons
import { CircleCheck, ChevronDown, Person, Briefcase } from '@gravity-ui/icons';
import Link from 'next/link';

const PricingPage = () => {
  const [userType, setUserType] = useState('seeker');
  const [openFaq, setOpenFaq] = useState(null);

  const seekerPlans = [
    {
      name: 'Free',
      id: 'seeker_free',
      price: '$0',
      sub: '/forever',
      features: ['Browse & save up to 10 jobs', 'Apply to up to 3 jobs per month', 'Basic profile setup', 'Email alerts']
    },
    {
      name: 'Pro',
       id: 'seeker_pro',
      price: '$19',
      sub: '/month',
      popular: true,
      features: ['Apply to up to 30 jobs per month', 'Unlimited saved jobs', 'Application tracking system', 'Salary insights']
    },
    {
      name: 'Premium',
       id: 'seeker_premium',
      price: '$39',
      sub: '/month',
      features: ['Everything in Pro', 'Unlimited applications', 'Profile boost to recruiters', 'Early access to new jobs', 'Priority support']
    }
  ];

  const recruiterPlans = [
    {
      name: 'Free',
      id:'recruiter_free',
      price: '$0',
      sub: '/forever',
      features: ['Up to 3 active job posts', 'Basic applicant management', 'Standard listing visibility', "Great for a company's first year"]
    },
    {
      name: 'Growth',
       id:'recruiter_growth',
      price: '$49',
      sub: '/month',
      popular: true,
      features: ['Up to 10 active job posts', 'Applicant tracking system', 'Basic performance analytics', 'Dedicated email support']
    },
    {
      name: 'Enterprise',
       id:'recruiter_enterprise',
      price: '$149',
      sub: '/month',
      features: ['Up to 50 active job posts', 'Advanced analytics dashboard', 'Featured job listings tier', 'Team collaboration tools', 'Custom employer branding', 'Priority support line']
    }
  ];

  const faqs = [
    {
      q: 'Can I cancel my subscription at any time?',
      a: 'Yes, absolutely. You can cancel your paid subscription plan from your account settings menu at any time. You will retain access to your plan benefits until the end of your current billing cycle.'
    },
    {
      q: 'What is your refund policy?',
      a: 'We offer a 14-day window for refunds if you are unsatisfied with your premium tier. Please reach out to our priority support team, and we will gladly review your account.'
    },
    {
      q: 'Which payment methods do you accept?',
      a: 'We securely process all transactions through Stripe. We accept all major credit/debit cards (Visa, Mastercard, American Express), Apple Pay, and Google Pay.'
    },
    {
      q: 'How does switching plans work?',
      a: 'You can upgrade or downgrade your plan instantly. When upgrading, your new features unlock immediately and charges are prorated. Downgrades take effect starting the next billing cycle.'
    }
  ];

  const activePlans = userType === 'seeker' ? seekerPlans : recruiterPlans;

  return (
    <div className="bg-slate-950 text-white min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-slate-400 text-lg">
            Choose the perfect plan tailored to accelerate your job hunt or streamline your hiring process.
          </p>
        </div>

        {/* User Type Toggle Component */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-xl flex gap-2 shadow-inner">
            <button
              onClick={() => setUserType('seeker')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${userType === 'seeker'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              <Person width={16} height={16} />
              For Job Seekers
            </button>
            <button
              onClick={() => setUserType('recruiter')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${userType === 'recruiter'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              <Briefcase width={16} height={16} />
              For Recruiters
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 items-start">
          {activePlans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-8 bg-slate-900 border transition-all duration-300 hover:-translate-y-1 ${plan.popular
                ? 'border-indigo-500 shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-500'
                : 'border-slate-800 shadow-sm'
                }`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-6 -translate-y-1/2 bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-100 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-4xl font-extrabold text-white tracking-tight">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.sub}</span>
                </div>
              </div>

              

              {/* Features List */}
              <ul className="space-y-4 border-t border-slate-800/60 pt-6">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-300">
                    <CircleCheck width={16} height={16} className="text-indigo-400 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className='mt-3'>
                <form action="/api/checkout_sessions" method="POST">
                <input type='hidden' name='plan_id' value={plan.id}/>
                  <section>
                    <button type="submit" role="link"
                      className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all mb-8 ${plan.popular
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                    >
                      Checkout
                    </button>
                  </section>
                </form>
                
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto border-t border-slate-800/80 pt-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-slate-100">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-medium text-slate-200 hover:text-white transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      width={16}
                      height={16}
                      className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-200 ease-in-out ${isOpen ? 'max-h-40 border-t border-slate-800/50 p-5' : 'max-h-0 overflow-hidden'
                      }`}
                  >
                    <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PricingPage;