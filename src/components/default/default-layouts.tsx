"use client";
import CustomSider from "../common/sider";
import Nav from "./nav";

const DefaultLayouts = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Nav />

      <div className="h-lvh w-full flex">
        <CustomSider />

        {children}
      </div>
    </div>
  );
};

export default DefaultLayouts;
