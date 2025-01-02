import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
//import { Button } from "@/components/ui/button"
import bgcompute from "../../../public/image.png";
import RegisterClinicCard from "@/components/RegisterClinicCard";

function page() {
  return (
    <div className="h-screen">
      <div className="h-1/3 w-full flex">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={bgcompute}
            alt="Image"
            className="w-full h-1/3 object-cover"
          />
          
        </AspectRatio>
        
      </div>
      <div className="h-2/3 w-full flex justify-center items-center">
        <RegisterClinicCard />
      </div>
    </div>
  );
}

export default page;
