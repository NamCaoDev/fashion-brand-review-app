import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../configs/firebase'
import { SignInParams, SignUpParams } from './types'

const auth = getAuth()

const signIn = async (params: SignInParams) => {
  try {
    const { email, password } = params
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return Promise.resolve(userCredential)
  } catch (err) {
    return Promise.reject(err)
  }
}

const signUp = async (params: SignUpParams) => {
  try {
    const { email, password, displayName } = params
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential?.user, {
      displayName,
    })
    await setDoc(doc(db, 'users', userCredential?.user?.uid), {
      displayName,
      email,
      emailVerified: userCredential?.user?.emailVerified,
      id: userCredential?.user?.uid,
      photoURL: null,
      role: 'user',
    })
    return Promise.resolve(userCredential)
  } catch (err) {
    return Promise.reject(err)
  }
}

const logOut = async () => {
  try {
    const result = await signOut(auth)
    return Promise.resolve(result)
  } catch (err) {
    return Promise.reject(err)
  }
}

const authAPI = {
  signIn,
  logOut,
  signUp,
}

export default authAPI
