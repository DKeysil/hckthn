import { PageHeader } from 'antd'
import styles from './gantt.module.scss'
import { Chart } from 'react-google-charts'
import { useTasks } from '../../hooks/useTasks'
import moment from 'moment'

const Gantt = () => {
  const { data: tasks } = useTasks({ plan: 1 })

  const data = [
    [
      { type: 'string', label: 'Task ID' },
      { type: 'string', label: 'Task Name' },
      { type: 'date', label: 'Start Date' },
      { type: 'date', label: 'End Date' },
      { type: 'number', label: 'Duration' },
      { type: 'number', label: 'Percent Complete' },
      { type: 'string', label: 'Dependencies' },
    ],
    ...(tasks?.map((task) => [
      task.id.toString(),
      task.title,
      moment(task.start_date).toDate(),
      moment(task.end_date).toDate(),
      null,
      Math.min((task.state - 1) * 50, 100),
      task.depends_on?.toString() || null,
    ]) || []),
  ]

  return (
    <>
      <PageHeader title="Gantt Chart" className={styles.header} />
      <div className={styles.wrapper}>
        <Chart
          width={'100%'}
          chartType="Gantt"
          data={data}
          options={{
            tooltip: { isHtml: true },
            height: 400,
            gantt: {
              trackHeight: 52,
              palette: [
                {
                  color: '#b37feb',
                  dark: '#722ed1',
                  light: '#f9f0ff',
                },
              ],
            },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    </>
  )
}

export default Gantt
