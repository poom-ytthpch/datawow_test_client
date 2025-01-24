"use client";
import { SignInMutation } from "@/app/gql/user";
import { useMutation } from "@apollo/react-hooks";
import { Alert, Form, Input } from "antd";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { useAppDispatch } from "@/store/store";
import { signin } from "@/store/slices/signin-slice";
import { useRouter } from "next/navigation";

type FieldType = {
  username: string;
};

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm<FieldType>();

  loadDevMessages();
  loadErrorMessages();
  const [signIn] = useMutation(SignInMutation, {
    onCompleted: async (data) => {
      await dispatch(signin(data.signIn));
      await router.push("/");
    },
    onError: (error) => {
      <Alert message={error.message} type="error" />;
    },
  });

  const handleSubnit = (input: FieldType) => {
    signIn({
      variables: {
        input,
      },
    });
  };

  return (
    <div className="w-full flex items-center justify-center px-6 sm:h-3/5 md:w-3/5 md:h-full ">
      <div className="w-[384px]">
        <h2 className="text-2xl font-bold mb-6 text-left">Sign In</h2>
        <Form form={form} onFinish={handleSubnit}>
          <Form.Item name="username">
            <Input className="h-[44px]" placeholder="Username" />
          </Form.Item>
          <div>
            <button
              className="w-full h-[44] bg-[#49A569] text-white p-2 rounded"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
