"use client";

import { cn } from "@/lib/utils";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return <Sonner closeButton richColors cn={cn} {...props} />;
};

export { Toaster };
