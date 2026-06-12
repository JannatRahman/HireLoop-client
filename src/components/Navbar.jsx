"use client";

import { useSession, signOut} from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { router } from "better-auth/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {data: session, isPending} = useSession()
  // console.log('session in Nav', session, isPending, 'Is Pending');
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut({
       fetchOptions: {
    onSuccess: () => {
      router.push("auth/signin"); 
    },
  },
    })
}
  const navLinks = [
    {
      label: "Browse Jobs",
      href: "/jobs",
    },
    {
      label: "Companies",
      href: "/companies",
    },
    {
      label: "Pricing",
      href: "/plan",
    },
  ];

  const dashboardLinks = {
    seeker: '/dashboard/seeker',
    recruiter: '/dashboard/recruiter',
    admin: '/dashboard/admin'
  }

  if(user?.email){
    navLinks.push(
      {
        label: 'Dashboard',
        href: dashboardLinks[user?.role || 'seeker']
      }
    )
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#0B0F19]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5">
          <header className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl font-black tracking-tight">
                <span className="text-blue-500">hire</span>
                <span className="text-orange-500">loop</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-10 lg:flex">
              <ul className="flex items-center gap-8">
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-slate-300 transition duration-200 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="h-5 w-px bg-white/10" />

              <div className="flex items-center gap-5">
               { 
                user ? 
                <>
               <p className="text-md text-slate-300"> Hi, {user.name}</p>
                <Button 
                onClick={handleSignOut}
                variant="ghost">SignOut</Button>
                </> 
                :
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-violet-400 hover:text-violet-300"
                >
                  Sign In
                </Link>}

                <Link
                  href="/auth/signup"
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </header>

          {/* Mobile Menu */}
          <div
            className={`overflow-hidden transition-all duration-300 lg:hidden ${
              isMenuOpen ? "max-h-96 pb-5" : "max-h-0"
            }`}
          >
            <div className="border-t border-white/10 pt-5">
              <ul className="space-y-4">
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-slate-300 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/auth/signin"
                  className="rounded-xl border border-white/10 px-4 py-3 text-center text-white"
                >
                  Sign In
                </Link>

                <Link
                  href="/auth/signup"
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-center font-medium text-white"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}