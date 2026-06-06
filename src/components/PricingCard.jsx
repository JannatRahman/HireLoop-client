'use client'
import React, { useState } from 'react';
// Import only the top-level Card, Button, and Chip from HeroUI
import { Card, Button, Chip } from '@heroui/react';
// Gravity UI Icons
import { Plus, ArrowRight } from '@gravity-ui/icons';

export default function PricingCard() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: '$0',
      icon: '👑',
      iconBg: 'bg-pink-950/40 text-pink-400',
      description: 'Start building your insights hub:',
      features: [
        'Daily AI match brief (top 5)',
        'Verified salary bands',
        'Company insight dashboards',
        '1-click apply, unlimited'
      ],
      isPopular: false
    },
    {
      name: 'Growth',
      price: '$17',
      icon: '📊',
      iconBg: 'bg-purple-950/40 text-purple-400',
      description: 'Start building your insights hub:',
      features: [
        'Daily AI match brief (top 5)',
        'Verified salary bands',
        'Company insight dashboards',
        '1-click apply, unlimited'
      ],
      isPopular: true // Highlighted center card
    },
    {
      name: 'Premium',
      price: '$99',
      icon: '⚡',
      iconBg: 'bg-zinc-800 text-zinc-300',
      description: 'Start building your insights hub:',
      features: [
        'Everything in Pro',
        'Multi-profile career portfolios',
        'Shared talent rooms',
        'Recruiter view (read-only)'
      ],
      isPopular: false
    }
  ];

  return (
    <div className="bg-black text-white py-20 px-4 min-h-screen flex flex-col items-center justify-center font-sans">
      
      {/* Top Header Section */}
      <div className="text-center max-w-xl mb-12">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-4">
          <span className="w-1 h-1 bg-indigo-500 rounded-sm"></span>
          Pricing
          <span className="w-1 h-1 bg-indigo-500 rounded-sm"></span>
        </div>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          Pay for the leverage,<br />not the listings
        </h2>
      </div>

      {/* Toggle Selector (Monthly / Yearly) */}
      <div className="bg-zinc-900/80 p-1 rounded-full border border-zinc-800 flex items-center gap-1 mb-16 shadow-inner">
        <button
          onClick={() => setIsYearly(false)}
          className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            !isYearly ? 'bg-white text-black shadow-md' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setIsYearly(true)}
          className={`px-5 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
            isYearly ? 'bg-white text-black shadow-md' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Yearly
          <Chip size="sm" className="bg-pink-600 text-white font-bold px-1.5 h-5 text-[10px]">
            25%
          </Chip>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full items-stretch">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`bg-zinc-950 border rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
              plan.isPopular 
                ? 'border-zinc-700 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 shadow-2xl scale-102 md:scale-105' 
                : 'border-zinc-900 shadow-xl'
            }`}
          >
            {/* Replacing CardHeader with a standard div */}
            <div className="flex items-center justify-between items-start pt-2 pb-4">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm border border-zinc-800 bg-zinc-900 ${plan.iconBg}`}>
                  {plan.icon}
                </div>
                <h3 className="text-xl font-medium text-zinc-100">{plan.name}</h3>
              </div>
              <div className="flex items-baseline text-white">
                <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
                <span className="text-zinc-500 text-xs ml-1">/month</span>
              </div>
            </div>

            {/* Replacing CardBody with a standard flex-grow div */}
            <div className="py-4 flex-grow">
              <p className="text-zinc-300 text-sm font-medium mb-5">{plan.description}</p>
              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
                    <div className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 shrink-0 mt-0.5">
                      <Plus width={12} height={12} strokeWidth={2.5} />
                    </div>
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Replacing CardFooter with a standard div */}
            <div className="pt-4 pb-2">
              <Button
                className={`w-full justify-between items-center py-6 px-5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  plan.isPopular
                    ? 'bg-white text-black hover:bg-zinc-200'
                    : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <span>Choose This Plan</span>
                <ArrowRight width={16} height={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}