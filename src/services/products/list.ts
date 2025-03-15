// funzione per ottenere i prodotti con filtri, incluso colore
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

type ProductBase = Database["public"]["Tables"]["products"]["Row"];

export type Product = ProductBase & {
  brands?: { name: string } | null;
  categories?: { name: string } | null;
  images?: { image_url: string }[] | null;
  product_sizes?: { size_id: string }[] | null;
  product_colors?: { 
    color_id: string;
    colors?: { name: string; hex_code: string } | null;
  }[] | null;
};

export interface GetProductsParams {
  color?: string[];
  brand?: string[];
  category?: string[];
  minPrice?: number;
  maxPrice?: number;
  gender?: string[];
  search?: string;
  material?: string[];
  orderBy?: "price" | "name" | "created_at" | "updated_at";
  orderDirection?: "asc" | "desc";
  page?: number;
  limit?: number;

}

export interface GetProductsResult {
  products: Product[];
  total: number;
}

export async function getProducts(params: GetProductsParams = {}): Promise<GetProductsResult> {
  
  // ------------------------------------------------------------------------------------
  // 1) Se ho dei colori da filtrare, per prima cosa ottengo tutti i product_id corrispondenti
  // ------------------------------------------------------------------------------------
  let productIdsByColor: string[] | null = null;

  // Isolare la logica del filtraggio per colore
  if (params.color && params.color.length > 0) {
    const { data: productColorsData, error: productColorError } = await supabase
      .from("product_colors")
      .select("product_id")
      .in("color_id", params.color);

    if (productColorError) {
      console.error(productColorError);
      throw new Error("Error to filter by color");
    }

    // Estrae solo il product_id
    productIdsByColor = productColorsData?.map(item => item.product_id).filter(id => id !== null) as string[] || [];
    
    // Se non ci sono prodotti nei colori desiderati, restituisce un array vuoto
    if (productIdsByColor.length === 0) {
      return {
        products: [],
        total: 0,
      };
    }
  }

  // ------------------------------------------------------------------------------------
  // 2) Ho impostato la query principale nella tabella "products"
  // ------------------------------------------------------------------------------------
  let query = supabase
    .from("products")
    .select(`
      id, name, description, price, gender, material,
      brand_id, category_id, created_at, updated_at,
      brands(name),
      categories(name),
      images(image_url),
      product_sizes(size_id),
      product_colors(
        color_id,
        colors(name, hex_code)
      )
    `, { count: "exact" });

  // Se ho filtrato per colore sopra, applico in() al product_id restituito
  if (productIdsByColor) {
    query = query.in("id", productIdsByColor);
  }

  //  Filtraggio di altri campi
  if (params.search) {
    query = query.ilike("name", `%${params.search}%`);
  }

  if (params.brand && params.brand.length > 0) {
    query = query.in("brand_id", params.brand);
  }

  if (params.category && params.category.length > 0) {
    query = query.in("category_id", params.category);
  }

  if (params.gender && params.gender.length > 0) {
    query = query.in("gender", params.gender);
  }

  if (params.material && params.material.length > 0) {
    query = query.in("material", params.material);
  }

  if (params.minPrice !== undefined) {
    query = query.gte("price", params.minPrice);
  }

  if (params.maxPrice !== undefined) {
    query = query.lte("price", params.maxPrice);
  }

  // Ordinamento
  if (params.orderBy) {
    query = query.order(params.orderBy, {
      ascending: params.orderDirection === "asc",
    });
  }

  // Paginazione
  if (params.page !== undefined && params.limit !== undefined) {
    const start = (params.page - 1) * params.limit;
    const end = start + params.limit - 1;
    query = query.range(start, end);
  }

  // ------------------------------------------------------------------------------------
  // 3) Esegue la query principale e restituisce i risultati
  // ------------------------------------------------------------------------------------
  const { data, error, count } = await query;
  if (error) {
    throw new Error("Error to search products");
  }

  return {
    products: data as Product[],
    total: count ?? 0,
  }
}
