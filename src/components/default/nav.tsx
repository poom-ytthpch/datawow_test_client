"use client";
import { Castoro } from "next/font/google";
import Image from "next/image";
import CustomDrawer from "../common/drawer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/store";

const castoro = Castoro({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const Nav = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.signin);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full h-[60px] bg-[#243831] p-4 flex justify-between items-center">
      <div
        className={`${castoro.className} cursor-pointer`}
        onClick={() => router.push("/")}
      >
        <p className=" text-white italic text-[20px]">a Board</p>
      </div>
      <div className="hidden md:block">
        {user?.username ? (
          <div className="flex items-center">
            <p className="mr-4">{user.username}</p>
            <Image src="/avatar.png" width={40} height={40} alt="board logo" />
          </div>
        ) : (
          <button
            className="bg-[#49A569] h-[40px] w-[105px] text-white p-2 rounded"
            onClick={() => router.push("/signin")}
          >
            Sign In
          </button>
        )}
      </div>
      <div className="md:hidden">
        <Image
          src="/humberger_menu.svg"
          width={40}
          height={40}
          alt="board logo"
          onClick={handleOpen}
          className="cursor-pointer"
        />
        <CustomDrawer open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default Nav;
