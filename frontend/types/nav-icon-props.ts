import { ComponentPropsWithoutRef } from "react";

type NavIconProps = {
  filled?: boolean;
} & ComponentPropsWithoutRef<"svg">;

export default NavIconProps;
