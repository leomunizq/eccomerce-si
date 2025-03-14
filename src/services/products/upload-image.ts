import { supabase } from "../../lib/supabase";

/**
 * Uploads an image to Supabase Storage and returns the image path along with its metadata.
 */
export const uploadProductImage = async (file: File, type:string) => {
  const fileName = `${Date.now()}-${file.name}`;

  // Upload file to Supabase Storage
  const { data, error } = await supabase.storage
    .from("photos")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  // Convert file size to a readable format (KB, MB)
  const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2) + " MB";

  return {
    imageUrl: data.path,
    size: fileSizeInMB,
    type: type,
    uploadedAt: new Date().toISOString(),
  };
};
