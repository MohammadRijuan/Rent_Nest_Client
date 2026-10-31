import Link from "next/link";
import BrandMark from "@/components/shared/brandMark";
import { ShieldCheck, Mail, Lock } from "lucide-react";

const AuthGroupLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="auth-page min-h-screen bg-[#f3f0e7] px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
      <div className="mx-auto grid min-h-[min(760px,calc(100vh-6rem))] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-[#e2ded3] bg-[#fbfaf6] shadow-[0_30px_90px_-55px_rgba(32,43,35,0.5)] lg:grid-cols-[0.95fr_1.05fr]">

        {/* Mobile Brand */}
        <Link href="/" className="px-6 pt-6 lg:hidden">
          <BrandMark />
        </Link>

        {/* Left Panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#2f5039] p-10 text-[#f3f0e7] lg:flex xl:p-14">
          <div className="absolute -right-36 top-1/4 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute -right-20 top-[30%] h-64 w-64 rounded-full border border-white/10" />

          <Link href="/" className="relative inline-flex items-center">
            <BrandMark inverse />
          </Link>

          <div className="relative max-w-md">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#d3b39b]">
              A place to begin
            </p>

            <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-[-0.04em] xl:text-6xl">
              Good to have you here.
            </h1>

            <p className="mt-6 max-w-sm leading-7 text-[#d3ddd2]">
              Sign in to pick up where you left off, keep your plans together,
              and make your next move feel a little simpler.
            </p>
          </div>

          {/* Admin Credentials */}
          <div className="relative rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck size={19} className="text-[#d3b39b]" />
              <h3 className="text-sm font-semibold tracking-wide">
                Admin Demo Credentials
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <p className="mb-1 text-xs text-[#c5d0c4]">Email Address</p>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Mail size={15} className="text-[#d3b39b]" />
                  admin@gmail.com
                </div>
              </div>

              <div>
                <p className="mb-1 text-xs text-[#c5d0c4]">Password</p>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Lock size={15} className="text-[#d3b39b]" />
                  123456
                </div>
              </div>
            </div>

            <p className="mt-4 border-t border-white/10 pt-3 text-[11px] text-[#c5d0c4]">
              Use these credentials to explore the admin dashboard.
            </p>
          </div>

          <p className="relative text-xs uppercase tracking-[0.16em] text-[#c5d0c4]">
            Find your place, at your pace.
          </p>
        </section>

        {/* Right Panel */}
        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14 lg:py-16">
          {children}
        </section>
      </div>
    </main>
  );
};

export default AuthGroupLayout;