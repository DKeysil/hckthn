import { Card as AntCard, Typography } from 'antd'
import styles from './card.module.scss'

const Card = () => {
  return (
    <div className={styles.wrapper}>
      <AntCard>
        <Typography.Text>Task</Typography.Text>
      </AntCard>
    </div>
  )
}

export default Card
