import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../../configs/firebase'
import { CreateBrandParams, GetBrandsParams } from './types'

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

const brandAPI = {
  getBrands,
  createBrand,
}

export default brandAPI
