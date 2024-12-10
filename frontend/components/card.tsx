import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

const Card = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={cn("rounded-2.5 bg-shark p-4", className)} {...props} />
  );
};

export default Card;
