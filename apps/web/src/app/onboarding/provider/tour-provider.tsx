"use client";

import { useLocalStorage } from "@uidotdev/usehooks";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect } from "react";
import z from "zod/v4";

const steps = ["STEP_1", "STEP_2"] as const;

export type TourStep = (typeof steps)[number];

const stepSchema = z.enum(steps);

export const tourSchema = z.object({
  step: stepSchema,
  isOpen: z.boolean(),
});

export type Tour = z.output<typeof tourSchema>;

const STORAGE_KEY = "TOUR_STATE";

type TourContext =
  | {
      tour: Tour;
      setTour: (tour: Tour) => void;
    }
  | undefined;

const TourContext = createContext<TourContext>(undefined);

export function TourProvider({
  data,
  children,
}: {
  data: { tour: Tour };
  children: ReactNode;
}) {
  const [tour, setTour] = useLocalStorage<Tour | null>(STORAGE_KEY, null);

  useEffect(() => {
    const unsafeData = {
      step: data.tour.step,
      isOpen: data.tour.isOpen,
    };

    const result = tourSchema.safeParse(unsafeData);

    if (result.success === false) {
      console.error("Invalid tour state schema", result.error);
      return;
    }

    setTour(result.data);
  }, [data.tour, setTour]);

  if (!tour) {
    return null;
  }

  return (
    <TourContext.Provider value={{ tour, setTour }}>
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
}
