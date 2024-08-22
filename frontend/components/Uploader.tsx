"use client";

import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useRef,
} from "react";
import { Input } from "./ui/input";

function Uploader({
  setFiles,
}: {
  setFiles: Dispatch<SetStateAction<FileList | null>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  const handleInputOnchnage = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };
  const handleDragOver = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleDrop = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("files", e.dataTransfer.files);
    setFiles(e.dataTransfer.files);
  };

  return (
    <form
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="flex w-full cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white px-[120px] py-[59px]"
    >
      <div className="flex flex-col items-center justify-center">
        <CloudArrowUpIcon className="h-5 w-[26px] text-sapphire-700" />
        <div className="mt-3 text-xs text-white">
          Drag and drop or
          <span className="cursor-pointer text-sapphire-700">
            {" "}
            Choose file
            <Input
              //   accept="text/csv"
              hidden
              type="file"
              className="hidden"
              ref={inputRef}
              onChange={handleInputOnchnage}
            />
          </span>{" "}
          to upload
        </div>
        <p className="mt-2 text-xs text-dustygray">
          CSV format only is allowed
        </p>
      </div>
    </form>
  );
}

export default Uploader;
