import { ManageGym } from "@/components/manageGym";
import { Navbar } from "@/components/Navbar";
import { authOptions } from "@/lib/auth";
import { Gym } from "@/types/types";
import { paramsId } from "@/types/validations";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

async function getGymDetails(id: string) {
  try {
    const response = await prisma.gym.findUnique({
      where: {
        id,
      },
      include: {
        memberships: {
          select: {
            id: true,
            duration: true,
            description: true,
            color: true,
            price: true,
            users: true,
          },
        },
        members: {
          include: {
            memberships: {
              where: {
                gymId: id,
              },
              include: {
                membership: true,
              },
            },
          },
        },
      },
    });
    if (!response) {
      return { error: "Gym Details doest not exist" };
    }
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: "Cannot Process Request at the moment" };
  }
}
export default async function ({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  const { id } = params;
  if (!id) {
    notFound();
  }
  const result = paramsId.safeParse(id);
  if (!result.success) {
    return (
      <div className="flex flex-col text-xl items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Invalid Id Error</h1>
        Invalid Gym Id
        <a href="/manageGyms" className="mt-4 text-blue-600">
          Go back to Manage Gyms
        </a>
      </div>
    );
  }

  const gymsDetails = await getGymDetails(id);
  console.log(gymsDetails);
  if (gymsDetails.error) {
    return (
      <div className="text-4xl font-bold text-center">{gymsDetails.error}</div>
    );
  }

return <div className="space-y-5 p-4 h-screen overflow-auto "><Navbar title={""} ></Navbar>
<div className="animate-slide-up">
    <ManageGym role="admin" gymDetails={gymsDetails.data as Gym} gymId={""}></ManageGym>
</div>
</div>
}

const awaiter = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(); // Resolve the promise after 'ms' milliseconds
    }, ms);
  });
};
