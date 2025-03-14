import httpClient from "@/lib/http-client";


import { uploadProductImage } from "@/services/products/upload-image";

/**
 * Crea un record di immagine nel database dopo averla caricata in memoria.
 */
export const createImage = async ({file, type}: {
  file: File;
  type: string;
}) => {
  try {
    // Carica l'immagine e restituisce i metadati (URL, dimensione, tipo).
    const uploadedImage = await uploadProductImage(file, type);

    if (!uploadedImage) {
      throw new Error("Failed to upload image.");
    }

    // Crea l'oggetto da salvare nel database
    const imageData = {
      image_url: uploadedImage.imageUrl,
      size: uploadedImage.size,
      type: type,
    };


    // Effettua la richiesta REST per salvare i metadati nel database.
    const { data } = await httpClient.post("/images", imageData);

    return data;
  } catch (error) {
    console.error("Error creating image:", error);
    throw new Error(`An error occurred while adding the image: ${error}`);
  }
};

export default createImage;
