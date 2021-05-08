import { useMutation, useQuery, useQueryClient } from 'react-query'
import api from '../api'
import { Task } from '../interfaces/task'

const getTasks = async () => {
  const { data } = await api.get(`/tasks/`)
  return data
}

const useTasks = () => useQuery<Task[]>(`tasks`, getTasks)

const patchTask = async ({ id, ...task }: Task) => {
  const { data } = await api.patch(`/tasks/${id}/`, task)
  return data
}

const useTasksMutation = () => {
  const queryClient = useQueryClient()
  return useMutation<Task, unknown, Task>(patchTask, {
    onSettled: () => queryClient.invalidateQueries(`tasks`),
  })
}

export { useTasks, useTasksMutation }
