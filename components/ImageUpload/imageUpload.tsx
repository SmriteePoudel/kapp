'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  currentImage?: string | null;
}

export default function ImageUpload({ onImageUpload, currentImage }: ImageUploadProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(currentImage || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Unknown error");
      }

      const data = await response.json();
      if (data?.url) {
        onImageUpload(data.url);
      } else {
        throw new Error("No URL returned from server");
      }
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 cursor-pointer relative"
        onClick={triggerFileInput}
        role="button"
        aria-label="Upload profile photo"
      >
        {previewImage ? (
          <Image
            src={previewImage}
            alt="Profile preview"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <span>Upload Photo</span>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      <button
        type="button"
        onClick={triggerFileInput}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Change Photo"}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
