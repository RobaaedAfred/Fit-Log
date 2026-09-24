"use client";

import { Iexer } from "@/app/types/eType";
import { useExercise } from "@/app/contex/ExerciseContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ExCardProps {
  exercise: Iexer;
}

const ExCard = ({ exercise }: ExCardProps) => {
  const { setSelectedExercise } = useExercise();
  const router = useRouter();

  const handleClick = () => {
    setSelectedExercise(exercise);
    router.push(`/workouts/${exercise.id}`);
  };

  return (
    <article
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden rounded-xl border border-slate-800 bg-[#15171c] transition-all duration-300 hover:-translate-y-1 hover:border-[#c2f800]"
    >

      <div className="relative h-48 overflow-hidden">
        <Image
          src={exercise.image}
          alt={exercise.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4">

        <div className="mb-3 flex flex-wrap gap-2">
          {exercise.muscleGroups.slice(0, 2).map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#c2f800] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h2 className="text-lg font-extrabold uppercase text-white">
          {exercise.name}
        </h2>

  
        <p className="mt-1 text-xs text-gray-500">
          {exercise.equipment}
        </p>


        <div className="my-4 h-px bg-slate-800" />


        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>◷ {exercise.duration} min</span>

          <span>● {exercise.caloriesBurned} kcal</span>

          <span>☆ {exercise.rating}</span>
        </div>
      </div>
    </article>
  );
};

export default ExCard;