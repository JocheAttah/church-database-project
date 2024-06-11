import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type NavTooltipProps = {
  children: ReactNode;
  content: ReactNode;
  className?: string;
};

const NavTooltip = ({ children, content, className }: NavTooltipProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent side="right" className={cn("border-none", className)}>
            {content}
            <TooltipArrow className="fill-white/[0.02]" />
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NavTooltip;
