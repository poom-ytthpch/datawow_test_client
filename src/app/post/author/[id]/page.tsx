"use client";
import CustomContent from "@/components/default/cutom-content";
import DefaultLayouts from "@/components/default/default-layouts";
import { useAppSelector } from "@/store/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthorPost = () => {
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector((state) => state.signin);
  const router = useRouter();

  useEffect(() => {
    if (user.id === 0) {
      router.push("/signin");
    }
  },[]);

  return (
    <DefaultLayouts>
      <CustomContent edit={true} userId={Number(id)} />
    </DefaultLayouts>
  );
};

export default AuthorPost;
