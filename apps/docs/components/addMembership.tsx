"use client";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { addMemberships } from "@/actions/addMemberships";
import { Membership } from "@/types/types";
import { toast } from "sonner";

export default function AddMembership({ gymId, gymName }: { gymId: string, gymName: string }) {
  const [formData, setFormData] = useState<Membership>({
    price: "",
    duration: 1,
    description: "",
    color: "#aabbcc"
  });
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false); // Controls modal visibility

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
      setIsOpen(false); // Close modal on success
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

  function handleClose() {
    setIsOpen(prev=> !prev);
  }

  return (
    <div className="overflow-clip">
      <Button onClick={() => setIsOpen(true)} className="mb-4">Add New Membership</Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 overflow-clip flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Card className=" w-[38%] overflow-y-auto h-[85%] mx-auto bg-white rounded-lg shadow-lg p-4">
            <CardHeader>
              <CardTitle>Add New Membership</CardTitle>
              <CardDescription>Create a new membership option for your gym</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="space-y-1">
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
                <div className="space-y-1">
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
                <div className="space-y-1">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter membership details..."
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex space-x-4">
                    <Label htmlFor="color">Set Color</Label>
                    <div style={{ backgroundColor: formData.color }} className="h-4 w-12 rounded" />
                  </div>
                  <HexColorPicker color={formData.color} onChange={handleColorChange} />
                </div>

                <Button type="submit" className="w-full">Add Membership</Button> 
                <Button onClick={() => setIsOpen(false)} className="w-full mt-4">Close</Button>
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
        </div>
      )}
    </div>

  );
}
