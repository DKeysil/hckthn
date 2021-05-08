import { useMutation, useQuery } from 'react-query'
import api from '../api'
import { Task } from '../interfaces/task'

const getTasks = async () => {
  const { data } = await api.get(`/tasks/`)
  return data
}

const useTasks = () => useQuery<Task[]>(`tasks`, getTasks)

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
