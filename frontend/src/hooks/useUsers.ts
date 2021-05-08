import { useMutation, useQuery } from 'react-query'
import api from '../api'
import { User } from '../interfaces/user'

const getUsers = async () => {
  const { data } = await api.get(`/users/`)
  return data
}

const useUsers = () => useQuery<User[]>(`users`, getUsers)

const patchUser = async ({ id, ...user }: { id: number }) => {
  const { data } = await api.patch(`/users/${id}/`, user)
  return data
}

const useUsersMutation = () => {
  return useMutation<User, unknown, { id: number; [key: string]: unknown }>(
    patchUser,
  )
}

export { useUsers, useUsersMutation }
