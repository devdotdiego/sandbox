"use client";
import {
  type TourStep,
  useTour,
} from "@/app/onboarding/provider/tour-provider";
import { Step1 } from "@/app/onboarding/tour/step-1";
import { Step2 } from "@/app/onboarding/tour/step-2";

const tourComponents = {
  STEP_1: <Step1 />,
  STEP_2: <Step2 />,
} as const satisfies Record<TourStep, React.JSX.Element>;

export function TourRender() {
  const { tour } = useTour();

  return <div>{tourComponents[tour.step]}</div>;
}
