import { Button, DatePicker, Drawer, Form, Input, Select } from 'antd'
import { Dispatch, useEffect } from 'react'
import styles from './newTask.module.scss'
import { Task } from '../../../interfaces/task'
import moment from 'moment'
import api from '../../../api'
import History from './History/History'
import { useQueryClient } from 'react-query'
import { useUsers } from '../../../hooks/useUsers'

interface Props {
  visible: boolean
  setVisible: Dispatch<boolean>
  tasks: Task[][]
  task?: Task
}

const options = [
  { value: 1, label: `To Do` },
  { value: 2, label: `In Progress` },
  { value: 3, label: `Done` },
]

const NewTask = (props: Props) => {
  const { visible, setVisible, tasks, task } = props
  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const { data: users } = useUsers()

  const handleFinish = async (values: any) => {
    const valuesCopy = { ...values }
    valuesCopy.start_date = values.interval[0].toJSON()
    valuesCopy.end_date = values.interval[1].toJSON()
    delete valuesCopy.interval
    valuesCopy.type = 1
    valuesCopy.plan = 1
    valuesCopy.column_order = tasks[values.state - 1].length
    if (!valuesCopy.mentors?.length) delete valuesCopy.mentors
    if (task) await api.patch(`/tasks/${task.id}/`, valuesCopy)
    else await api.post(`/tasks/`, valuesCopy)
    setVisible(false)
    await queryClient.invalidateQueries([`tasks`])
  }

  const handleDelete = async () => {
    if (task) await api.delete(`/tasks/${task.id}`)
    setVisible(false)
    await queryClient.invalidateQueries([`tasks`])
  }

  useEffect(() => {
    if (!task) return
    const values = { ...task } as any
    values.interval = [moment(task.start_date), moment(task.end_date)]
    form.setFieldsValue(values)
  }, [form, task])

  const usersOptions = users?.map((user) => ({
    value: user.id,
    label: user.username,
  }))

  return (
    <Drawer
      visible={visible}
      onClose={() => setVisible(false)}
      title={task ? task.title : `New task`}
      width="600"
      className={styles.wrapper}
    >
      <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        size="large"
        onFinish={handleFinish}
      >
        <Form.Item label="Task" name="title" rules={[{ required: true }]}>
          <Input placeholder="Task" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item
          label="Interval"
          name="interval"
          rules={[{ required: true }]}
        >
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item label="State" name="state" rules={[{ required: true }]}>
          <Select placeholder="State" options={options} />
        </Form.Item>
        <Form.Item
          label="Responsibles"
          name="responsibles"
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            placeholder="Responsibles"
            options={usersOptions}
          />
        </Form.Item>
        <Form.Item label="Mentors" name="mentors">
          <Select
            mode="multiple"
            placeholder="Mentors"
            options={usersOptions}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
          <Button type="primary" htmlType="submit">
            {task ? `Save` : `Create`}
          </Button>
          {task && (
            <Button className={styles.delete} danger onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Form.Item>
      </Form>
      {task && !!task.histories.length && <History history={task.histories} />}
    </Drawer>
  )
}

export default NewTask
