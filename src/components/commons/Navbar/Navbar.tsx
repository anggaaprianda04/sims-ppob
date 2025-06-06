import Image from "next/image";
import React from "react";
import ItemNavbar from "../ItemNavbar";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white border-b-2">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand */}
        <Link href="/">
          <div className="flex items-center">
            <Image src="/images/Logo.png" alt="logo" width={27} height={25} />
            <span className="ml-2 text-lg font-semibold text-gray-800">
              SIMS PPOB
            </span>
          </div>
        </Link>
        <div className="flex gap-14">
          <ItemNavbar link="/topup" title="Top Up" />
          <ItemNavbar title="Transaction" />
          <ItemNavbar title="Akun" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
