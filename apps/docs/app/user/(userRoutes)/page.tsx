import { FloatingDockDemo } from '@/components/floatingDock';
import { UserHomePage } from '@/components/userHomePage';
import prisma from '@repo/db/client';

async function getGymDetails() {
  try {
    const response = await prisma.gym.findMany({});
    return { data: response };
  } catch (error) {
    console.error(error);

    return { error: 'Not able to Process at moment' };
  }
}

export default async function UserHome() {
  const gymDetails = await getGymDetails();

  return (
    <div className="">
      <div className="text-center text-6xl p-10 font-bold">Gyms</div>

      <div>
        <UserHomePage gymDetails={gymDetails.data}></UserHomePage>
      </div>
      <FloatingDockDemo></FloatingDockDemo>
    </div>
  );
}
