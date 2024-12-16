import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

interface GymCardProps {
  imageSrc: string;
  name: string;
  address: string;
  link: string;
}
export const UserGymCard = ({
  imageSrc,
  name,
  address,
  link,
}: GymCardProps) => {
  return (
    <Card className="w-full transition transform duration-300 bg-[#f7f7f7] hover:scale-105 hover:shadow-lg max-w-sm mx-auto overflow-hidden">
      <div className="aspect-video relative">
        <Image
          src={imageSrc}
          alt={`${name} exterior`}
          priority
          width={1920}
          height={1080}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="text-sm text-gray-600">{address}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link
          href={link}
          className=" px-4 py-3 text-sm rounded-full font-bold bg-primary text-white"
        >
          Visit
        </Link>
      </CardFooter>
    </Card>
  );
};
