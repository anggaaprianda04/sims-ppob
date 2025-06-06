import PageHead from "@/components/commons/PageHead/PageHead";
import Image from "next/image";
import { ReactNode } from "react";

interface Proptypes {
  children: ReactNode;
}

const AuthLayout = (props: Proptypes) => {
  const { children } = props;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-white">
      <PageHead title="SIMS PPOB - Angga Aprianda" />
      <section className="max-w-7xl w-full mx-auto p-6">
        <div className="flex w-full items-center justify-center gap-8 px-4">
          <div className="flex flex-col max-w-xl justify-center items-center w-full md:w-auto">
            <div className="flex gap-2 items-center mb-6">
              <Image src="/images/Logo.png" alt="logo" width={27} height={25} />
              <h1 className="font-bold text-xl">SIMS PPOB</h1>
            </div>
            <div className="text-center w-full">{children}</div>
          </div>

          <div className="hidden md:flex flex-1 justify-center relative max-h-[700px] w-full max-w-md">
            <Image
              src="/images/ilustrasi_Login.png"
              className="object-contain"
              alt="ilustrasi"
              width={700}
              height={600}
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthLayout;
