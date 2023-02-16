import { Brands } from 'features/brand/types'
import { Product } from 'features/product/types'

export type RootStackParamList = {
  Auth: {} | undefined
  ForgotPassword: {} | undefined
  Verify: {} | undefined
  RootTab: {} | undefined
  Home: {} | undefined
  Brand: Brands | undefined
  Product: Product | undefined
  Profile: {} | undefined
  SignIn: {} | undefined
  SignUp: {} | undefined
  CreateBrand: {} | undefined
}
