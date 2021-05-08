import { useCallback, useState } from 'react'
import { Task } from '../../../interfaces/task'
import { Divider, List as AntList } from 'antd'
import NewTask from '../../common/NewTask/NewTask'
import styles from './list.module.scss'

interface Props {
  tasks?: Task[]
}

const List = (props: Props) => {
  const { tasks } = props
  const [visible, setVisible] = useState(false)
  const [task, setTask] = useState<Task>()

  const getItems = useCallback(
    (state: number) => {
      return (tasks as Task[])
        .filter((task) => state === task.state)
        .sort((a, b) => a.column_order - b.column_order)
    },
    [tasks],
  )

  const handleClick = (task: Task) => {
    setTask(task)
    setVisible(true)
  }

  if (!tasks) return null
  return (
    <div className={styles.wrapper}>
      <Divider orientation="left">To Do</Divider>
      <AntList>
        {getItems(1).map((task) => (
          <AntList.Item
            key={task.id}
            onClick={() => handleClick(task)}
            className={styles.item}
            actions={[task.description]}
          >
            {task.title}
          </AntList.Item>
        ))}
      </AntList>
      <Divider orientation="left">In Progress</Divider>
      <AntList>
        {getItems(1).map((task) => (
          <AntList.Item
            key={task.id}
            onClick={() => handleClick(task)}
            className={styles.item}
          >
            {task.title}
          </AntList.Item>
        ))}
      </AntList>
      <Divider orientation="left">Done</Divider>
      <AntList>
        {getItems(1).map((task) => (
          <AntList.Item
            key={task.id}
            onClick={() => handleClick(task)}
            className={styles.item}
          >
            {task.title}
          </AntList.Item>
        ))}
      </AntList>
      <Divider className={styles.closed} orientation="left">Closed</Divider>
      <AntList>
        {getItems(1).map((task) => (
          <AntList.Item
            key={task.id}
            onClick={() => handleClick(task)}
            className={styles.closed}
          >
            {task.title}
          </AntList.Item>
        ))}
      </AntList>
      {task && tasks && (
        <NewTask
          visible={visible}
          setVisible={setVisible}
          tasks={[getItems(1), getItems(2), getItems(3)]}
          task={task}
        />
      )}
    </div>
  )
}

export default List
