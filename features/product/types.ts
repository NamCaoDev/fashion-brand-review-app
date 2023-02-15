export type Product = {
  id: string
  name: string
  colors: string[]
  details: string[]
  material: string[]
  form: string
  price: number
  slug: string
  technology?: string
  type: string
  brand?: any
  status?: string
  images: string[]
  rating?: number
}

export interface GetProductsParams {}
