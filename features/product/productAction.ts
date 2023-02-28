import { createAsyncThunk } from '@reduxjs/toolkit'
import { APIError } from '../types'
import productAPI from './productApi'
import { Product, GetProductsParams, CreateProductParams, UpdateProductParams } from './types'

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

// Update Product
const updateProduct = createAsyncThunk<any, UpdateProductParams, { rejectValue: APIError }>(
  'products/update-product',
  async (params, { rejectWithValue }) => {
    try {
      return await productAPI.updateProduct(params)
    } catch (err) {
      const error = err as APIError
      return rejectWithValue(error)
    }
  },
)

const productThunkActions = {
  getProducts,
  createProduct,
  updateProduct,
}

export default productThunkActions
