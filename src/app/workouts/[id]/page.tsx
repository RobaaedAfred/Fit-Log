"use client";

import { useExercise } from "@/app/contex/ExerciseContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ExerciseDetailPage = () => {
  const { selectedExercise } = useExercise();
  const router = useRouter();

  if (!selectedExercise) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0e1014]">
        <div className="text-center">
          <p className="mb-4 text-gray-400">
            Exercise not found.
          </p>

          <button
            onClick={() => router.push("/")}
            className="rounded-lg bg-[#c2f800] px-5 py-3 text-sm font-bold text-black"
          >
            Back to Library
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0e1014] px-4 py-8">
      <div className="mx-auto max-w-7xl">


        <button
          onClick={() => router.back()}
          className="mb-6 text-sm text-gray-400 transition hover:text-[#c2f800]"
        >
          ← Back to Library
        </button>

        <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#15171c]">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            <div className="h-[400px] lg:h-[650px]">
              <Image
                src={selectedExercise.image}
                alt={selectedExercise.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6 lg:p-10">


              <h1 className="text-3xl font-black uppercase text-white lg:text-5xl">
                {selectedExercise.name}
              </h1>

  
              <p className="mt-4 leading-7 text-gray-400">
                {selectedExercise.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {selectedExercise.muscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full bg-[#c2f800] px-3 py-1 text-xs font-bold uppercase text-black"
                  >
                    {muscle}
                  </span>
                ))}
              </div>


              <div className="mt-8 overflow-hidden rounded-xl border border-slate-800">

                <div className="flex justify-between border-b border-slate-800 p-4">
                  <span className="text-xs uppercase text-gray-500">
                    Equipment
                  </span>

                  <span className="text-sm text-white">
                    {selectedExercise.equipment}
                  </span>
                </div>

                <div className="flex justify-between border-b border-slate-800 p-4">
                  <span className="text-xs uppercase text-gray-500">
                    Difficulty
                  </span>

                  <span className="text-sm text-white">
                    {selectedExercise.difficulty}
                  </span>
                </div>

                <div className="flex justify-between border-b border-slate-800 p-4">
                  <span className="text-xs uppercase text-gray-500">
                    Sets
                  </span>

                  <span className="text-sm text-white">
                    {selectedExercise.sets}
                  </span>
                </div>

                <div className="flex justify-between border-b border-slate-800 p-4">
                  <span className="text-xs uppercase text-gray-500">
                    Reps
                  </span>

                  <span className="text-sm text-white">
                    {selectedExercise.reps}
                  </span>
                </div>

                <div className="flex justify-between border-b border-slate-800 p-4">
                  <span className="text-xs uppercase text-gray-500">
                    Duration
                  </span>

                  <span className="text-sm text-white">
                    {selectedExercise.duration} min
                  </span>
                </div>

                <div className="flex justify-between border-b border-slate-800 p-4">
                  <span className="text-xs uppercase text-gray-500">
                    Calories
                  </span>

                  <span className="text-sm text-white">
                    {selectedExercise.caloriesBurned} kcal
                  </span>
                </div>

                <div className="flex justify-between p-4">
                  <span className="text-xs uppercase text-gray-500">
                    Rating
                  </span>

                  <span className="text-sm text-white">
                    ★ {selectedExercise.rating}
                  </span>
                </div>

              </div>

              <div className="mt-8">
                <h2 className="text-lg font-bold uppercase text-white">
                  Instructions
                </h2>

                <ol className="mt-4 space-y-3">
                  {selectedExercise.instructions.map(
                    (instruction, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm leading-6 text-gray-400"
                      >
                        <span className="font-bold text-[#c2f800]">
                          {index + 1}.
                        </span>

                        <span>{instruction}</span>
                      </li>
                    )
                  )}
                </ol>
              </div>

              <div className="mt-8 flex gap-3">
                <button className="rounded-lg bg-[#c2f800] px-5 py-3 text-sm font-bold text-black">
                  Add to todays plan
                </button>

                <button className="rounded-lg border border-slate-700 px-5 py-3 text-sm text-white">
                  ♡ Save for later
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExerciseDetailPage;