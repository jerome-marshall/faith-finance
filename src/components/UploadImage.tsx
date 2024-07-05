//
// Copyright (c) 2024 Nutanix Inc. All rights reserved.
//

"use client";

import { ImagePlus, UploadIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { type DropzoneOptions } from "react-dropzone";
import {
  FileInput,
  FileUploader,
  ImageUploadActions,
} from "@/components/ui/file-uploader";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";

const UploadImage = ({
  onImageChange,
  className,
}: {
  onImageChange: (image?: File | null) => void;
  className?: string;
}) => {
  const [files, setFiles] = useState<File[] | null>([]);
  const firstFile = files?.[0];

  useEffect(() => {
    onImageChange(firstFile);
  }, [files, firstFile]);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post("/api/upload-image", formData);
    console.log("🚀 ~ UploadImage ~ data:", res.data);
  };

  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
  } satisfies DropzoneOptions;

  return (
    <FileUploader
      value={files}
      onValueChange={setFiles}
      dropzoneOptions={dropzone}
      className={cn(
        "relative size-full rounded-lg border border-dashed border-black/40 bg-muted/40",
        {
          "bg-muted": firstFile,
        },
        className,
      )}
      reSelect
    >
      <ImageUploadActions className="absolute right-4 top-4 z-10" />
      {!firstFile && (
        <FileInput className="flex size-full flex-col items-center justify-center ">
          <ImagePlus
            size={100}
            strokeWidth={0.7}
            className="text-muted-foreground"
          />
          <p className="text-muted-foreground">Drag and drop your image here</p>
        </FileInput>
      )}
      <Image
        src={firstFile ? URL.createObjectURL(firstFile) : "/placeholder.svg"}
        alt={firstFile?.name ?? "placeholder"}
        height={80}
        width={80}
        className={cn("absolute size-full object-contain p-0", {
          hidden: !firstFile,
        })}
      />
      <Button
        className="absolute bottom-4 right-4 flex items-center gap-2"
        disabled={!firstFile}
        onClick={() => uploadImage(firstFile!)}
      >
        <UploadIcon className="h-5 w-5" />
        <span>Upload</span>
      </Button>
    </FileUploader>
  );
};

export default UploadImage;
