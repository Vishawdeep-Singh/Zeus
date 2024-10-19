"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"; // Import alert dialog components
import { Bell, Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { FileUpload } from "./ui/file-upload";
import { TAddForm } from "@/types/types";
import { addFormSchema } from "@/types/validations";
import { toast } from "sonner";
import { addGym } from "@/actions/addGym";

export const Navbar = ({ title }: { title: string }) => {
  const [gymFormData, setGymFormData] = useState<TAddForm>({
    name: "",
    address: "",
    phoneNumber: ""
  });
  const [file, setFile] = useState<File>();

  const [dialogOpen,setDialogOpen]=useState(false)
  const handleFileUpload = (file: File) => {
    setFile(file);
    console.log(file);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGymFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    const result = addFormSchema.safeParse(gymFormData);
    if (result.success) {
      const response = await addGym(gymFormData);
      if(response.data){
        console.log(response)
        toast.success("Gym added successfully",{
          position:"top-center",
          closeButton:true,
          duration:5000
        })
      
        setDialogOpen(false)
        setGymFormData(
          {
            name: "",
            address: "",
            phoneNumber: ""
          }
        )
      }
      else if(response.errors){
        const errors = response.errors
      for (const field in errors) {
        console.log(field);
        toast.error(`${field} : ${errors[field]?.join(",")}`, {
          closeButton: true,
          
        });
      }
      }
      else {
        toast.error(`${response.error}`, {
          closeButton: true,
          
        });
      }

      
    } else {
      const errors = result.error.flatten().fieldErrors as Record<string, string[]>;
      for (const field in errors) {
        console.log(field);
        toast.error(`${field} : ${errors[field]?.join(",")}`, {
          closeButton: true,
          
        });
      }
    }
  };

  return (
    <div className="p-3 bg-slate-950 opacity-80 rounded-3xl">
      <div className="flex justify-between">
        <div className="text-3xl font-bold text-white">{title}</div>
        <div className="space-x-4">
          <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button  onClick={()=>{setDialogOpen(true)}}>
                <Plus className="mr-2"  size={20} />
                Add Gym
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="pointer-events-auto">
              <AlertDialogTitle>Add New Gym</AlertDialogTitle>
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div>
                  <label htmlFor="">Upload an image of your gym</label>
                  <FileUpload onChange={handleFileUpload} />
                </div>
                <div>
                  <label htmlFor="gymName" className="block text-sm font-medium text-gray-700">
                    Gym Name
                  </label>
                  <Input id="gymName" name="name" placeholder="Enter gym name" onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="gymAddress" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <Input id="gymAddress" name="address" placeholder="Enter gym address" onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="gymPhone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <Input id="gymPhone" type="number" name="phoneNumber" placeholder="Enter phone number" onChange={handleChange} />
                </div>
                <div className="flex justify-end space-x-4">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button type="submit">Add Gym</Button>
                </div>
              </form>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant="ghost" size="icon">
            <Bell size={20} color="white" />
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
