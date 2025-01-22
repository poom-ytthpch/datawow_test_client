"use client";
import Image from "next/image";
import { Castoro } from "next/font/google";
import { Form, Input } from "antd";

const castoro = Castoro({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

type FieldType = {
  username: string;
};

export default function SignIn() {
  const [form] = Form.useForm<FieldType>();

  return (
    <div className="h-screen bg-green-950 flex flex-col md:flex-row">
      {/* Sidebar สำหรับ Desktop */}

      {/* Form Content */}

      <div className="w-full  sm:h-2/5 block bg-green-800 flex items-center justify-center rounded-br-3xl rounded-bl-3xl md:hidden">
        <div className="w-full flex items-center justify-center">
          <div className={`${castoro.className} flex flex-col items-center`}>
            <Image src="/board.svg" width={180} height={38} alt="board logo" />
            <p className=" text-white italic text-2xl mt-4">a Board</p>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center px-6 sm:h-3/5 md:w-3/5 md:h-full ">
        <div className="">
          <h2 className="text-2xl font-bold mb-6 text-left">Sign In</h2>
          <Form >
            <Form.Item name="username">
              <Input placeholder="Username" />
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="hidden md:block md:w-2/5 h-screen bg-green-800 text-white flex items-center justify-center rounded-tl-3xl rounded-bl-3xl">
        <div className="w-full h-full flex items-center justify-center">
          <div className={`${castoro.className} flex flex-col items-center`}>
            <Image src="/board.svg" width={180} height={38} alt="board logo" />
            <p className=" text-white italic text-2xl mt-4">a Board</p>
          </div>
        </div>
      </div>
    </div>
  );
}
