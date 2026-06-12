'use client';

import { useRouter } from 'next/navigation';
import { Lock, House, ArrowRight } from '@gravity-ui/icons';

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-gray-700 via-purple-500 to-gray-800px-4">
      
      {/* Decorative Subtle Background Orbs */}
      <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-blue-400 opacity-20 blur-3xl" />
      <div className="absolute -right-16 -bottom-16 h-72 w-72 rounded-full bg-pink-400 opacity-20 blur-3xl" />

      {/* Main Card container */}
      <div className="relative w-full max-w-lg rounded-3xl border border-white/40 bg-white/70 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
        
        {/* Animated Icon Container */}
        <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 shadow-xl shadow-blue-500/20">
          {/* Inner ring aura */}
          <div className="absolute inset-1 rounded-full border border-white/20 bg-gradient-to-tr from-white/10 to-transparent" />
          <Lock className="h-12 w-12 text-white drop-shadow" />
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          401 Unauthorized
        </h1>

        {/* Description message */}
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Access to this content is restricted. You may have an invalid session or insufficient profile permissions.
        </p>
        <p className="mt-1 text-sm text-slate-400 font-medium">
          Let&apos;s get you back on track.
        </p>

        {/* Interactive Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <button
            onClick={() => router.push('/auth/signin')}
            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] transition-all"
          >
            Sign In to Continue
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>

          <button
            onClick={() => router.push('/')}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] transition-all"
          >
            <House className="h-4 w-4 text-slate-500" />
            Return to Homepage
          </button>

        </div>
      </div>

      {/* Footer Branding Attributions */}
     
    </div>
  );
}