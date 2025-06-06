import Navbar from "@/components/commons/Navbar";
import PageHead from "@/components/commons/PageHead/PageHead";
import { ReactNode } from "react";

interface Proptypes {
  title?: string;
  children: ReactNode;
}

const MainLayout = (props: Proptypes) => {
  const { title, children } = props;
  return (
    <div className="h-screen w-full overflow-y-auto p-8">
      <PageHead title={title} />
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
