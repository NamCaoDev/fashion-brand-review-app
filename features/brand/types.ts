export interface GetBrandsParams {}

export type Brands = {
  id: string
  name: string
  description: string
  establishTime: {
    seconds: number
    nanoseconds: number
  }
  phoneNumber?: string
  addresses?: string[]
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
  slug?: string
}

export type CreateBrandParams = {
  name: string
  description: string
  slug: string
  establishTime?: any
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
  addresses?: string[]
}

export type UpdateBrandParams = {
  id: string
  data: {
    name?: string
    description?: string
    slug?: string
    establishTime?: any
    phoneNumber?: string
    type?: string
    socials?: {
      facebook?: string
      instagram?: string
      tiktok?: string
      shopee?: string
      website?: string
    }
    logoUrl?: string
    bannerUrl?: string
    addresses?: string[]
  }
}

export interface GetBrandsResponse {}
