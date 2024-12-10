import type { ComponentPropsWithoutRef } from "react";

const Pill = (props: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className="flex max-w-fit items-center justify-center rounded-full bg-woodsmoke px-3 py-1"
      {...props}
    />
  );
};

export default Pill;
