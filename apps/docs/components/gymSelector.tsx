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
import { GymFilterState } from '@/states/filters';

export function SelectGyms({
  ownedGyms,
}: {
  ownedGyms: { gymId: string; gymName: string }[];
}) {
  const [filter, setGymFilter] = useRecoilState(GymFilterState);
  if (!ownedGyms) {
    return <div>Loading...</div>;
  }

  return (
    <Select onValueChange={(value) => setGymFilter(value)}>
      <SelectTrigger className="w-[180px] text-gray-500 ">
        <SelectValue placeholder={filter || 'Select a gym'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Gyms</SelectLabel>
          {ownedGyms &&
            ownedGyms.map((gym, i) => {
              return (
                <SelectItem key={gym.gymId} value={gym.gymName}>
                  {gym.gymName}
                </SelectItem>
              );
            })}
          <SelectItem value={'null'}>None</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
