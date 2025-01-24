"use client";
import { Dropdown, MenuProps, Skeleton, Space } from "antd";
import Search from "../common/search";
import { CheckOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import { CommunityMap, Post } from "@/types";
import CustomCard from "./custom-card";
import { useEffect, useState } from "react";
import CreatePostModal from "../post/create-post-modal";
import { useLazyQuery } from "@apollo/client";
import { AuthorPostsQuery, PostsQuery } from "@/app/gql";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";

type Props = {
  edit?: boolean;
  userId?: number;
};

const CustomContent = ({ edit, userId }: Props) => {
  const user = useAppSelector((state) => state.signin);
  const router = useRouter();

  const [getPosts, { loading }] = useLazyQuery(PostsQuery);
  const [getAuthorPosts, { loading: authorLoading }] =
    useLazyQuery(AuthorPostsQuery);

  const [search, setSearch] = useState("");
  const [community, setCommunity] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSetSearch = (value: string) => {
    setSearch(value);
  };

  const [posts, setPosts] = useState<Post[]>([]);

  const items: MenuProps["items"] = Object.entries(CommunityMap).map(
    ([key, val]) => ({
      label:
        community === val ? (
          <div className="flex justify-between">
            {val} <CheckOutlined className="text-[#49A569]" />
          </div>
        ) : (
          val
        ),
      key: key,
      onClick: () => (community === val ? setCommunity("") : setCommunity(key)),
      style:
        community === val
          ? {
              backgroundColor: "#D8E9E4",
            }
          : {},
    })
  );

  const handleGetAuthorPosts = async () => {
    const res = await getAuthorPosts({
      variables: {
        id: user.id,
      },
    });

    setPosts(res.data.authorPosts);
  };

  const handleGetPosts = async () => {
    const res = await getPosts();
    setPosts(res.data.posts);
  };

  useEffect(() => {
    if (!userId) {
      handleGetPosts();
    } else {
      handleGetAuthorPosts();
    }
  },[]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="w-screen h-auto  bg-[#BBC2C0] overflow-auto">
      <div className="h-full w-full md:flex md:flex-col md:items-center">
        <div className="max-w-[798px] flex p-4">
          <Search handleSetSearch={handleSetSearch} />
          <Dropdown className="text-black" menu={{ items }}>
            <Space className="p-2 font-bold">
              Community
              <DownOutlined />
            </Space>
          </Dropdown>
          <button
            className="bg-[#49A569] h-[40px] w-[105px] text-white p-2 rounded flex items-center justify-center "
            onClick={() => {
              if (user.id === 0) {
                router.push("/signin");
              } else {
                setOpenModal(true);
              }
            }}
          >
            Create <PlusOutlined className="text-xs ml-1" />
          </button>
          <CreatePostModal
            open={openModal}
            handleCloseModal={handleCloseModal}
            handleGetPosts={handleGetPosts}
            edit={edit}
            handleGetAuthorPosts={handleGetAuthorPosts}
          />
        </div>
        <div className="max-w-[798px] p-4 ">
          {loading || authorLoading ? (
            <Skeleton avatar paragraph={{ rows: 4 }} />
          ) : (
            posts
              .filter((post) => {
                if (search.length >= 2 || community.length > 0) {
                  const matchesSearch =
                    search === "" ||
                    post.title.toLowerCase().includes(search.toLowerCase());
                  const matchesCommunity =
                    community === "" ||
                    post.community
                      .toLowerCase()
                      .includes(community.toLowerCase());
                  return matchesSearch && matchesCommunity;
                } else {
                  return post;
                }
              })
              .map((post, index , pps) => (
                <CustomCard
                  edit={edit}
                  key={index}
                  search={search}
                  post={post}
                  index={index}
                  post_count={pps.length}
                  handleGetAuthorPosts={handleGetAuthorPosts}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomContent;
