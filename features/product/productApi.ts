import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../../configs/firebase'
import { GetProductsParams } from './types'

const getProducts = async (params: GetProductsParams) => {
  try {
    const fetchProducts = await getDocs(collection(db, 'products'))
    const products = fetchProducts?.docs?.map((doc: any) => ({ ...doc.data(), id: doc.id }))
    return Promise.resolve(products)
  } catch (err) {
    return Promise.reject(err)
  }
}

const productAPI = {
  getProducts,
}

export default productAPI
