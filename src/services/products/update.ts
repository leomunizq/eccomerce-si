import { supabase } from "@/lib/supabase";
import { uploadProductImage } from "./upload-image";

interface ProductData {
  id: string;
  color?: string;
  images?: File[];
  name: string;
  description: string;
  price: number;
  brand_id: string;
  category_id: string;
  gender: string;
  material: string;
}

/* 
  Funzione di utilità per upadte del prodotto.
  (  è responsabile solo dell'aggiornamento della riga in "products").
*/
async function updateProductData(product: ProductData) {
  const { data, error } = await supabase
    .from("products")
    .update({
      name: product.name,
      description: product.description,
      price: product.price,
      brand_id: product.brand_id,
      category_id: product.category_id,
      gender: product.gender,
      material: product.material,
    })
    .eq("id", product.id)
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Erro ao atualizar produto: ${error?.message}`);
  }

  return data;
}

/* 
  Funzione di utilità per update del colore nel prodotto.
*/
async function updateProductColor(productId: string, newColor: string) {
  // remove existent color
  const { error: deleteError } = await supabase
    .from("product_colors")
    .delete()
    .eq("product_id", productId);
  if (deleteError) {
    throw new Error(`Erro ao remover cor existente: ${deleteError.message}`);
  }

  // add new color 
  if (newColor) {
    const { error: colorError } = await supabase
      .from("product_colors")
      .insert([{ product_id: productId, color_id: newColor }]);
    if (colorError) {
      throw new Error(`Erro ao inserir cor: ${colorError.message}`);
    }
  }
}


/* 
  Funzione di utilità per caricare le immagini su Storage e inserirle nella tabella “images”.
  (  responsabile di tutta la logica di caricamento e inserimento).
  Restituisce un elenco di immagini inserite con successo.
*/
async function uploadAndInsertImages(productId: string, images: File[]) {
  const uploadedImages: { imageUrl: string; size?: string; uploadedAt?: string }[] = [];

  for (const image of images) {
    // 1. Upload Storage
    const imageUrl = await uploadProductImage(image, "product");
    if (!imageUrl) {
      throw new Error("Falha ao fazer upload de imagem");
    }

    // 2. Insere no banco
    const { error: insertImageError } = await supabase
      .from("images")
      .insert({
        product_id: productId,
        image_url: imageUrl.imageUrl,
        size: imageUrl.size,
        type: "product",
        uploaded_at: imageUrl.uploadedAt,
      });

    if (insertImageError) {
      throw new Error(`Erro ao inserir imagem no banco: ${insertImageError.message}`);
    }

    uploadedImages.push({
      imageUrl: imageUrl.imageUrl,
      size: imageUrl.size,
      uploadedAt: imageUrl.uploadedAt,
    });
  }

  return uploadedImages;
}


async function rollbackProduct(productId: string) {
  await supabase.from("products").delete().eq("id", productId)
}

/*
  updateProduct:
  1. Aggiorna i dati del prodotto
  2. Aggiorna il colore (rimuove il vecchio, aggiunge il nuovo)
  3.   Carica le immagini
  4. Rollback manuale in caso di errore
*/
export async function updateProduct(product: ProductData) {
  const { id, color, images } = product;
  let updatedProduct;

  try {
    // 1. update product data
    updatedProduct = await updateProductData(product);

    // 2. update color
    if (color) {
      await updateProductColor(id, color);
    }

    // 3. Upload and insert images
    let newImages: { imageUrl: string; size?: string; uploadedAt?: string }[] = [];
    if (images && images.length > 0) {
      newImages = await uploadAndInsertImages(id, images);
    }

    // 4. Return updated product with new images 
    return { ...updatedProduct, newImages };
  } catch (err) {
    rollbackProduct(id);
    throw err;
  }
}

export default updateProduct;
