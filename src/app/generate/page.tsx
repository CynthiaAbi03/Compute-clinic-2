import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
//import { Button } from "@/components/ui/button"
import bgcompute from "../../../public/image.png";

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
      <div className="bg-green-200 h-2/3 w-full">2</div>
    </div>
  );
}

export default page;
