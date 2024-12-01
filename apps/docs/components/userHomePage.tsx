
"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { UserGymCard } from "./userGymCard";

export const UserHomePage = ({ gymDetails }: any) => {
  const [filtered, setFiltered] = useState<any>(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (gymDetails) {
      const filteredData = gymDetails.filter((gym: any) => {
        const isNameMatch =
          name && name.length > 0
            ? gym.name.toLowerCase().includes(name.toLowerCase())
            : true;
        const isAddressMatch =
          address && address.length > 0
            ? gym.address.toLowerCase().includes(address.toLowerCase())
            : true;
        return isNameMatch && isAddressMatch;
      });
      setFiltered(filteredData);
    }
  }, [name, address, gymDetails]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name == "Name") {
      setName(value);
    } else {
      setAddress(value);
    }
  }

  return (
    <>
      <div className="flex m-auto w-full p-4 md:w-[90%] space-x-5">
        <Input
          className="w-52"
          type="text"
          name="Name"
          placeholder="Search by Name"
          value={name}
          onChange={handleInputChange}
        />
        <Input
          name="Address"
          className="w-52"
          type="text"
          placeholder="Search by Address"
          value={address}
          onChange={handleInputChange}
        />
      </div>
      <div className=" animate-slide-up w-full grid grid-cols-3 gap-10 pb-10">
        {filtered &&
          filtered.map((gym: any) => {
            return (
              <UserGymCard
                imageSrc={
                  "https://images.unsplash.com/photo-1623874514711-0f321325f318?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                name={gym.name}
                address={gym.address}
                link={`/user/view/${gym.id}`}
              ></UserGymCard>
            );
          })}
      </div>
    </>

  );
};
