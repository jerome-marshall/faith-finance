"use client";
import UploadImage from "@/components/UploadImage";
import React from "react";

interface ScanReceiptProps {}

const ScanReceipt = ({}: ScanReceiptProps) => {
  const [image, setImage] = React.useState<File | null | undefined>(null);

  const onImageChange = (file?: File | null) => {
    setImage(file);
  };

  return (
    <div className="flex flex-col justify-center">
      <h2 className="text-2xl font-semibold">Scan Receipt</h2>
      <UploadImage
        onImageChange={onImageChange}
        className="mt-4 min-h-[400px]"
      />
    </div>
  );
};

export default ScanReceipt;
