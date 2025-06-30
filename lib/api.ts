import { API_BASE_URL_API } from "@/constants/api";
import { ProductCompatibility, Product } from "@/types/products";

export async function getCompatibleProducts(
  fuelTypeId: string | number,
  targetCategory: string | null
): Promise<Product[]> {
  const res = await fetch(
    `${API_BASE_URL_API}/product_compatibilities?fuelType=/api/fuel_types/${fuelTypeId}`,
    {
      headers: { Accept: "application/json" },
    }
  );

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data: ProductCompatibility[] = await res.json();

  return data
    .map((entry) => entry.product)
    .filter((product) => product?.category === targetCategory);
}
