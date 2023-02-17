import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../configs/firebase'
import { CreateBrandParams, GetBrandsParams, UpdateBrandParams } from './types'

const getBrands = async (params: GetBrandsParams) => {
  try {
    const fetchBrands = await getDocs(collection(db, 'brands'))
    const brands = fetchBrands?.docs?.map((doc: any) => ({ ...doc.data(), id: doc.id }))
    return Promise.resolve(brands)
  } catch (err) {
    return Promise.reject(err)
  }
}

const createBrand = async (params: CreateBrandParams) => {
  try {
    const newBrand = await setDoc(doc(db, 'brands', params.slug), {
      ...params,
    })
    return Promise.resolve(newBrand)
  } catch (err) {
    return Promise.reject(err)
  }
}

const updateBrand = async (params: UpdateBrandParams) => {
  const { id, data } = params
  try {
    const brandUpdate = await updateDoc(doc(db, 'brands', id), data)
    return Promise.resolve(brandUpdate)
  } catch (err) {
    return Promise.reject(err)
  }
}

const deleteBrand = async (params: { id: string }) => {
  const { id } = params
  try {
    const brandUpdate = await deleteDoc(doc(db, 'brands', id))
    return Promise.resolve(brandUpdate)
  } catch (err) {
    return Promise.reject(err)
  }
}

const brandAPI = {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
}

export default brandAPI
