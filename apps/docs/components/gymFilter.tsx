'use client';
import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRecoilState } from 'recoil';
import { AttedanceGymFilterState } from '@/states/filters';
export const GymFilter = ({
  ownedGyms,
}: {
  ownedGyms: { gymId: string; gymName: string }[];
}) => {
  const [gymFilter, setGymFilter] = useRecoilState(AttedanceGymFilterState);
  const defaultGymId = ownedGyms?.[0]?.gymId || '';
  React.useEffect(() => {
    if (ownedGyms?.[0]?.gymId) {
      setGymFilter(ownedGyms?.[0]?.gymId);
    }
  }, [ownedGyms]);
  console.log(gymFilter);
  return (
    <Select
      value={gymFilter || defaultGymId} // Use gymFilter if it's set, else use defaultGymId
      onValueChange={(value) => setGymFilter(value)} // Update gymFilter on selection change
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Choose a gym" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Gyms</SelectLabel>
          {ownedGyms.map((gym) => (
            <SelectItem key={gym.gymId} value={gym.gymId}>
              {gym.gymName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
