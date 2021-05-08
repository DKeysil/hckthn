import { Card as AntCard, Typography } from 'antd'
import styles from './card.module.scss'
import { Task } from '../../../../interfaces/task'

interface Props {
  task: Task
}

const Card = (props: Props) => {
  const { task } = props

  return (
    <div className={styles.wrapper}>
      <AntCard>
        <Typography.Text>{task.title}</Typography.Text>
      </AntCard>
    </div>
  )
}

export default Card
