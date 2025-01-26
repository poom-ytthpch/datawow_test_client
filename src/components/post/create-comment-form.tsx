import { CreateCommentMutation } from "@/app/gql";
import { useAppSelector } from "@/store/store";
import { useMutation } from "@apollo/client";
import { Alert, Form } from "antd";
import TextArea from "antd/es/input/TextArea";

type Props = {
  postId: string;
  handleCloseForm: () => void;
  handleGetComments: () => void;
};

type FieldType = {
  content: string;
};
const CreateComentForm = ({
  postId,
  handleCloseForm,
  handleGetComments,
}: Props) => {
  const [form] = Form.useForm<FieldType>();
  const user = useAppSelector((state) => state.signin);

  const [createComment] = useMutation(CreateCommentMutation, {
    onCompleted: async () => {
      await form.resetFields();
      await handleGetComments();
      await handleCloseForm();
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
    <Form form={form} onFinish={handleCreateComment}>
      <Form.Item name="content">
        <TextArea rows={10} placeholder="What’s on your mind..." />
      </Form.Item>
      <div className="mt-4 w-full md:flex justify-end items-center">
        <button
          className="text-[#49A569] rounded border border-[#49A569] sm:w-full sm:h-[40px] md:w-[105]"
          onClick={() => handleCloseForm()}
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
  );
};

export default CreateComentForm;
