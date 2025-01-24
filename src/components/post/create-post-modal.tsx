"use client";
import { CreatePostMutation } from "@/app/gql";
import { useAppSelector } from "@/store/store";
import { Community, CommunityMap } from "@/types";
import { CheckOutlined, DownOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Alert, Button, Dropdown, Form, Input, MenuProps, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

type Props = {
  open: boolean;
  handleCloseModal: () => void;
  handleGetPosts: () => void;
  handleGetAuthorPosts: () => void;
  edit?: boolean;
};

type FieldType = {
  community: Community;
  title: string;
  content: string;
};
const CreatePostModal = ({
  open,
  handleCloseModal,
  handleGetPosts,
  handleGetAuthorPosts,
  edit,
}: Props) => {
  const user = useAppSelector((state) => state.signin);

  const [form] = Form.useForm<FieldType>();
  const community = Form.useWatch("community", form);

  const [createPost] = useMutation(CreatePostMutation, {
    onCompleted: async () => {
      await form.resetFields();
      if (edit) {
        await handleGetAuthorPosts();
      } else {
        await handleGetPosts();
      }
      await handleCloseModal();
    },
    onError: (error) => {
      <Alert message={error.message} type="error" />;
    },
  });

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
      onClick: () => form.setFieldsValue({ community: val as Community }),
      style:
        community === val
          ? {
              backgroundColor: "#D8E9E4",
            }
          : {},
    })
  );

  const handleCreatePost = (input: FieldType) => {
    createPost({
      variables: {
        input: {
          ...input,
          authorId: user.id,
        },
      },
    });
  };

  return (
    user.id !== 0 && (
      <Modal
        title="Create Post"
        centered
        open={open}
        onCancel={() => handleCloseModal()}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        width={{
          xs: "95%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <div className="mt-">
          <Form form={form} onFinish={handleCreatePost}>
            <Form.Item name="community">
              <Dropdown
                className="text-[#49A569]  "
                arrow={true}
                menu={{ items }}
              >
                <Button
                  className="sm:w-full md:w-[195px] h-[40px]"
                  style={{
                    border: "1px solid #49A569",
                    color: "#49A569",
                  }}
                >
                  Choose a community <DownOutlined />
                </Button>
              </Dropdown>
            </Form.Item>

            <Form.Item name="title">
              <Input placeholder="Title" />
            </Form.Item>

            <Form.Item name="content">
              <TextArea rows={10} placeholder="What’s on your mind..." />
            </Form.Item>
            <div className="mt-4 w-full md:flex justify-end items-center">
              <button
                className="text-[#49A569] rounded border border-[#49A569] sm:w-full sm:h-[40px] md:w-[105]"
                type="button"
                onClick={() => handleCloseModal()}
              >
                Cancel
              </button>
              <button
                className="text-white bg-[#49A569] rounded border border-[#49A569] sm:w-full sm:h-[40px] sm:mt-4 md:w-[105] md:mt-0 md:ml-4"
                type="submit"
              >
                Post
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    )
  );
};

export default CreatePostModal;
