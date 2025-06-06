import Navbar from "@/components/commons/Navbar";
import PageHead from "@/components/commons/PageHead/PageHead";
import { ReactNode } from "react";

interface Proptypes {
  children: ReactNode;
}

const MainLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className="h-screen w-full overflow-y-auto  p-8">
      <PageHead title="SIMS PPOB - Angga Aprianda" />
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
