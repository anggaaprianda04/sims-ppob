import Image, { ImageProps } from "next/image";

interface SafeImageProps extends ImageProps {
  fallbackSrc?: string;
}

const SafeImage = ({
  src,
  fallbackSrc = "/images/profile_photo.png",
  ...rest
}: SafeImageProps) => {
  const isInvalid = !src || src === "null" || src === "undefined";
  const validSrc = isInvalid ? fallbackSrc : src;

  return <Image src={validSrc} {...rest} />;
};

export default SafeImage;
