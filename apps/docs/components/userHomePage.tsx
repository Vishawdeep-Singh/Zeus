import { UserGymCard } from './userGymCard';

export const UserHomePage = ({ gymDetails }: any) => {
  return (
    <div className=" animate-slide-up w-full grid grid-cols-3 gap-10 pb-10">
      {gymDetails.map((gym: any) => {
        return (
          <UserGymCard
            imageSrc={
              'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            name={gym.name}
            address={gym.address}
            link={`/user/view/${gym.id}`}
          ></UserGymCard>
        );
      })}
    </div>
  );
};
