import { useMutation, useQuery } from 'react-query'
import api from '../api'
import { Task } from '../interfaces/task'

interface GetTasks {
  plan?: number
}

const getTasks = async (params?: GetTasks) => {
  const { data } = await api.get(`/tasks/`, { params: { plan: params?.plan } })
  return data
}

const useTasks = (params?: GetTasks) =>
  useQuery<Task[]>([`tasks`, params], () => getTasks(params))

const patchTask = async ({ id, ...task }: { id: number }) => {
  const { data } = await api.patch(`/tasks/${id}/`, task)
  return data
}

const useTasksMutation = () => {
  return useMutation<Task, unknown, { id: number; [key: string]: unknown }>(
    patchTask,
  )
}

export { useTasks, useTasksMutation }
