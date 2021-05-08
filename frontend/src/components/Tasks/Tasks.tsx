import { Typography, Tabs } from 'antd'
import styles from './tasks.module.scss'
import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Board from './Board/Board'
import List from './List/List'
import { useTasks } from '../../hooks/useTasks'
import { PATHS } from '../../config'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Tasks = () => {
  const history = useHistory()
  const view = useQuery().get(`view`)
  const { data: tasks } = useTasks()

  useEffect(() => {
    if (!view || ![`board`, `list`].includes(view)) {
      history.push(`${PATHS.TASKS}/?view=board`)
    }
  }, [history, view])

  const handleChangeTab = (tab: string) => {
    history.push(`${PATHS.TASKS}/?view=${tab}`)
  }

  if (!view) return null
  return (
    <>
      <div className={styles.header}>
        <Typography.Title level={4} className={styles.title}>
          Tasks
        </Typography.Title>
        <Tabs
          size="small"
          className={styles.tabs}
          activeKey={view}
          onChange={handleChangeTab}
        >
          <Tabs.TabPane tab="Board" key="board" />
          <Tabs.TabPane tab="List" key="list" />
        </Tabs>
      </div>
      <div className={styles.content}>
        {view === `board` ? <Board tasks={tasks} /> : <List tasks={tasks} />}
      </div>
    </>
  )
}

export default Tasks
