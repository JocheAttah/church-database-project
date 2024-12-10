import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

const GrowthIcon = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"svg">) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-junglegreen", className)}
      {...props}
    >
      <path
        d="M2.25 18L9 11.25L13.306 15.556C14.5509 13.1021 16.6045 11.1531 19.12 10.038L21.86 8.81799M21.86 8.81799L15.92 6.53699M21.86 8.81799L19.58 14.758"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GrowthIcon;
