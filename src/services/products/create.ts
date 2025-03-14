import { ProductFormData } from "@/schema/product"
import { supabase } from "@/lib/supabase"
import { uploadProductImage } from "./upload-image"


interface UploadedImageInfo {
  imageUrl: string
  size?: string | null
  uploadedAt?: string | null
}

/* 
  Funzione di utilità per la creazione di prodotti.
  (  è responsabile solo della creazione della riga in "products").
*/
async function insertProduct(product: ProductFormData) {
  const { data, error } = await supabase
    .from("products")
    .insert({
      name: product.name,
      description: product.description,
      price: product.price,
      brand_id: product.brand_id,
      category_id: product.category_id,
      gender: product.gender,
      material: product.material,
    })
    .select()
    .single()

  if (error || !data) {
    throw new Error(`Errore nella creazione del prodotto: ${error?.message}`)
  }

  return data
}

/* 
  Funzione di utilità per inserire il colore nel prodotto.
*/
async function insertProductColor(productId: string, colorId: string) {
  const { error } = await supabase
    .from("product_colors")
    .insert([{ product_id: productId, color_id: colorId }])

  if (error) {
    throw new Error(`Errore nell'inserimento del colore del prodotto: ${error.message}`)
  }
}

/* 
  Funzione di utilità per caricare le immagini su Storage e inserirle nella tabella “images”.
  (  responsabile di tutta la logica di caricamento e inserimento).
  Restituisce un elenco di immagini inserite con successo.
*/
async function uploadAndInsertImages(
  productId: string,
  images: File[]
): Promise<UploadedImageInfo[]> {
  const uploadedImages: UploadedImageInfo[] = []

  for (const image of images) {
    // 1. Upload storage
    const imageUrl = await uploadProductImage(image, "product")
    if (!imageUrl) {
      throw new Error("Caricamento dell'immagine non riuscito")
    }

    // 2. Inserire il record in “immagini”
    const { data: insertedImage, error: insertImageError } = await supabase
      .from("images")
      .insert({
        product_id: productId,
        image_url: imageUrl.imageUrl,
        size: imageUrl.size,
        type: "product",
        uploaded_at: imageUrl.uploadedAt,
      })
      .select()
      .single()

    if (insertImageError || !insertedImage) {
      throw new Error(`Errore nell'inserimento dell'immagine: ${insertImageError?.message}`)
    }

    uploadedImages.push({
      imageUrl: insertedImage.image_url,
      size: insertedImage?.size,
      uploadedAt: insertedImage.uploaded_at,
    })
  }

  return uploadedImages
}

/* 
  Funzione di utilità per rimuovere il prodotto (rollback).
  ( è responsabile solo dell'eliminazione della riga in "products").
*/
async function rollbackProduct(productId: string) {
  await supabase.from("products").delete().eq("id", productId)
}

/* 
  Funzione principale createProduct, che orchestra chiaramente tutti i passaggi:
  1. Creare il prodotto 
  2. Inserire il colore 
  3. Carica le immagini 
  4. Se si verifica un errore in una qualsiasi fase, il prodotto viene annullato.
*/
export async function createProduct(product: ProductFormData) {
  
  const uploadedImages = []

  // 1. crea il prodotto
  const productData = await insertProduct(product)

  try {
    // 2. inserisce il colore (se presente)
    if (product.color) {
      await insertProductColor(productData.id, product.color)
    }

    // 3. Upload e inserimento delle immagini
    if (product.images && product.images.length > 0) {
      const validFiles = product.images.filter((file) => file instanceof File) as File[]
      const result = await uploadAndInsertImages(productData.id, validFiles)
      uploadedImages.push(...result)
    }

    // 4. Se tutto è andato bene, restituisci i dati del prodotto con le immagini caricate
    return {
      ...productData,
      images: uploadedImages,
    }
  } catch (error) {
    // Rollback manual
    await rollbackProduct(productData.id)
    throw error
  }
}

export default createProduct
