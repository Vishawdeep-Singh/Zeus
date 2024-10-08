"use client"
import { customSignIn } from "@/app/actions/custom-sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function({ params }: { params: { mail: string } }) {
  const [phone,SetPhone]=useState<string | null>(null)
return <div>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4">Add Phone number to continue</h3>
            <form className="space-y-4" onSubmit={async()=>{
              await customSignIn(phone as string,params.mail)
            }}>
              <div>
                <label
                  htmlFor="gymPhone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <Input onChange={async(e:React.ChangeEvent<HTMLInputElement>)=>{
                 await SetPhone(e.target.value)
                }} id="gymPhone" placeholder="Enter phone number" />
              </div>
              <div className="flex justify-end space-x-4">

                <Button type="submit" onClick={async()=>{
                 const response= await customSignIn(phone as string,params.mail)
                
                  signIn("google")
               
                }}>Continue</Button>
              </div>
            </form>
          </div>
        </div>
</div>
}