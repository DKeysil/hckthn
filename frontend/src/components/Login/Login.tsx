import styles from './login.module.scss'
import { Button, Card, Form, Input, message } from 'antd'
import api from '../../api'
import { Dispatch } from 'react'

interface Props {
  setAuthorized: Dispatch<boolean>
}

const Login = (props: Props) => {
  const { setAuthorized } = props

  const handleFinish = async (values: Record<string, unknown>) => {
    try {
      const { data } = await api.post(`/token/`, values)
      api.defaults.headers.Authorization = `Bearer ${data.access}`
      localStorage.setItem(`token`, data.refresh)
      setAuthorized(true)
    } catch (error) {
      console.error(error)
      message.error(`Ошибка входа`)
    }
  }

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <Form
          onFinish={handleFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
