"use client";

import { CloudArrowDownIcon } from "@heroicons/react/24/solid";
import React, { useRef, useState } from "react";
import { Input } from "./ui/input";

function Uploader({ setFiles }) {
  const inputRef = useRef();

  const handleClick = () => inputRef.current.click();

  const handleInputOnchnage = ({ target: { files } }) => {
    console.log({ files });
    setFiles(files);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
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
        <CloudArrowDownIcon className="h-5 w-[26px] text-[#4A51A2]" />
        <div className="mt-3 text-xs text-white">
          Drag and drop or
          <span className="cursor-pointer text-[#4A51A2]">
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
        <p className="mt-2 text-xs text-[#979797]">
          CSV format only is allowed
        </p>
      </div>
    </form>
  );
}

export default Uploader;
