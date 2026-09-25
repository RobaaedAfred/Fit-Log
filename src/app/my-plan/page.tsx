"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { useExercise } from "@/app/contex/ExerciseContext";

import { Iexer } from "@/app/types/eType";

const WorkoutRow = ({ exercise, saved, onRemove, onDone }: { exercise: Iexer; saved: boolean; onRemove: () => void; onDone: () => void }) => (
  <article className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-[#15171c] p-3 sm:flex-row sm:items-center">
    <Image src={exercise.image} alt={exercise.name} width={120} height={80} unoptimized className="h-20 w-full rounded-lg object-cover sm:w-28" />
    <div className="min-w-0 flex-1">
      <h2 className="font-extrabold uppercase text-white">{exercise.name}</h2>
      <p className="text-xs text-gray-500">{exercise.equipment}</p>
      <div className="mt-2 flex gap-3 text-xs text-gray-400"><span>◷ {exercise.duration} min</span><span>● {exercise.caloriesBurned} kcal</span><span>☆ {exercise.rating}</span></div>
    </div>
    <div className="flex items-center gap-2">
      <Link href={`/workouts/${exercise.id}`} className="rounded-full border border-slate-700 px-4 py-2 text-xs text-white">View Details</Link>
      {!saved && <button onClick={onDone} className="rounded-full bg-[#c2f800] px-4 py-2 text-xs font-bold text-black">✓ Mark as Done</button>}
      <button aria-label={`Remove ${exercise.name}`} onClick={onRemove} className="px-2 text-gray-500 hover:text-red-400">×</button>
    </div>
  </article>
);

const PlanContent = () => {
  const { plan, saved, removeFromPlan, removeFromSaved, markAsDone } = useExercise();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<"plan" | "saved">(searchParams.get("tab") === "saved" ? "saved" : "plan");
  const [sort, setSort] = useState("duration");
  const activeItems = tab === "plan" ? plan : saved;
  const items = useMemo(() => [...activeItems].sort((a, b) => sort === "calories" ? b.caloriesBurned - a.caloriesBurned : sort === "rating" ? b.rating - a.rating : a.duration - b.duration), [activeItems, sort]);
  const minutes = plan.reduce((total, item) => total + item.duration, 0);
  const calories = plan.reduce((total, item) => total + item.caloriesBurned, 0);
  
  return (
    <main className="min-h-[calc(100vh-128px)] bg-[#0e1014] px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-black uppercase text-white">My Plan</h1>
        <p className="mt-1 text-sm text-gray-500">Cap of five lifts for today. Finish them, then load more.</p>
        <div className="mt-6 grid rounded-xl border border-slate-800 bg-[#15171c] sm:grid-cols-3">
          {[["Exercises", plan.length], ["Minutes", minutes], ["Calories", calories]].map(([label, value]) => <div key={label} className="border-b border-slate-800 p-5 last:border-0 sm:border-b-0 sm:border-r sm:last:border-0"><p className="text-xs text-gray-500">{label}</p><p className="mt-1 text-3xl font-black text-[#c2f800]">{value}</p></div>)}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex rounded-lg border border-slate-800 bg-[#15171c] p-1"><button onClick={() => setTab("plan")} className={`rounded-md px-4 py-2 text-xs ${tab === "plan" ? "bg-[#242832] text-white" : "text-gray-500"}`}>Today&apos;s Plan</button><button onClick={() => setTab("saved")} className={`rounded-md px-4 py-2 text-xs ${tab === "saved" ? "bg-[#242832] text-white" : "text-gray-500"}`}>Saved</button></div>
          <label className="text-xs text-gray-500">Sort By <select value={sort} onChange={(event) => setSort(event.target.value)} className="ml-2 rounded-lg border border-slate-700 bg-[#15171c] px-3 py-2 text-white"><option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option></select></label>
        </div>
        <div className="mt-4 space-y-3">
          {items.length > 0 ? items.map((exercise) => <WorkoutRow key={exercise.id} exercise={exercise} saved={tab === "saved"} onRemove={() => tab === "plan" ? removeFromPlan(exercise.id) : removeFromSaved(exercise.id)} onDone={() => markAsDone(exercise.id)} />) : <div className="rounded-xl border border-dashed border-slate-800 py-20 text-center"><h2 className="text-lg font-black uppercase text-white">Nothing here yet</h2><p className="mt-2 text-sm text-gray-500">Browse the library and add a lift to get today moving.</p><Link href="/#library" className="mt-5 inline-block rounded-full bg-[#c2f800] px-5 py-3 text-xs font-bold text-black">Go to workouts</Link></div>}
        </div>
      </div>
    </main>
  );
};

const MyPlanPage = () => (
  <Suspense fallback={<main className="min-h-[60vh] bg-[#0e1014]" />}>
    <PlanContent />
  </Suspense>
);

export default MyPlanPage;
