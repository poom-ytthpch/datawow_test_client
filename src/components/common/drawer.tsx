import { useAppSelector } from "@/store/store";
import { Drawer } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
type Props = {
  open: boolean;
  handleClose: () => void;
};
const CustomDrawer = ({ open, handleClose }: Props) => {
  const user = useAppSelector((state) => state.signin);
  const router = useRouter();

  return (
    <Drawer
      style={{ background: "#2B5F44" }}
      className="rounded-tl-2xl rounded-bl-2xl"
      width={280}
      styles={{
        header: { display: "none" },
      }}
      open={open}
    >
      <Image
        src={"/close.svg"}
        width={16}
        height={12}
        alt={"close logo"}
        onClick={handleClose}
        className="cursor-pointer"
      />
      <div
        className="mt-10 flex items-center hover:font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src={"/home.svg"} width={24} height={24} alt={"home logo"} />
        <p className="text-white text-[16px] ml-3">Home</p>
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
        <Image src={"/edit.svg"} width={24} height={24} alt={"edit logo"} />
        <p className="text-white text-[16px] ml-3">Our Blog</p>
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
