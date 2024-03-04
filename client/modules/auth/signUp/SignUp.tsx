import RegistrationForm from "./RegistrationForm";

const SignUp = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <h3 className="text-blue-500 text-2xl md:text-3xl font-medium font-heading">
        Sign Up
      </h3>
      <RegistrationForm />
    </div>
  );
};

export default SignUp;
