import { createAsyncThunk } from '@reduxjs/toolkit'
import { APIError } from '../types'
import productAPI from './productApi'
import { Product, GetProductsParams, CreateProductParams } from './types'

// Get Products
const getProducts = createAsyncThunk<Product[], GetProductsParams, { rejectValue: APIError }>(
  'products/get-products',
  async (params, { rejectWithValue }) => {
    try {
      return await productAPI.getProducts(params)
    } catch (err) {
      const error = err as APIError
      return rejectWithValue(error)
    }
  },
)

// Create Product
const createProduct = createAsyncThunk<any, CreateProductParams, { rejectValue: APIError }>(
  'products/create-product',
  async (params, { rejectWithValue }) => {
    try {
      return await productAPI.createProduct(params)
    } catch (err) {
      const error = err as APIError
      return rejectWithValue(error)
    }
  },
)

const productThunkActions = {
  getProducts,
  createProduct,
}

export default productThunkActions
