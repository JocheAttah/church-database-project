"use client";

import { formatFileSize } from "@/utils/formatFileSize";
import { truncateMiddle } from "@/utils/truncateText";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { CloudArrowUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { Input } from "./ui/input";

function Uploader() {
  const [files, setFiles] = useState<FileList | null>(null);
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

  // TODO: change file upload to something else. Form can't be descendant of form
  return (
    <>
      <form
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex min-h-[200px] w-full cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white bg-shark"
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
      {files && (
        <div className="rounded-xl bg-shark px-2.5 pb-5 pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-shark">
                <DocumentIcon className="w-6 text-white" />
              </div>
              <div className="ml-1 w-[95%] overflow-hidden text-ellipsis whitespace-nowrap text-white">
                <div className="text-sm">
                  {truncateMiddle(files[0]?.name, 50)}
                </div>
                <div className="text-[8px] text-dustygray">
                  {formatFileSize(files[0]?.size)}
                </div>
              </div>
            </div>

            <div className="cursor-pointer" onClick={() => setFiles(null)}>
              <XMarkIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Uploader;
