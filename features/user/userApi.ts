import { collection, getDoc, doc } from 'firebase/firestore'
import { db } from '../../configs/firebase'
import { GetUserParams } from './types'

const getUserAuth = async (params: GetUserParams) => {
  try {
    const { userId } = params
    const user = await getDoc(doc(db, 'users', userId))
    return Promise.resolve(user.data())
  } catch (err) {
    return Promise.reject(err)
  }
}

const userAPI = {
  getUserAuth,
}

export default userAPI
