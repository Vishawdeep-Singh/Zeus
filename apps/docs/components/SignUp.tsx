"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { LoaderCircle, Zap } from "lucide-react";
import { Dumbbell } from "lucide-react";
import { motion } from "framer-motion";
import { SignUp } from "@/types/types";
import { FlipWords } from "./ui/flip-words";
import { signup } from "@/app/actions/signup";
import { Signin } from "./SignIn";
import { signIn } from "next-auth/react";

export const Signup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignUp>({
    name: "",
    email: "",
    cellPh: 0,
  });
  const words = [
    "Effortless Membership Tracking",
    "Seamless Billing",
    "User-Friendly Dashboard",
    "Time-Saving Admin Tools",
    "Performance Analytics",
  ];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

   const response =await signup(formData);
   if(response.data){
    const signinresponse = await signIn("credentials",{
      phone:response.data.cellPh,
      password:formData.password,
      redirect:false,
      callbackUrl:"/dashboard"
    })
    console.log(signinresponse,"Signin response")
   }

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }
  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <motion.div
        className="flex flex-col items-center space-y-10 justify-center min-h-screen"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className="flex items-center space-x-6">
          <Zap className="" fill="black" size={60} />
          <div className="font-semibold bg-gradient-to-r text-7xl from-neutral-950 to bg-neutral-400 text-transparent bg-clip-text">
            <FlipWords words={words} /> <br />
          </div>
        </div>
        <motion.div
          whileHover={{ scale: [null, 1.2, 1.1] }}
          transition={{ duration: 0.3 }}
        >
          <Card  className="w-[400px] card  hover hover:shadow-2xl border-4 border-black hover:shadow-primary/30 transition-shadow">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                Enter your details below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-6">
                <Button variant="outline">Google</Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Phone Number</Label>
                  <Input
                    name="cellPh"
                    type="number"
                    placeholder="1234567890"
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Password</Label>
                  <Input
                    id="confirm-password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                  />
                </div>
                <Button
                  className="w-full mt-4"
                  type="submit"
                  disabled={loading}
                >
                  {loading && (
                    <LoaderCircle
                      color="white"
                      className="mr-2 h-4 w-4  animate-spin"
                    />
                  )}
                  Sign Up
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className=" text-md text-muted-foreground">
                Already a user ?{" "}
                <a
                  href="/signin"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Sign In
                </a>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};
