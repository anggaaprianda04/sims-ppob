import { GetServerSideProps } from "next";

export default function IndexPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const token = req.cookies["token"];

  const isTokenValid = (token?: string) => {
    if (!token) return false;

    return true;
  };

  if (isTokenValid(token)) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
};
