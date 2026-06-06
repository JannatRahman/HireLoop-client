import React from 'react';
// Gravity UI Icons mapped exactly to your feature cards
import { 
  Magnifier, 
  ChartLine, 
  HandPointUp, 
  PersonWorker, // Fallback card element, or map to an id-badge variant
  BarsAscendingAlignCenter, 
  NutHex, 
  Bookmark, 
  ArrowUpRight 
} from '@gravity-ui/icons';

export default function FeaturesJob() {
  const features = [
    {
      title: 'Smart Search',
      description: 'Find your ideal job with advanced filters.',
      icon: <Magnifier className="w-5 h-5 text-zinc-300" />
    },
    {
      title: 'Salary Insights',
      description: 'Get real salary data to negotiate confidently.',
      icon: <ChartLine className="w-5 h-5 text-zinc-300" />
    },
    {
      title: 'Top Companies',
      description: 'Apply to vetted companies that are hiring.',
      icon: <BarsAscendingAlignCenter className="w-5 h-5 text-zinc-300" />
    },
    {
      title: 'Saved Jobs',
      description: 'Manage apps & favorites on your dashboard.',
      icon: <Bookmark className="w-5 h-5 text-zinc-300" />
    },
    {
      title: 'One-Click Apply',
      description: 'Simplify your job applications for an easier process!',
      icon: <HandPointUp className="w-5 h-5 text-zinc-300" />
    },
    {
      title: 'Resume Builder',
      description: 'Create professional resumes with modern templates.',
      icon: <PersonWorker className="w-5 h-5 text-zinc-300" />
    },
    {
      title: 'Skill-Based Matching',
      description: 'Discover jobs that match your skills and experience.',
      icon: <NutHex className="w-5 h-5 text-zinc-300" />
    },
    {
      title: 'Career Growth Resources',
      description: 'Boost your career with quick interview tips.',
      icon: <ArrowUpRight className="w-5 h-5 text-zinc-300" />
    }
  ];

  return (
    <div className="bg-[#0b0b0c] text-white py-24 px-4 min-h-screen flex flex-col items-center justify-center font-sans">
      
      {/* Header Badge & Title */}
      <div className="text-center max-w-2xl mb-20">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-4">
          <span className="w-1 h-1 bg-indigo-500 rounded-sm"></span>
          Features Job
          <span className="w-1 h-1 bg-indigo-500 rounded-sm"></span>
        </div>
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-100 leading-tight">
          Everything you need<br />to succeed
        </h2>
      </div>

      {/* Grid Container */}
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="flex items-start gap-4 p-2 transition-all duration-200 hover:translate-y-[-2px]"
          >
            {/* Dark Stylized Icon Box Wrapper */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800/80 flex items-center justify-center shrink-0 shadow-lg shadow-black/40">
              {feature.icon}
            </div>

            {/* Typography Context */}
            <div className="flex flex-col gap-1.5 pt-1">
              <h3 className="text-sm font-semibold tracking-wide text-zinc-200">
                {feature.title}
              </h3>
              <p className="text-xs md:text-[13px] text-zinc-500 font-normal leading-relaxed max-w-[190px]">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}