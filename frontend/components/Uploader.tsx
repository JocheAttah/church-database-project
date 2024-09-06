"use client";

import { cn } from "@/lib/utils";
import { formatFileSize } from "@/utils/formatFileSize";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { CloudArrowUpIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState } from "react";
import { ErrorCode, FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";

function Uploader() {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length) {
        const errors = fileRejections[0]?.errors;
        if (!errors) return;
        const code = errors[0]?.code;

        let message;
        switch (code) {
          case ErrorCode.TooManyFiles:
            message = "Too many files";
            break;
          case ErrorCode.FileInvalidType:
            message = "File type is not accepted";
            break;
          case ErrorCode.FileTooLarge:
            message = "File size is too large";
            break;
        }
        toast.error(message);
        return;
      }

      setFiles(acceptedFiles);
    },
    [],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "text/csv": [],
    },
  });

  useEffect(() => {
    const readFileDataUrl = (file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    };

    const errorHandler = () => {
      toast.error("Failed, please try again");
    };

    const processFiles = async () => {
      try {
        const file = files[0];
        if (!file) return;
        const result = await readFileDataUrl(file);
        // return formik.setFieldValue(name, result);
      } catch {
        errorHandler();
      }
    };

    void processFiles();
  }, [files]);

  return (
    <>
      <div
        {...getRootProps({
          className: cn(
            "flex cursor-pointer flex-col items-center rounded-3xl border border-dashed border-white py-14",
            isDragActive ? "bg-shark" : "hover:bg-shark",
          ),
        })}
      >
        <input {...getInputProps()} />
        <CloudArrowUpIcon className="h-[30px] w-[30px]" />
        <div className="text-center text-xs">
          <p className="mb-2 mt-4">
            Drag and drop your document here, or{" "}
            <span className="underline">click to browse</span>
          </p>
          <p className="text-dustygray">Only CSV files are supported</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-5 flex items-center justify-between gap-3 rounded-3xl bg-shark p-3">
          <div className="flex items-center gap-3">
            <DocumentIcon className="h-6 w-6 flex-shrink-0" />
            <div className="space-y-1">
              <div className="w-fit text-sm">{files[0]?.name}</div>
              <div className="text-xs text-dustygray">
                {formatFileSize(files[0]?.size)}
              </div>
            </div>
          </div>

          <div
            className="cursor-pointer rounded-full p-2 hover:bg-white/5"
            onClick={() => setFiles([])}
          >
            <XMarkIcon className="h-6 w-6" />
          </div>
        </div>
      )}
    </>
  );
}

export default Uploader;
