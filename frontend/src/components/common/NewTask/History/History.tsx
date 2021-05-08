import { Typography, Timeline } from 'antd'
import { Task } from '../../../../interfaces/task'
import moment from 'moment'
import { useUsers } from '../../../../hooks/useUsers'

interface Props {
  history: Task['histories']
}

const eventToName = {
  1: `Initialized`,
  2: `Closed`,
  3: `Description changed`,
  4: `State changed`,
}

const History = (props: Props) => {
  const { history } = props
  const { data: users } = useUsers()

  return (
    <>
      <Typography.Title level={3} style={{ marginBottom: 24 }}>
        History
      </Typography.Title>
      <Timeline reverse>
        {history.map((stage) => (
          <Timeline.Item>
            {eventToName[stage.type]} at{' '}
            {moment(stage.timestamp).format(`HH:mm DD-MM-YYYY`)}
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  )
}

export default History
