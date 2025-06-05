import Home from "@/components/views/Home";
import { SessionExtended } from "@/types/Auth";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export default function IndexPage() {
  return <Home />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const isAccessTokenValid = (session: SessionExtended | null) => {
    if (!session || !session.accessToken) return false;
    return true;
  };

  if (!isAccessTokenValid(session)) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
