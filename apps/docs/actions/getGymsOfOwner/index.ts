"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@repo/db/client";
import { error } from "console";
import { getServerSession } from "next-auth";

export const getGymsOfOwner = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return { error: "Unauthorized" };
    }

    const response = await prisma.user.findUnique({
      where: {
        id: Number(session.user.id),
      },
      select: {
        owner: {
          select: {
            id: true,
          },
        },
      },
    });
    const gymIds = response?.owner.map((owner) => owner.id) || [];
    return { data: gymIds };
  } catch (error) {
    console.error(error);
    return { error: "Not able to get User Info at the moment" };
  }
};
