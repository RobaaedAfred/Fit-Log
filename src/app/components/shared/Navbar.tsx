import Link from 'next/link';
import Image from 'next/image';
import Hamburger from '@/app/components/Button/hamburger';
import logo from '@/assets/logo.png';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950">
      <div className="container relative mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} width={42} height={42} alt="FITLOG Logo" />
          <span className="text-xl font-bold tracking-wide text-white">FITLOG</span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
          <Link href="/workouts" className="font-medium text-gray-300 hover:text-white">
            Workouts
          </Link>
          <Link href="/my-plan" className="font-medium text-gray-300 hover:text-white">
            My Plan
          </Link>
        </div>

        <div className="ml-auto hidden items-center gap-8 md:flex">
          <Link href="/plan" className="font-medium text-gray-300 hover:text-white">
            Plan
          </Link>
          <Link href="/saved" className="font-medium text-gray-300 hover:text-white">
            Saved
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