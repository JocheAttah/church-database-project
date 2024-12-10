import type { ImageProps } from "next/image";
import Image from "next/image";

type LogoProps = Omit<ImageProps, "src" | "alt">;

const Logo = (props: LogoProps) => {
  return <Image src="/images/logo.png" alt="SCC Logo" priority {...props} />;
};

export default Logo;
