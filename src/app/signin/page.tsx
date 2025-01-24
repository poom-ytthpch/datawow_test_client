import SignInForm from "@/components/signin/signin-form";
import Logo from "@/components/signin/logo";

function SignIn() {
  return (
    <div className="h-screen bg-[#243831] flex flex-col md:flex-row">
      <div className="w-full  sm:h-2/5 block bg-[#2B5F44] flex items-center justify-center rounded-br-3xl rounded-bl-3xl md:hidden">
        <Logo />
      </div>

      <SignInForm />

      <div className="hidden md:block w-2/5 md:h-screen bg-[#2B5F44] text-white flex items-center justify-center rounded-tl-3xl rounded-bl-3xl">
        <Logo />
      </div>
    </div>
  );
}

export default SignIn;
