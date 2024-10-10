"use server";

import prisma from "@repo/db/client";
import { error } from "console";

export const checkEmailExists = async (email: string) => {
  try {
    const isEmailExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        provider:true
      },
    });
    console.log(isEmailExists, email);
    if (isEmailExists) {
      return { data: isEmailExists};
    } else {
      return { error: "Account does not exists" };
    }
  } catch (error) {
    console.error(error);
    return { error: "Not able to process checkEmail at the moment" };
  }
};
