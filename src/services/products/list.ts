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
export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id, name, description, price, gender, material, 
      brand_id, category_id, created_at, updated_at, 
      brands(name), 
      categories(name), 
      images(image_url), 
      product_sizes(size_id), 
      product_colors(color_id, colors(name, hex_code)) 
    `);

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error("Error fetching products");
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return data;
};
