export interface GetBrandsParams {}

export type Brands = {
  id: string
  name: string
  description: string
  establishTime: {
    seconds: number
    nanoseconds: number
  }
  type: string
  logoUrl: string
  socials: {
    facebook: string
    tiktok: string
    instagram: string
    website: string
    shopee: string
  }
  bannerUrl?: string
  products?: any
}

export type CreateBrandParams = {
  name: string
  description: string
  slug: string
  establishTime?: string
  phoneNumber: string
  type: string
  socials: {
    facebook: string
    instagram: string
    tiktok: string
    shopee: string
    website: string
  }
  logoUrl: string
  bannerUrl: string
}

export interface GetBrandsResponse {}
