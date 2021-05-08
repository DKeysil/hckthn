import { Typography, Tabs } from 'antd'
import styles from './tasks.module.scss'
import React, { useState } from 'react'
import Board from './Board/Board'
import List from './List/List'
import { useTasks } from '../../hooks/useTasks'

const Tasks = () => {
  const { data: tasks } = useTasks()
  const [view, setView] = useState(`board`)

  const handleChangeTab = (tab: string) => {
    setView(tab)
  }

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
        {view === `board` ? <Board tasks={tasks} /> : <List />}
      </div>
    </>
  )
}

export default Tasks
