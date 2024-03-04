import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  path: string;
}

const Redirect: React.FC<Props> = ({ path }) => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => router.push(path), 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <></>;
};

export default Redirect;
