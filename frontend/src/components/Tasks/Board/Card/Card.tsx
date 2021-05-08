import { Card as AntCard, Typography } from 'antd'
import styles from './card.module.scss'
import { Task } from '../../../../interfaces/task'
import { useState } from 'react'
import NewTask from '../../../common/NewTask/NewTask'

interface Props {
  task: Task
  tasks?: Task[][]
}

const Card = (props: Props) => {
  const { task, tasks } = props
  const [visible, setVisible] = useState(false)

  return (
    <div className={styles.wrapper}>
      <AntCard onClick={() => setVisible(true)}>
        <Typography.Text>{task.title}</Typography.Text>
      </AntCard>
      {task && tasks && (
        <NewTask
          visible={visible}
          setVisible={setVisible}
          tasks={tasks}
          task={task}
        />
      )}
    </div>
  )
}

export default Card
