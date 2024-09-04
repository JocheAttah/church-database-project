import ArrowSmallLeftIcon from "@/components/icons/arrow-small-left-icon";
import { useRouter } from "next/navigation";

const BackButton = ({ text }: { text: string }) => {
  const router = useRouter();
  return (
    <div
      className="mb-11 flex w-fit cursor-pointer items-center gap-1.5 self-end text-dustygray hover:underline"
      onClick={router.back}
    >
      <ArrowSmallLeftIcon />
      <p className="text-xs">{text}</p>
    </div>
  );
};

export default BackButton;
