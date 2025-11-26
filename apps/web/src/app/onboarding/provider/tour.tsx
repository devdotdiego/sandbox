"use client";

import { useEffect, useState } from "react";
import { TourProvider } from "@/app/onboarding/provider/tour-provider";
import { TourRender } from "@/app/onboarding/provider/tour-render";

const dataFromServer = {
  tour: { step: "STEP_1", isOpen: true },
} as const;

export function Tour() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <TourProvider data={dataFromServer}>
      <TourRender />
    </TourProvider>
  );
}
