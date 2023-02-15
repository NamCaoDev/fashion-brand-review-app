import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../configs/firebase'
import { GetBrandsParams } from './types'

const getBrands = async (params: GetBrandsParams) => {
  try {
    let products
    const fetchBrands = await getDocs(collection(db, 'brands'))
    const brands = fetchBrands?.docs?.map((doc: any) => ({ ...doc.data(), id: doc.id }))
    return Promise.resolve(brands)
  } catch (err) {
    return Promise.reject(err)
  }
}

const brandAPI = {
  getBrands,
}

export default brandAPI
