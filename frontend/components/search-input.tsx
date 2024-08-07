import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "./ui/input";

const SearchInput = () => {
  return (
    <div className="relative">
      <Input
        className="w-[250px] rounded-md border-none bg-woodsmoke p-3 text-xs placeholder:text-dustygray"
        placeholder="Search"
      />
      <MagnifyingGlassIcon
        className="absolute right-3 top-2 text-dustygray"
        width={24}
        height={24}
      />
    </div>
  );
};

export default SearchInput;
