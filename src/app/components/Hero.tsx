import Image from "next/image";
import React from "react";
import banner from "@/assets/banner.png";

const Hero = () => {
  return (
    <section className="mx-auto container w-full px-6 py-12">
      <div className="flex min-h-[478px] items-center justify-between overflow-hidden rounded-2xl border border-[#292C34] bg-[#15171D] px-16 py-10">
        
        <div className="max-w-[650px]">
          <p className="mb-7 text-sm font-bold tracking-widest text-[#C2F800]">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            TRAIN WITH INTENT. LOG<br />
            EVERY SET.
          </h1>

          <p className="mt-6 max-w-[620px] text-lg leading-8 text-[#969BA7]">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <button
            type="button"
            className="mt-7 rounded-md bg-[#C2F800] px-7 py-3.5 text-sm font-bold uppercase text-black transition hover:bg-[#d0ff33]"
          >
            Browse Workouts
          </button>
        </div>

        <div className="relative hidden h-[360px] w-[360px] shrink-0 lg:block">
          <Image
            src={banner}
            alt="Workout illustration"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;