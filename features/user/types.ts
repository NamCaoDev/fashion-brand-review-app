export interface GetUserParams {
  userId: string
}

export type User = {
  id: string
  displayName: string
  photoURL: string
  email: string
  emailVerified: boolean
  role: 'admin' | 'user'
}

export interface GetUsersResponse {}
