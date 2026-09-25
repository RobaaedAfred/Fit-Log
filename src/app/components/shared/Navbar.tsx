"use client";

import Link from 'next/link';
import Image from 'next/image';
import Hamburger from '@/app/components/Button/hamburger';
import logo from '@/assets/logo.png';
import { useExercise } from '@/app/contex/ExerciseContext';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { plan, saved } = useExercise();
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950">
      <div className="container relative mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} width={42} height={42} alt="FITLOG Logo" />
          <span className="text-xl font-bold tracking-wide text-white">FITLOG</span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">

          <Link
            href="/#library"
            className={`rounded-full px-4 py-2 font-medium transition-all duration-300 ${
              pathname === '/'
                ? 'bg-[#172600] text-[#c2f800]'
                : 'text-gray-300 hover:bg-[#172600] hover:text-[#c2f800]'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 font-medium transition-all duration-300 ${
              pathname === '/my-plan'
                ? 'bg-[#172600] text-[#c2f800]'
                : 'text-gray-300 hover:bg-[#172600] hover:text-[#c2f800]'
            }`}
          >
            My Plan
          </Link>

        </div>

        <div className="ml-auto hidden items-center gap-8 md:flex">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 font-medium text-gray-300 hover:text-white"
          >
            Plan{' '}
            <span className="rounded-full bg-[#c2f800] px-2 py-0.5 text-xs font-bold text-black">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 font-medium text-gray-300 hover:text-white"
          >
            Saved{' '}
            <span className="rounded-full border border-gray-600 px-2 py-0.5 text-xs">
              {saved.length}
            </span>
          </Link>
        </div>

        <div className="ml-auto md:hidden">
          <Hamburger />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;