import { collection, getDocs, doc, getDoc, setDoc, addDoc, arrayUnion, updateDoc } from 'firebase/firestore'
import { db } from '../../configs/firebase'
import { CreateProductParams, GetProductsParams, UpdateProductParams } from './types'

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
    await setDoc(
      doc(db, 'brands', brandId as string),
      {
        products: arrayUnion(doc(db, 'products', newProduct.id)),
      },
      { merge: true },
    )
    return Promise.resolve(newProduct)
  } catch (err) {
    return Promise.reject(err)
  }
}

const updateProduct = async (params: UpdateProductParams) => {
  const { id, data } = params
  try {
    const brandUpdate = await updateDoc(doc(db, 'products', id), data)
    return Promise.resolve(brandUpdate)
  } catch (err) {
    return Promise.reject(err)
  }
}

const productAPI = {
  getProducts,
  createProduct,
  updateProduct,
}

export default productAPI
