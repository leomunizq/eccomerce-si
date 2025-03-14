import httpClient from '@/lib/http-client'

export const deleteProduct = async ({ productId }: { productId: string }) => {
  const response = await httpClient.delete(`/products?id=eq.${productId}`, {
    headers: {
      Prefer: 'return=representation'
    }
  })

  const { error } = response.data

  if (error) {
    console.error(`Errore nell'eliminazione del prodotto:`, error)
    return false
  }
  const result = response.data
  return result
}
