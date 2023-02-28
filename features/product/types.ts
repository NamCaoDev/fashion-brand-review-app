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

export type CreateProductParams = {
  name: string
  colors: string[]
  details: string[]
  material: string[]
  form: string
  price: number
  slug: string
  technology?: string
  type: string
  brandId?: string
  status?: string
  images: string[]
}

export type UpdateProductParams = {
  id: string
  data: {
    name?: string
    colors?: string[]
    details?: string[]
    material?: string[]
    form?: string
    price?: number
    slug?: string
    technology?: string
    type?: string
    brandId?: string
    status?: string
    images?: string[]
  }
}

export interface GetProductsParams {}
