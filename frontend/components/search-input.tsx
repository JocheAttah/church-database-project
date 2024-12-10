import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { InputProps } from "./ui/input";
import { Input } from "./ui/input";

const SearchInput = (props: InputProps) => {
  return (
    <div className="relative">
      <Input
        className="w-full rounded-md border-none bg-woodsmoke p-3 text-xs placeholder:text-dustygray sm:w-[250px]"
        placeholder="Search"
        {...props}
      />
      <div className="absolute right-3 top-2 bg-woodsmoke text-dustygray">
        <MagnifyingGlassIcon width={24} height={24} />
      </div>
    </div>
  );
};

export default SearchInput;
