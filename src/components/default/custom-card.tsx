"use client";
import { Post } from "@/types";
import { Avatar } from "antd";
import { Tag } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditPostModal from "../post/edit-post-modal";
import DeletePostModal from "../post/delete-post-modal";

type Props = {
  post: Post;
  index: number;
  post_count: number;
  edit?: boolean;
  handleGetAuthorPosts: () => void;
  search: string;
};

const CustomCard = ({
  post,
  index,
  post_count,
  edit,
  handleGetAuthorPosts,
  search,
}: Props) => {
  const router = useRouter();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  function highlightText(text: string) {
    if (!search || search.length < 2) return text;

    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ backgroundColor: "#C5A365" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  return (
    <div
      className={`${index === 0 && "rounded-tl-2xl rounded-tr-2xl"} ${
        index > 0 && index != post_count - 1 && "mt-[1px]"
      } ${
        index === post_count - 1 &&
        "rounded-bl-2xl rounded-br-2xl mt-[1px] mb-4"
      } w-full min-h-[100px] bg-white p-6 `}
    >
      <div className="text-[#939494] flex items-center">
        <Avatar src={post?.author?.image} size={31} />
        <p className="ml-2">{post?.author?.username}</p>
        {edit && (
          <div className="flex items-center ml-auto">
            <Image
              src={"/green/edit.svg"}
              width={16}
              height={16}
              alt="edit logo"
              className="cursor-pointer"
              onClick={() => {
                setOpenEditModal(true);
              }}
            />
            <Image
              src={"/green/trash.svg"}
              width={16}
              height={16}
              alt="trash logo"
              className="ml-2 cursor-pointer"
              onClick={() => {
                setOpenDeleteModal(true);
              }}
            />
          </div>
        )}
      </div>
      <div className="mt-2">
        <Tag className=" px-2 py-1 rounded-full border-0">{post.community}</Tag>
      </div>
      <div
        className="text-black cursor-pointer"
        onClick={() => {
          router.push(`/post/${post.id}`);
        }}
      >
        <p className="font-bold text-[16px] mt-2">
          {highlightText(post.title)}
        </p>
        <p>{post.content}</p>
      </div>
      <div
        className="mt-3 flex items-center cursor-pointer"
        onClick={() => {
          router.push(`/post/${post.id}`);
        }}
      >
        <Image
          src={"/message-circle.svg"}
          width={16}
          height={16}
          alt="board logo"
        />
        <p className="text-[#939494] text-[12px] ml-1">
          {post.comment_count} Comments
        </p>
      </div>
      <EditPostModal
        open={openEditModal}
        handleCloseModal={handleCloseEditModal}
        post={post}
        handleGetAuthorPosts={handleGetAuthorPosts}
      />
      <DeletePostModal
        open={openDeleteModal}
        postId={Number(post.id)}
        handleCloseModal={handleCloseDeleteModal}
        handleGetAuthorPosts={handleGetAuthorPosts}
      />
    </div>
  );
};

export default CustomCard;
