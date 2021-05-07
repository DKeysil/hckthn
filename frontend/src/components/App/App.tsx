import React from 'react'
import styles from './app.module.scss'
import { Switch, Route, Redirect } from 'react-router-dom'
import Menu from './Menu/Menu'
import { PATHS } from '../../config'
import Tasks from '../Tasks/Tasks'
import Gantt from '../Gantt/Gantt'

function App() {
  return (
    <div className={styles.wrapper}>
      <Menu />
      <div className={styles.content}>
        <Switch>
          <Route path={PATHS.TASKS}>
            <Tasks />
          </Route>
          <Route path={PATHS.GANTT}>
            <Gantt />
          </Route>
          <Redirect to={PATHS.TASKS} />
        </Switch>
      </div>
    </div>
  )
}

export default App
