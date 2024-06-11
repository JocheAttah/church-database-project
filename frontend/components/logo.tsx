import Image, { ImageProps } from "next/image";

type LogoProps = Omit<ImageProps, "src" | "alt">;

const Logo = (props: LogoProps) => {
  return <Image src="/logo.png" alt="SCC Logo" priority {...props} />;
};

export default Logo;