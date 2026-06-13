'use client';

import { useRouter } from 'next/navigation';
import { Shield, House, Envelope } from '@gravity-ui/icons';

export default function Forbidden() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-gray-900 via-slate-800 to-stone-900 px-4">
      
      {/* Decorative Subtle Background Orbs - Cautionary Tones */}
      <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-amber-500 opacity-10 blur-3xl" />
      <div className="absolute -right-16 -bottom-16 h-72 w-72 rounded-full bg-rose-500 opacity-10 blur-3xl" />

      {/* Main Card container */}
      <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
        
        {/* Animated Icon Container */}
        <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 via-orange-600 to-rose-600 shadow-xl shadow-orange-900/40">
          {/* Inner ring aura */}
          <div className="absolute inset-1 rounded-full border border-white/20 bg-gradient-to-tr from-white/10 to-transparent" />
          <Shield className="h-12 w-12 text-white drop-shadow" />
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          403 Forbidden
        </h1>

        {/* Description message */}
        <p className="mt-4 text-base leading-relaxed text-slate-300">
          Access Denied. You do not have the necessary permissions or the correct role privileges to view this resource.
        </p>
        <p className="mt-1 text-sm text-slate-400 font-medium">
          Think this is a mistake? Reach out to your administrator.
        </p>

        {/* Interactive Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <button
            onClick={() => router.push('/support')}
            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 hover:from-amber-400 hover:to-orange-500 active:scale-[0.98] transition-all"
          >
            <Envelope className="h-4 w-4" />
            Contact Support
          </button>

          <button
            onClick={() => router.push('/')}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 shadow-sm hover:bg-white/10 hover:text-white active:scale-[0.98] transition-all"
          >
            <House className="h-4 w-4 text-slate-400" />
            Return to Homepage
          </button>

        </div>
      </div>
     
    </div>
  );
}