import { useMutation, useQuery } from 'react-query'
import api from '../api'
import { Notification } from '../interfaces/notification'

interface GetNotifications {
  plan?: number
}

const getNotifications = async (params?: GetNotifications) => {
  const { data } = await api.get(`/notifications/`, { params: { plan: params?.plan } })
  return data
}

const useNotifications = (params?: GetNotifications) =>
  useQuery<Notification[]>([`notifications`, params], () => getNotifications(params))

const patchNotification = async ({ id, ...notification }: { id: number }) => {
  const { data } = await api.patch(`/notifications/${id}/`, notification)
  return data
}

const useNotificationsMutation = () => {
  return useMutation<Notification, unknown, { id: number; [key: string]: unknown }>(
    patchNotification,
  )
}

export { useNotifications, useNotificationsMutation }
