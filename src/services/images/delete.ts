import httpClient from '@/lib/http-client'

export const deleteImage = async ({
  id,
  image_url
}: {
  id: string
  image_url: string
}) => {
  try {
    if (!image_url) {
      throw new Error('image_url must not be empty!')
    }

    const { data } = await httpClient.delete(`/images?id=eq.${id}`)

    return data
  } catch (error) {
    console.error('Error when deleting image:', error)
    throw new Error(`An error occurred while deleting the image. ${error}`)
  }
}

export default deleteImage
