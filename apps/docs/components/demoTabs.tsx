

import Image from "next/image";
import { Tabs } from "./ui/tabs";
import Component from "./attendanceWeeks";
import { Component1 } from "./revenueMonths";
import { Component2 } from "./todayAttendance";
import { MembersofGym } from "./membersOfGym";
import Component3 from "./membershipExpiry";

export function TabsDemo() {
  const tabs = [
    {
      title: "Analytics",
      value: "product",
      content: (
        <div className="w-full space-y-10 overflow-auto relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-gradient-to-br bg-white border-2 border-black ">
          <p>Analytics</p>
          <div className="flex space-y-10 flex-col ">
            <div className="flex space-x-5">
            <Component></Component>
            <Component1></Component1>
            </div>
            <div className="flex">
            <Component2></Component2>
            <Component3></Component3>
            </div>


          </div>
          <div>
           
          </div>

        </div>
      ),
    },
    {
      title: "Membership Expiry",
      value: "services",
      content: (
        <div className="w-full space-y-10 overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-primary bg-gradient-to-br border-2  bg-white border-black ">
          <p>Membership Expiry</p>
          <div>
          <Component3></Component3>
          </div>
        </div>
      ),
    },
    {
      title: "Playground",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br border-2  bg-white border-black">
          <p>Playground tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br border-2  bg-white border-black">
          <p>Content tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Random",
      value: "random",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br border-2 bg-white border-black">
          <p>Random tab</p>
          <DummyContent />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px]  relative b flex flex-col  mx-auto w-full  items-start justify-start ">
      <Tabs  tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="/linear.webp"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
