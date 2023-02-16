import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { UploadParams } from './types'

const storage = getStorage()

const uploadFileToStorage = async (params: UploadParams) => {
  try {
    const { path, file } = params
    const fileRef = ref(storage, path)
    await uploadBytes(fileRef, file)
    const imageUrl = await getDownloadURL(fileRef)
    return Promise.resolve(imageUrl)
  } catch (err) {
    return Promise.reject(err)
  }
}

const uploadMultipleFilesToStorage = async (params: UploadParams[]) => {
  try {
    const listFileRefs = params?.map((p) => {
      return { ...p, fileRef: ref(storage, p.path) }
    })
    const listTasks = listFileRefs?.map((list) => uploadBytes(list.fileRef, list.file))
    await Promise.all(listTasks)
    const listDownloadUrls = listFileRefs.map((list) => getDownloadURL(list.fileRef))
    const imageUrls = await Promise.all(listDownloadUrls)
    return Promise.resolve(imageUrls)
  } catch (err) {
    return Promise.reject(err)
  }
}

const uploadAPI = {
  uploadFileToStorage,
  uploadMultipleFilesToStorage,
}

export default uploadAPI
