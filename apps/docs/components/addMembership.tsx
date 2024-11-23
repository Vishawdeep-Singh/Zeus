"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { addMemberships } from "@/actions/addMemberships";
import { Membership } from "@/types/types";
import { toast } from "sonner";

export default function AddMembership({ gymId, gymName }: { gymId: string; gymName: string }) {
  const [formData, setFormData] = useState<Membership>({
    price: "",
    duration: 1,
    description: "",
    color: "#aabbcc"
  });
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = (newColor: string) => {
    setFormData((prev) => ({ ...prev, color: newColor }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.price || !formData.duration) {
      setError("Price and duration are required fields.");
      return;
    }

    if (isNaN(parseFloat(formData.price)) || isNaN(parseInt(formData.duration.toString()))) {
      setError("Price must be a valid number and duration must be a valid integer.");
      return;
    }

    const updatedFormData = {
      ...formData,
      description: formData.description?.split(',').map(desc => desc.trim())
    };

    const response = await addMemberships(updatedFormData, gymId);

    if (response.data) {
      toast.success(`Membership added to ${gymName}`, {
        closeButton: true,
        position: "top-center",
      });
      setIsOpen(false);
    } else {
      toast.error(`${response.error}`, {
        closeButton: true,
        position: "top-center",
      });
    }

    setFormData({
      price: "",
      duration: 1,
      description: "",
      color: "#aabbcc"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">Add New Membership</Button>
      </DialogTrigger>
      <DialogContent className="w-[38%] h-fit min-h-[90vh] border-none p-0">
        <Card className="w-full h-fit bg-background shadow-none border-none">
          <CardHeader>
            <CardTitle>Add New Membership</CardTitle>
            <CardDescription>Create a new membership option for your gym</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="e.g., 29.99"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (in months)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  value={Number(formData.duration)}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter membership details..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <Label htmlFor="color">Set Color</Label>
                  <div style={{ backgroundColor: formData.color }} className="h-6 w-12 rounded" />
                </div>
                <HexColorPicker color={formData.color} onChange={handleColorChange} />
              </div>
              <Button type="submit" className="w-full">Add Membership</Button>
            </form>
          </CardContent>
          <CardFooter>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
