import { FaLongArrowAltLeft } from "react-icons/fa";
import { Button } from "./button";
import { NavLink } from "./navLink";
interface Props {
  errorCode?: string;
  message?: string;
  message2?: string;
}
const Error: React.FC<Props> = ({ errorCode, message, message2 }) => {
  return (
    <div className="container flex flex-col py-16 justify-center items-center gap-4 md:gap-8">
      <h1 className="text-6xl md:text-9xl font-bold">{errorCode || "404"}</h1>
      <h2 className="text-3xl md:text-6xl font-medium">
        {message ? message : "Page not found"}
      </h2>
      <p className="md:text-xl text-center">
        {message2
          ? message2
          : "It seems the page you are looking for does'nt exist!"}
      </p>
      <NavLink href="/">
        <Button>
          <div className="rounded-full flex items-center gap-2 !font-normal">
            <FaLongArrowAltLeft size={25} />
            Back to home
          </div>
        </Button>
      </NavLink>
    </div>
  );
};

export default Error;
