import Image from "next/image";
import { Oswald } from "next/font/google";
import banner from "@/assets/banner.png";
import Link from "next/link";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Hero = () => {
  return (
    <section className="container mx-auto w-full px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col-reverse items-center justify-between gap-8 overflow-hidden rounded-2xl border border-[#292C34] bg-[#15171D] px-6 py-8 lg:flex-row lg:gap-0 lg:px-16 lg:py-10">

        <div className="w-full max-w-[650px]">
          <p className="mb-5 text-sm font-bold tracking-widest text-[#C2F800] md:mb-7">
            WORKOUT LIBRARY
          </p>

          <h1
            className={`${oswald.className} text-[48px] font-bold uppercase leading-[0.95] tracking-tight text-white md:text-[60px] lg:text-[68px]`}
          >
            TRAIN WITH INTENT. LOG
            <br />
            EVERY SET.
          </h1>

          <p className="mt-6 max-w-[620px] text-base leading-7 text-[#969BA7] md:text-lg md:leading-8">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="mt-7 rounded-md bg-[#C2F800] px-7 py-3.5 text-sm font-bold uppercase text-black transition hover:bg-[#d0ff33]"
          >
            Browse Workouts
          </Link>
        </div>
        <div className="shrink-0">
          <Image
            src={banner}
            height={334}
            width={334}
            alt="Workout illustration"
            className="h-auto w-[220px] object-contain sm:w-[260px] md:w-[300px] lg:w-[334px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;