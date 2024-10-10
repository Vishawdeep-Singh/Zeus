"use client";

import { signup } from "@/actions/signup/signup";
import { verifyOtp } from "@/actions/verifyOtp";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { formDataAtom } from "@/states/signUpForm";
import { signIn } from "next-auth/react";
import router, { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "sonner";

export default function ({ params }: { params: { mail: string } }) {
  const [value, setValue] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useRecoilState(formDataAtom);
  console.log(formData);
  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== "undefined") {
      const storedFormData = localStorage.getItem("formData");
      if (storedFormData) {
        setFormData(JSON.parse(storedFormData)); // Safely parse and set formData
      } else {
        router.push("/signup"); // Redirect if no formData
      }

      const fromSignup = localStorage.getItem("fromSignup");
      if (!fromSignup) {
        router.push("/signup"); // Redirect if not coming from signup
      }
    }

    return () => {
      // Clean up localStorage if needed
      localStorage.removeItem("fromSignup");
      localStorage.removeItem("formData");
    };
  }, [router]);
  async function handleSubmit() {
    const toastId = toast.loading("Verifying OTP", {
      closeButton: true,
      position: "bottom-center",
    });
    const response = await verifyOtp(value, formData.email);
    if (response.isVerified) {
      toast.dismiss(toastId);

      toast.success("OTP verified successfully!", {
        closeButton: true,
        position: "bottom-center",
      });
      const response = await signup(formData);
      if (response.data) {
        const signinresponse = await signIn("credentials", {
          email: response.data.email,
          password: formData.password,
          redirect: false,
          callbackUrl: "/dashboard",
        });
        if (signinresponse?.ok) {
          router.push(`/dashboard`);
        }
      } else if (response.errors) {
        const errors = response.errors as Record<string, string[]>;

        for (const field in errors) {
          console.log(field);
          toast.error(`${field} : ${errors[field]?.join(",")}`, {
            closeButton: true,
          });
        }
      } else {
        toast.error(`${response.error}`, {
          closeButton: true,
        });
      }
    } else {
      toast.dismiss(toastId);
      toast.error(`${response.error}`, {
        closeButton: true,
        position: "bottom-center",
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-12">
      <div className=" text-6xl">
        OTP SENT TO {decodeURIComponent(params.mail)}
      </div>
      <div className="text-4xl">Enter OTP:</div>
      <InputOTP
        maxLength={6}
        size={80}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <div>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}
