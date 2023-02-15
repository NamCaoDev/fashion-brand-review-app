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

export interface GetBrandsResponse {}
