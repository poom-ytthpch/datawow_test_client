import { useAppSelector } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
const CustomSider = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.signin);

  return (
    <div className="hidden md:block md:h-full md:w-[280px] md:bg-[#BBC2C0] md:p-6">
      <div
        className="flex items-center hover:font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src={"/black/home.svg"}
          width={24}
          height={24}
          alt={"home logo"}
        />
        <p className="text-black text-[16px] ml-3">Home</p>
      </div>
      <div
        className="mt-4 flex items-center hover:font-bold cursor-pointer"
        onClick={() => {
          if (user.id === 0) {
            router.push("/signin");
          } else {
            router.push(`/post/author/${user.id}`);
          }
        }}
      >
        <Image
          src={"/black/edit.svg"}
          width={24}
          height={24}
          alt={"edit logo"}
        />
        <p className="text-black text-[16px] ml-3">Our Blog</p>
      </div>
    </div>
  );
};

export default CustomSider;
