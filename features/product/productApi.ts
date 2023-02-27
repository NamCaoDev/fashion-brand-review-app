import { collection, getDocs, doc, getDoc, setDoc, addDoc, updateDoc, FieldValue } from 'firebase/firestore'
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
    const brandId = params.brandId
    const brand = doc(db, 'brands', brandId as string)
    delete params.brandId
    const newProduct = await addDoc(collection(db, 'products'), {
      ...params,
      brand,
    })
    console.log('New product', newProduct)
    // await setDoc(
    //   doc(db, 'brands', brandId as string),
    //   {
    //     products: [],
    //   },
    //   { merge: true },
    // )
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
