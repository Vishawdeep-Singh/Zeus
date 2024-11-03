// components/ClientButton.tsx
"use client"; // This makes it a client component

import * as React from "react";
import { Button } from "./ui/button"

interface ClientButtonProps {
  id: string;
  gymId: string;
  handleChoosePlan: (id: string, gymId: string) => void;
}

export const ChoosePlanButton: React.FC<ClientButtonProps> = ({
  id,
  gymId,
  handleChoosePlan,
}) => {
  return (
    <Button
      className="mt-4 w-full"
      onClick={() => handleChoosePlan(id, gymId)}
    >
      Choose Plan
    </Button>
  );
};
