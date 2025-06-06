import Image from "next/image";
import React from "react";

interface Proptypes {
  title: string;
  icon: string;
}

const CardService = (props: Proptypes) => {
  const { icon, title } = props;
  return (
    <div className="flex mr-6 flex-col items-center justify-center">
      <Image alt="icon" src={icon} width={70} height={80} />
      <p className="mt-2 text-sm font-medium">{title}</p>
    </div>
  );
};

export default CardService;
