"use client";
import { DeletePostMutation } from "@/app/gql";
import { useAppSelector } from "@/store/store";
import { useMutation } from "@apollo/client";
import { Alert, Modal } from "antd";

type Props = {
  open: boolean;
  postId: number;
  handleCloseModal: () => void;
  handleGetAuthorPosts: () => void;
};
const DeletePostModal = ({
  open,
  postId,
  handleCloseModal,
  handleGetAuthorPosts
}: Props) => {
  const user = useAppSelector((state) => state.signin);

  const [deletePost] = useMutation(DeletePostMutation, {
    onCompleted: async () => {
      await handleGetAuthorPosts();
      await handleCloseModal();
    },
    onError: (error) => {
      <Alert message={error.message} type="error" />;
    },
  });

  const handleDeletePost = () => {
    deletePost({
      variables: {
        id: postId,
      },
    });
  };

  return (
    user.id !== 0 && (
      <Modal
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => handleCloseModal()}
        open={open}
        centered
        width={{
          xs: "95%",
          sm: "80%",
          md: "400px",
          lg: "400px",
          xl: "400px",
          xxl: "400px",
        }}
      >
        <div className="text-center">
          <p className="font-bold">
            Please confirm if you wish to <br />
            delete the post
          </p>
          <p>
            Are you sure you want to delete the post?
            <br /> Once deleted, it cannot be recovered.
          </p>
        </div>

        <div className="mt-6 w-full md:flex justify-end items-center">
          <button
            className="text-black rounded border border-black sm:w-full sm:h-[44px] md:w-[170px]"
            type="button"
            onClick={() => handleCloseModal()}
          >
            Cancel
          </button>
          <button
            className="text-white bg-[#F23536] rounded border border-[#F235369] sm:w-full sm:h-[44px] sm:mt-4 md:w-[170px] md:mt-0 md:ml-4"
            type="button"
            onClick={() => handleDeletePost()}
          >
            Confirm
          </button>
        </div>
      </Modal>
    )
  );
};

export default DeletePostModal;
