"use client";

import Link from "next/link";
import {
  LogoFacebook,
  LogoGithub,
  LogoLinkedin,
} from "@gravity-ui/icons";


export default function Footer() {
  return (
    <footer className="bg-[#050816] text-slate-400">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Logo Section */}
          <div className="space-y-6">
            <Link href="/">
              <h2 className="text-4xl font-black tracking-tight">
                <span className="text-blue-500">hire</span>
                <span className="text-orange-500">loop</span>
              </h2>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-slate-500">
              The AI-native career platform. Built for people who take
              their work seriously.
            </p>

            <div className="flex items-center gap-3 pt-8">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 transition-all hover:bg-blue-600 hover:text-white"
              >
                <LogoFacebook className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 transition-all hover:bg-pink-600 hover:text-white"
              >
                <LogoGithub className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 transition-all hover:bg-sky-600 hover:text-white"
              >
                <LogoLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-violet-400">
              Product
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/jobs"
                  className="transition hover:text-white"
                >
                  Job Discovery
                </Link>
              </li>

              <li>
                <Link
                  href="/ai-matching"
                  className="transition hover:text-white"
                >
                  Worker AI
                </Link>
              </li>

              <li>
                <Link
                  href="/companies"
                  className="transition hover:text-white"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  href="/salary"
                  className="transition hover:text-white"
                >
                  Salary Data
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-violet-400">
              Navigations
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/help-center"
                  className="transition hover:text-white"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  href="/career-library"
                  className="transition hover:text-white"
                >
                  Career Library
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-violet-400">
              Resources
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/brand-guidelines"
                  className="transition hover:text-white"
                >
                  Brand Guideline
                </Link>
              </li>

              <li>
                <Link
                  href="/newsroom"
                  className="transition hover:text-white"
                >
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row">
          <p>
            Copyright {new Date().getFullYear()} — HireLoop
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms & Policy
            </Link>

            <Link
              href="/privacy"
              className="transition hover:text-white"
            >
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}