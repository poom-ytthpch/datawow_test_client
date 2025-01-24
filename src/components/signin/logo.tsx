import { Castoro } from "next/font/google";
import Image from "next/image";

const castoro = Castoro({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const Logo = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className={`${castoro.className} flex flex-col items-center`}>
        <Image src="/board.svg" width={180} height={38} alt="board logo" />
        <p className=" text-white italic text-2xl mt-4">a Board</p>
      </div>
    </div>
  );
};

export default Logo;
