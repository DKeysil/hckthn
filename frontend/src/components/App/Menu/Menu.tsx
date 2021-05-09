import React, { useEffect, useState } from 'react'
import { Badge, Menu as AntMenu, Typography } from 'antd'
import {
  CheckCircleOutlined,
  BarChartOutlined,
  MenuOutlined,
  BellOutlined,
} from '@ant-design/icons'
import classNames from 'classnames'
import styles from './menu.module.scss'
import { useHistory } from 'react-router-dom'
import { PATHS } from '../../../config'
import { useNotifications } from '../../../hooks/useNotifications'

const Menu = () => {
  const history = useHistory()
  const { data: notifications } = useNotifications()
  const [collapsed, setCollapsed] = useState(true)
  const [activeKey, setActiveKey] = useState(
    Object.values(PATHS).find((path) =>
      history.location.pathname.includes(path),
    ) as string,
  )

  const handleClick = ({ key }: { key: string | number }) => {
    history.push(key as string)
  }

  useEffect(() => {
    history.listen((location) =>
      setActiveKey(
        Object.values(PATHS).find((path) =>
          location.pathname.includes(path),
        ) as string,
      ),
    )
  }, [history])

  return (
    <AntMenu
      className={classNames(styles.wrapper)}
      mode="inline"
      onSelect={handleClick}
      inlineCollapsed={collapsed}
      selectedKeys={[activeKey]}
    >
      <div className={styles.titleWrapper}>
        <Typography.Title
          level={3}
          className={classNames(
            styles.title,
            collapsed && styles.titleCollapsed,
          )}
        >
          Tasked
        </Typography.Title>
        <MenuOutlined
          className={classNames(
            styles.button,
            collapsed && styles.buttonCollapsed,
          )}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
      <AntMenu.Item key="/tasks" icon={<CheckCircleOutlined />}>
        Tasks
      </AntMenu.Item>
      <AntMenu.Item key="/gantt" icon={<BarChartOutlined />}>
        Gantt
      </AntMenu.Item>
      <AntMenu.Item
        key="/notifications"
        icon={
          <Badge
            dot
            count={
              notifications?.filter((notification) => !notification.checked)
                .length
            }
          >
            <BellOutlined />
          </Badge>
        }
      >
        Notifications
      </AntMenu.Item>
    </AntMenu>
  )
}

export default Menu
