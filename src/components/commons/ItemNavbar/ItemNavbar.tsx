import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Proptypes = {
  title: string;
  link?: string;
};

const ItemNavbar = (props: Proptypes) => {
  const { title, link } = props;
  const { pathname } = useRouter();

  const isActive = pathname === link;

  return (
    <Link
      href={`${link}`}
      className={`px-2 py-1 font-semibold ${
        isActive ? "text-red-500" : "text-gray-500"
      } text-sm`}>
      {title}
    </Link>
  );
};

export default ItemNavbar;
