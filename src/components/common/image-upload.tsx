"use client";
import React from "react";
import { UploadDropzone } from "@/src/utils/uploadthing";

interface ImageUploadProps {
  setImageUrl: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setImageUrl }) => {
  return (
    <div>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          const uploadedImageUrl = res[0].url;
          setImageUrl(uploadedImageUrl);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default ImageUpload;
