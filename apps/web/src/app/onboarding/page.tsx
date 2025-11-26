import { TourProvider } from "@/app/onboarding/provider/tour-provider";
import { TourRender } from "@/app/onboarding/provider/tour-render";

export default function Page() {
  const dataFromServer = {
    tour: { step: "STEP_1", isOpen: true },
  } as const;

  return (
    <TourProvider data={dataFromServer}>
      <TourRender />
    </TourProvider>
  );
}
