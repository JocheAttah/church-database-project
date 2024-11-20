import GrowthIcon from "@/components/icons/growth-icon";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

type GrowthIndicatorProps = {
  growthPercentage: number;
  period?: string;
  isLoading?: boolean;
  className?: string;
};

const GrowthIndicator = ({
  growthPercentage,
  period = "in the last month",
  isLoading,
  className,
}: GrowthIndicatorProps) => (
  <div className={cn("flex items-center text-xs", className)}>
    {isLoading ? (
      <Skeleton className="h-5 w-40" />
    ) : (
      <div className="flex items-center duration-500 animate-in fade-in slide-in-from-bottom-3">
        {growthPercentage >= 0 ? (
          <GrowthIcon />
        ) : (
          <GrowthIcon className="rotate-180 text-red-500" />
        )}
        <p
          className={`ml-1 ${
            growthPercentage >= 0 ? "text-junglegreen" : "text-red-500"
          }`}
        >
          {growthPercentage.toFixed(1)}%
        </p>
        <p className="ml-2 text-dustygray">{period}</p>
      </div>
    )}
  </div>
);

export default GrowthIndicator;
