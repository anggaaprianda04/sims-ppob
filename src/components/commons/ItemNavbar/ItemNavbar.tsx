import Link from "next/link";
import React from "react";

type Proptypes = {
  title: string;
  link?: string;
};

const ItemNavbar = (props: Proptypes) => {
  const { title, link } = props;
  return (
    <Link
      href={`${link}`}
      className="px-2 py-1 font-semibold text-gray-500 text-sm">
      {title}
    </Link>
  );
};

export default ItemNavbar;
