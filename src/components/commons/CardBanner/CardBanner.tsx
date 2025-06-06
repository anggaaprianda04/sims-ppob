import Image from "next/image";
import React from "react";

interface Proptypes {
  imgBanner: string;
}

const CardBanner = (props: Proptypes) => {
  const { imgBanner } = props;

  return (
    <div className="w-full">
      <Image
        alt="banner"
        width={100}
        height={100}
        src={imgBanner}
        className="w-full h-40"
      />
    </div>
  );
};

export default CardBanner;
