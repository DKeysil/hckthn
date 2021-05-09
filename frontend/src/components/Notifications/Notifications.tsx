import styles from './notifications.module.scss'
import { List, PageHeader } from 'antd'
import {
  useNotifications,
  useNotificationsMutation,
} from '../../hooks/useNotifications'
import { useTasks } from '../../hooks/useTasks'
import moment from 'moment'
import NewTask from '../common/NewTask/NewTask'
import { useCallback, useState } from 'react'
import { Task } from '../../interfaces/task'
import classNames from 'classnames'
import { useQueryClient } from 'react-query'

const Notifications = () => {
  const { data: notifications } = useNotifications()
  const { mutateAsync: patchNotification } = useNotificationsMutation()
  const { data: tasks } = useTasks()
  const [task, setTask] = useState<Task>()
  const [visible, setVisible] = useState(false)
  const queryClient = useQueryClient()

  const getItems = useCallback(
    (state: number) => {
      return (tasks as Task[])
        .filter((task) => state === task.state)
        .sort((a, b) => a.column_order - b.column_order)
    },
    [tasks],
  )

  const handleClick = async (task?: Task) => {
    if (!task) return
    setTask(task)
    setVisible(true)
    const notification = notifications?.find(
      (notification) => notification.task === task.id,
    )
    if (notification) {
      await patchNotification({ id: notification.id, checked: true })
      await queryClient.invalidateQueries([`notifications`])
    }
  }

  return (
    <>
      <PageHeader title="Notifications" className={styles.header} />
      <div className={styles.wrapper}>
        <List>
          {notifications
            ?.sort((a, b) => (a.checked ? 1 : 0) - (b.checked ? 1 : 0))
            .map((notification) => (
              <List.Item
                className={classNames(
                  styles.item,
                  notification.checked && styles.disabled,
                )}
                onClick={() =>
                  handleClick(
                    tasks?.find((task) => task.id === notification.task),
                  )
                }
                key={notification.id}
                actions={[
                  moment(notification.timestamp).format(`HH:mm DD-MM-YYYY`),
                ]}
              >
                Missed deadline of task{' '}
                {tasks?.find((task) => task.id === notification.task)?.title}
              </List.Item>
            ))}
        </List>
      </div>
      {task && tasks && (
        <NewTask
          visible={visible}
          setVisible={setVisible}
          tasks={[getItems(1), getItems(2), getItems(3)]}
          task={task}
        />
      )}
    </>
  )
}

export default Notifications
