"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Iexer } from "@/app/types/eType";

interface ExerciseContextType {
  exercises: Iexer[];
  selectedExercise: Iexer | null;
  plan: Iexer[];
  saved: Iexer[];
  loading: boolean;
  setSelectedExercise: (exercise: Iexer) => void;
  addToPlan: (exercise: Iexer) => void;
  saveForLater: (exercise: Iexer) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
  const [exercises, setExercises] = useState<Iexer[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Iexer | null>(null);
  const [plan, setPlan] = useState<Iexer[]>([]);
  const [saved, setSaved] = useState<Iexer[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getExercises = async () => {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!res.ok) throw new Error("Failed to fetch exercises");
        setExercises(await res.json());
      } catch (error) {
        console.error("Exercise fetch error:", error);
        toast.error("Unable to load workouts right now.");
      } finally {
        setLoading(false);
      }
    };
    void getExercises();
  }, []);
  useEffect(() => {
    const storedPlan = window.localStorage.getItem("fitlog-plan");
    const storedSaved = window.localStorage.getItem("fitlog-saved");
    window.setTimeout(() => {
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
      setStorageReady(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    window.localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    window.localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, storageReady]);

  const addToPlan = (exercise: Iexer) => {
    if (plan.some((item) => item.id === exercise.id)) {
      toast.info("This workout is already in today's plan.");
      return;
    }
    if (plan.length >= 5) {
      toast.error("Today's plan can contain up to five lifts.");
      return;
    }
    setPlan((current) => [...current, exercise]);
    toast.success("Added to today's plan.");
  };

  const saveForLater = (exercise: Iexer) => {
    if (saved.some((item) => item.id === exercise.id)) {
      toast.info("This workout is already saved.");
      return;
    }
    setSaved((current) => [...current, exercise]);
    toast.success("Saved for later.");
  };

  const removeFromPlan = (id: number) => {
    setPlan((current) => current.filter((item) => item.id !== id));
    toast.success("Removed from today's plan.");
  };

  const removeFromSaved = (id: number) => {
    setSaved((current) => current.filter((item) => item.id !== id));
    toast.success("Removed from saved workouts.");
  };

  const markAsDone = (id: number) => {
    setPlan((current) => current.filter((item) => item.id !== id));
    toast.success("Workout marked as done.");
  };

  const value = {
    exercises,
    selectedExercise,
    plan,
    saved,
    loading,
    setSelectedExercise,
    addToPlan,
    saveForLater,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  };

  return (
    <ExerciseContext.Provider value={value}>
      {children}
      <ToastContainer position="bottom-right" theme="dark" autoClose={2400} />
    </ExerciseContext.Provider>
  );
};

export const useExercise = () => {
  const context = useContext(ExerciseContext);
  if (!context) throw new Error("useExercise must be used inside ExerciseProvider");
  return context;
};
