import React, { useEffect, useState } from 'react'
import styles from './app.module.scss'
import { Switch, Route, Redirect } from 'react-router-dom'
import Menu from './Menu/Menu'
import { PATHS } from '../../config'
import Tasks from '../Tasks/Tasks'
import Gantt from '../Gantt/Gantt'
import api from '../../api'
import Login from '../Login/Login'
import Notifications from '../Notifications/Notifications'

function App() {
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem(`token`)

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }
    api
      .post(`/token/refresh/`, { refresh: token })
      .then(({ data }) => {
        api.defaults.headers.Authorization = `Bearer ${data.access}`
        setAuthorized(true)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [token])

  if (loading) return null
  return authorized ? (
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
          <Route path={PATHS.NOTIFICATIONS}>
            <Notifications />
          </Route>
          <Redirect to={PATHS.TASKS} />
        </Switch>
      </div>
    </div>
  ) : (
    <Switch>
      <Route path={PATHS.LOGIN}>
        <Login setAuthorized={setAuthorized} />
      </Route>
      <Redirect to={PATHS.LOGIN} />
    </Switch>
  )
}

export default App
