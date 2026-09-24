"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { Iexer } from "@/app/types/eType";

interface ExerciseContextType {
  exercises: Iexer[];
  selectedExercise: Iexer | null;
  loading: boolean;
  setSelectedExercise: (exercise: Iexer) => void;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(
  undefined
);

export const ExerciseProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [exercises, setExercises] = useState<Iexer[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Iexer | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  
const getExercises = async () => {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");

        if (!res.ok) {
          throw new Error("Failed to fetch exercises");
        }

        const data: Iexer[] = await res.json();

        setExercises(data);
      } catch (error) {
        console.error("Exercise fetch error:", error);
      } finally {
        setLoading(false);
      
    };

    getExercises();
  };

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        selectedExercise,
        loading,
        setSelectedExercise,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercise = () => {
  const context = useContext(ExerciseContext);

  if (!context) {
    throw new Error(
      "useExercise must be used inside ExerciseProvider"
    );
  }

  return context;
};