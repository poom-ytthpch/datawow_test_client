"use client";
import { CreateCommentMutation } from "@/app/gql";
import { useAppSelector } from "@/store/store";
import { Post } from "@/types";
import { useMutation } from "@apollo/client";
import { Alert, Form, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

type Props = {
  open: boolean;
  postId: string;
  handleCloseModal: () => void;
  handleSetPost: (post: Post) => void;
};

type FieldType = {
  content: string;
};
const CreateCommentModal = ({
  open,
  postId,
  handleCloseModal,
  handleSetPost,
}: Props) => {
  const user = useAppSelector((state) => state.signin);

  const [form] = Form.useForm<FieldType>();

  const [createComment] = useMutation(CreateCommentMutation, {
    onCompleted: async (data) => {
      await form.resetFields();
      await handleSetPost(data?.createComment);
      await handleCloseModal();
    },
    onError: (error) => {
      <Alert message={error.message} type="error" />;
    },
  });

  const handleCreateComment = (input: FieldType) => {
    createComment({
      variables: {
        input: {
          ...input,
          authorId: user.id,
          postId: Number(postId),
        },
      },
    });
  };

  return (
    user.id !== 0 && (
      <Modal
        title="Add Comments"
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
        <div className="mt-6">
          <Form form={form} onFinish={handleCreateComment}>
            <Form.Item name="content">
              <TextArea rows={10} placeholder="What’s on your mind..." />
            </Form.Item>
            <div className="mt-4 w-full md:flex justify-end items-center">
              <button
                className="text-[#49A569] rounded border border-[#49A569] sm:w-full sm:h-[40px] md:w-[105]"
                onClick={() => handleCloseModal()}
                type="button"
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

export default CreateCommentModal;
