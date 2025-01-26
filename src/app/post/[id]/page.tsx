"use client";
import { CommentsByPostIdQuery, PostQuery } from "@/app/gql";
import DefaultLayouts from "@/components/default/default-layouts";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLazyQuery } from "@apollo/client";
import { Avatar, Badge, ConfigProvider, Skeleton, Tag } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fromNowFormat } from "@/app/common/date";
import Image from "next/image";
import CreateCommentModal from "@/components/post/create-comment-modal";
import { useAppSelector } from "@/store/store";
import CommentCard from "@/components/post/comment-card";
import { Comment, Post } from "@/types";
import CreateComentForm from "@/components/post/create-comment-form";
const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector((state) => state.signin);
  const router = useRouter();

  const [getPost, { loading }] = useLazyQuery(PostQuery);
  const [getComments, { loading: commentLoading }] = useLazyQuery(
    CommentsByPostIdQuery
  );

  const [post, setPosts] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);

  const [openModal, setOpenmodal] = useState(false);

  const [openForm, setOpenForm] = useState(false);

  const handleGetPost = async () => {
    const res = await getPost({ variables: { id: Number(id) } });
    await setPosts(res.data.post);
  };

  const handleGetComments = async () => {
    const res = await getComments({ variables: { id: Number(id) } });
    await setComments(res.data.commentsByPostId);
  };
  const handleCloseModal = () => {
    setOpenmodal(false);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  useEffect(() => {
    handleGetPost();
    handleGetComments();
  }, []);

  return (
    <DefaultLayouts>
      {loading ? (
        <Skeleton avatar paragraph={{ rows: 4 }} />
      ) : (
        <ConfigProvider
          theme={{
            components: {
              Badge: {
                dotSize: 10,
              },
            },
          }}
        >
          <div className="w-screen h-auto  bg-white overflow-auto md:px-32 py-8 sm:px-4">
            <ArrowLeftOutlined
              className="text-[#243831] text-[20px] hover:bg-[#D8E9E4] p-4 rounded-full cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            />
            <div className="mt-10 flex items-center ">
              <Badge
                size="default"
                color="#00C252"
                dot={true}
                offset={[-5, 40]}
              >
                <Avatar src={post?.author?.image} size={50} />
              </Badge>
              <p className="text-black ml-4">{post?.author?.username}</p>
              <p className="text-[#939494] text-xs ml-2">
                {fromNowFormat(post?.createdAt || new Date())}
              </p>
            </div>
            <div className="mt-2">
              <Tag className=" px-2 py-1 rounded-full border-0">
                {post?.community}
              </Tag>
            </div>
            <div className="text-black ">
              <p className="font-bold text-[16px] mt-2">{post?.title}</p>
              <p>{post?.content}</p>
            </div>
            <div className="mt-3 flex items-center">
              <Image
                src={"/message-circle.svg"}
                width={16}
                height={16}
                alt="board logo"
              />
              <p className="text-[#939494] text-[12px] ml-1">
                {post?.comment_count} Comments
              </p>
            </div>

            <div className="mt-6">
              <button
                className="text-[#49A569] rounded border border-[#49A569] w-[132px] h-[40px] md:hidden"
                onClick={() => {
                  if (user.id === 0) {
                    router.push("/signin");
                  } else {
                    setOpenmodal(true);
                  }
                }}
              >
                Add Comments
              </button>

              {!openForm && (
                <button
                  className="sm:hidden md:block text-[#49A569] rounded border border-[#49A569] w-[132px] h-[40px] "
                  onClick={() => {
                    if (user.id === 0) {
                      router.push("/signin");
                    } else {
                      setOpenForm(true);
                    }
                  }}
                >
                  Add Comments
                </button>
              )}

              {openForm && (
                <div className="md:block sm:hidden">
                  <CreateComentForm
                    postId={id}
                    handleCloseForm={handleCloseForm}
                    handleGetComments={handleGetComments}
                  />
                </div>
              )}
            </div>

            <div className="mt-6">
              {commentLoading ? (
                <Skeleton active />
              ) : (
                comments?.map((comment: Comment) => (
                  <CommentCard comment={comment} key={comment.id} />
                ))
              )}
            </div>
          </div>
          <CreateCommentModal
            open={openModal}
            postId={id}
            handleCloseModal={handleCloseModal}
            handleGetComments={handleGetComments}
          />
        </ConfigProvider>
      )}
    </DefaultLayouts>
  );
};

export default PostPage;
