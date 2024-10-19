"use client"
import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { addMemberships } from "@/actions/addMemberships";
import { Membership } from "@/types/types";
import { toast } from "sonner";
import { join } from "path";

export default function AddMembership({ gymId,gymName }: { gymId: string,gymName:string }) {
  const [formData, setFormData] = useState<Membership>({
    price: "",
    duration: 1,
    description: "",
    color: "#aabbcc"
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  // Synchronize the color in formData with the color picker
  const handleColorChange = (newColor: string) => {
    setFormData((prev) => ({ ...prev, color: newColor }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // Basic validation
    if (!formData.price || !formData.duration) {
      setError("Price and duration are required fields.")
      return
    }

    if (isNaN(parseFloat(formData.price)) || isNaN(parseInt(formData.duration.toString()))) {
      setError("Price must be a valid number and duration must be a valid integer.")
      return
    }
    const updatedFormData = {
      ...formData,
      description: formData.description?.split(',').map(desc => desc.trim())
    };
    // Here you would typically send the data to your backend
    console.log("Membership data submitted:", formData)
    setSuccess(true)

    const response = await addMemberships(updatedFormData, gymId)

    if(response.data){
        toast.success(`Membership is added to ${gymName}`,{
            closeButton:true,
            position:"top-center",
        })
    }
    else{
        toast.error(`${response.error}`,{
            closeButton:true,
            position:"top-center",
        })
    }

    // Reset form after successful submission
    setFormData({
      price: "",
      duration: 1,
      description: "",
      color: "#aabbcc" // Reset to default or desired value
    })
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add New Membership</CardTitle>
        <CardDescription>Create a new membership option for your gym</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter membership details..."
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Label htmlFor="color">Set Color as a tag for your memberships</Label>
              <div style={{ backgroundColor: formData.color }} className="h-4 w-12" />
            </div>
            <div className="ml-24">
              <HexColorPicker color={formData.color} onChange={handleColorChange} />
            </div>
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
  )
}
