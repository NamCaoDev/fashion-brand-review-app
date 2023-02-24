import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../configs/firebase'
import { CreateProductParams, GetProductsParams } from './types'

const getProducts = async (params: GetProductsParams) => {
  try {
    const fetchProducts = await getDocs(collection(db, 'products'))
    const products = fetchProducts?.docs?.map((doc: any) => ({ ...doc.data(), id: doc.id }))
    return Promise.resolve(products)
  } catch (err) {
    return Promise.reject(err)
  }
}

const createProduct = async (params: CreateProductParams) => {
  try {
    const newProduct = await setDoc(doc(db, 'products', params.slug), {
      ...params,
    })
    return Promise.resolve(newProduct)
  } catch (err) {
    return Promise.reject(err)
  }
}

const productAPI = {
  getProducts,
  createProduct,
}

export default productAPI
