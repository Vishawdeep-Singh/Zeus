'use client';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'; // Import alert dialog components

import { Bell, Loader2, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Input } from './ui/input';
import { FileUpload } from './ui/file-upload';
import { TAddForm } from '@/types/types';
import { addFormSchema } from '@/types/validations';
import { toast } from 'sonner';
import { addGym } from '@/actions/addGym';
import { Notifications } from './notifications';
import { useRecoilState } from 'recoil';
import { notificationsState } from '@/states/notifications';
import { getSignedURL } from '@/actions/getSignedUrls';

export const Navbar = ({ title }: { title: string }) => {
  const [gymFormData, setGymFormData] = useState<TAddForm>({
    name: '',
    address: '',
    phoneNumber: '',
  });
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);

  const [notifications, setNotifications] = useRecoilState(notificationsState);

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleFileUpload = (file: File) => {
    setFile(file);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGymFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = addFormSchema.safeParse(gymFormData);
    setLoading(true);
    try {
      if (result.success && file) {
        const signedUrlResult = await getSignedURL();
        if (signedUrlResult.failure) {
          toast.error('Error getting signed Urls', {
            closeButton: true,
            position: 'top-center',
          });
          return;
        }

        const url = signedUrlResult.success?.url;
        if (url) {
          await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': file.type,
            },
            body: file,
          });

          const response = await addGym(gymFormData, url.split('?')[0]);
          if (response.data) {
            toast.success('Gym added successfully', {
              position: 'top-center',
              closeButton: true,
              duration: 5000,
            });
            setLoading(false);

            setDialogOpen(false);
            setGymFormData({
              name: '',
              address: '',
              phoneNumber: '',
            });
          } else if (response.errors) {
            const errors = response.errors;
            for (const field in errors) {
              toast.error(`${field} : ${errors[field]?.join(',')}`, {
                closeButton: true,
              });
            }
          } else {
            toast.error(`${response.error}`, {
              closeButton: true,
            });
          }
        }
      } else {
        const errors = result.error?.flatten().fieldErrors as Record<
          string,
          string[]
        >;
        for (const field in errors) {
          toast.error(`${field} : ${errors[field]?.join(',')}`, {
            closeButton: true,
          });
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="p-3 bg-black rounded-3xl">
      <div className="flex justify-between">
        <div className="text-3xl font-bold text-white">{title}</div>

        <div className="space-x-7">
          <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                className="hover:bg-slate-800"
                onClick={() => {
                  setDialogOpen(true);
                }}
              >
                <Plus className="mr-2" size={20} />
                Add Gym
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="pointer-events-auto">
              {loading && (
                <div className="flex space-x-5 justify-center">
                  {' '}
                  <Loader2 className="w-6 h-6 text-black animate-spin"></Loader2>
                  <div className="text-xl text-center">Uploading....</div>
                </div>
              )}
              <AlertDialogTitle>Add New Gym</AlertDialogTitle>
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div>
                  <label htmlFor="">Upload an image of your gym</label>
                  <FileUpload onChange={handleFileUpload} />
                </div>
                <div>
                  <label
                    htmlFor="gymName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gym Name
                  </label>
                  <Input
                    id="gymName"
                    name="name"
                    placeholder="Enter gym name"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="gymAddress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <Input
                    id="gymAddress"
                    name="address"
                    placeholder="Enter gym address"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="gymPhone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <Input
                    max="9999999999"
                    id="gymPhone"
                    type="number"
                    name="phoneNumber"
                    placeholder="Enter phone number..."
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button type="submit">Add Gym</Button>
                </div>
              </form>
            </AlertDialogContent>
          </AlertDialog>
          <Notifications></Notifications>
        </div>
      </div>
    </nav>
  );
};
