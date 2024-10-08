"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
export const Navbar = ({ title }: { title: string }) => {
  const [showAddGymModal, setShowAddGymModal] = useState(false);
  return (
    <div>
      <div className=" flex  justify-between">
        <div className="text-3xl font-bold text-gray-800">{title}</div>
        <div className="space-x-4">
          <Button onClick={() => setShowAddGymModal(true)}>
            <Plus className="mr-2" size={20} />
            Add Gym
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell size={20} />
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>New member sign-up</DropdownMenuItem>
              <DropdownMenuItem>Upcoming class: Yoga at 2 PM</DropdownMenuItem>
              <DropdownMenuItem>
                Maintenance scheduled for tomorrow
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {showAddGymModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4">Add New Gym</h3>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="gymName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gym Name
                </label>
                <Input id="gymName" placeholder="Enter gym name" />
              </div>
              <div>
                <label
                  htmlFor="gymAddress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <Input id="gymAddress" placeholder="Enter gym address" />
              </div>
              <div>
                <label
                  htmlFor="gymPhone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <Input id="gymPhone" placeholder="Enter phone number" />
              </div>
              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAddGymModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Gym</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
