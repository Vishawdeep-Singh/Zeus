import { Badge, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { CardHeader, CardContent, Card, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { MembershipCardProps } from "@/types/types";


export function MembershipCard({price,duration,description,color,index}:MembershipCardProps) {
    const gifUrls = [
        "https://media1.tenor.com/m/MxTl6a26CpAAAAAC/lr-agl-super-saiyan-god-ss-goku-and-vegeta-lr-agl-ssb-goku-and-vegeta.gif",
        "https://media1.tenor.com/m/899ZxzqJhs0AAAAC/lr-agl-goku-carnival.gif",
        "https://media1.tenor.com/m/AtiBkSK7X3IAAAAC/dokkan-dokkan-battle.gif"
      ];
    
    const getGifUrl = (index:any) => gifUrls[index % gifUrls.length];
    const gifUrl = getGifUrl(index)
  return (
   
      
   
    <div
  className="relative bg-black rounded-md "
  style={{
    boxShadow: `3px 10px 6px -1px black, 3px 8px 4px -1px black`,
    backgroundColor:`b`,
    
     // Shadow on container
  }}
>
  <Card
    className={cn(
      "group  w-full cursor-pointer overflow-hidden relative card rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border-2 border-black dark:border-neutral-800 bg-gray-300",

      // Preload hover image by setting it in a pseudo-element
      "before:bg-[url(https://media1.tenor.com/m/h04_fXuPkZQAAAAC/dbz-goku.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
      "hover:bg-[url(https://media1.tenor.com/m/h04_fXuPkZQAAAAC/dbz-goku.gif)]  hover:translate-x-[-50px] hover:translate-y-[-50px] hover:scale-110 hover:z-10",
      "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-10",
      "transition-all duration-500",
      //text
      "hover:text-[rgba(0,0,0,0.7)] hover:shadow-[1px_1px_2px_rgba(0,0,0,0.3)]"
    )}
  >
    {/* Card content here */}
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle>{duration.toString()} months</CardTitle>
  <Zap fill={color}></Zap>
      </div>
    </CardHeader>
    <CardContent className="font-bold">
      <ul className="list-disc list-inside space-y-2">
        {description.map((x, i) => {
          return <li key={i}>{x}</li>;
        })}
      </ul>
      <p className="mt-4 text-2xl font-bold">Rs .{price}</p>
      <Button className="mt-4 w-full">Choose Plan</Button>
    </CardContent>
  </Card>
</div>





  );
}
