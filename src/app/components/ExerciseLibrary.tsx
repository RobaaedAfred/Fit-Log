"use client";

import { useExercise } from "@/app/contex/ExerciseContext";
import ExCard from "./ExCard";

const ExerciseLibrary = () => {
  const { exercises, loading } = useExercise();

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400">
        Loading exercises...
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="py-20 text-center text-gray-400">
        No exercises found.
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
  
      <div className="mb-6">
        <h1 className="text-2xl font-black uppercase text-white">
          The Library
        </h1>

        <p className="text-sm text-gray-500">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <ExCard
            key={exercise.id}
            exercise={exercise}
          />
        ))}
      </div>
    </section>
  );
};

export default ExerciseLibrary;