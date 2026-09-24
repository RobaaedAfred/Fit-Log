"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useExercise } from "@/app/contex/ExerciseContext";
import { Iexer } from "@/app/types/eType";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ExerciseDetailPage = () => {
  const { exercises, selectedExercise, addToPlan, saveForLater } = useExercise();
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [fetchedExercise, setFetchedExercise] = useState<Iexer | null>(null);
  const [fetching, setFetching] = useState(true);
  const exercise: Iexer | null =
    exercises.find((item) => String(item.id) === params.id) ??
    fetchedExercise ??
    selectedExercise;

  useEffect(() => {
    const loadExercise = async () => {
      try {
        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${params.id}`,
        );
        if (!response.ok) throw new Error("Workout not found");
        setFetchedExercise(await response.json());
      } catch (error) {
        console.error("Workout detail fetch error:", error);
      } finally {
        setFetching(false);
      }
    };

    if (!exercises.some((item) => String(item.id) === params.id)) {
      void loadExercise();
    }
  }, [exercises, params.id]);

  if (!exercise && fetching) {
    return <main className="flex min-h-[60vh] items-center justify-center bg-[#0e1014] text-center text-gray-400">Loading workout...</main>;
  }

  if (!exercise) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#0e1014] text-center text-gray-400">
        <div>
          <p>Workout not found.</p>
          <button onClick={() => router.push("/#library")} className="mt-4 rounded-full bg-[#c2f800] px-5 py-3 text-sm font-bold text-black">Back to workouts</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0e1014] px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-xl border border-[#159bfa] bg-[#0f1116] lg:grid-cols-2">
          <div className="min-h-[360px] lg:min-h-[650px]">
            <Image src={exercise.image} alt={exercise.name} width={800} height={800} unoptimized className="h-full w-full object-cover" />
          </div>
          <div className="p-6 lg:p-10">
            <h1 className="text-3xl font-black uppercase text-white lg:text-5xl">{exercise.name}</h1>
            <p className="mt-4 leading-7 text-gray-400">{exercise.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">{exercise.muscleGroups.map((muscle) => <span key={muscle} className="rounded-full bg-[#c2f800] px-3 py-1 text-xs font-bold uppercase text-black">{muscle}</span>)}</div>
            <div className="mt-8 overflow-hidden rounded-xl border border-slate-800">
              {[
                ["Equipment", exercise.equipment],
                ["Difficulty", exercise.difficulty],
                ["Sets", String(exercise.sets)],
                ["Reps", exercise.reps],
                ["Duration", `${exercise.duration} min`],
                ["Calories", `${exercise.caloriesBurned} kcal`],
                ["Rating", `★ ${exercise.rating}`],
              ].map(([label, value], index) => <div key={label} className={`flex justify-between p-4 ${index < 6 ? "border-b border-slate-800" : ""}`}><span className="text-xs uppercase text-gray-500">{label}</span><span className="text-sm text-white">{value}</span></div>)}
            </div>
            <div className="mt-8">
              <h2 className="text-lg font-bold uppercase text-white">Instructions</h2>
              <ol className="mt-4 space-y-3">{exercise.instructions.map((instruction, index) => <li key={instruction} className="flex gap-3 text-sm leading-6 text-gray-400"><span className="font-bold text-[#c2f800]">{index + 1}.</span><span>{instruction}</span></li>)}</ol>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => addToPlan(exercise)} className="rounded-lg bg-[#c2f800] px-5 py-3 text-sm font-bold text-black"><FontAwesomeIcon icon={faCalendarDays} /> Add to today&apos;s plan</button>
              <button onClick={() => saveForLater(exercise)} className="rounded-lg border border-slate-700 px-5 py-3 text-sm text-white hover:border-[#c2f800]">♡ Save for later</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExerciseDetailPage;
