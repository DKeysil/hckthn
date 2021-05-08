import { Button, DatePicker, Drawer, Form, Input, Select } from 'antd'
import { Dispatch, useEffect } from 'react'
import styles from './newTask.module.scss'
import { Task } from '../../../interfaces/task'
import moment from 'moment'

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

  const handleFinish = async (values: any) => {
    const valuesCopy = { ...values }
    valuesCopy.start_date = values.interval[0].toJSON()
    valuesCopy.end_date = values.interval[1].toJSON()
    delete valuesCopy.interval
    valuesCopy.type = 1
    valuesCopy.column_order = tasks[values.state - 1].length
    console.log(values, valuesCopy)
    // await api.post(`/tasks/`, values)
  }

  useEffect(() => {
    if (!task) return
    const values = { ...task } as any
    values.interval = [moment(task.start_date), moment(task.end_date)]
  }, [task])

  return (
    <Drawer
      visible={visible}
      onClose={() => setVisible(false)}
      title="Create new task"
      className={styles.wrapper}
      width="600"
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        size="large"
        onFinish={handleFinish}
        form={form}
      >
        <Form.Item label="Task" name="username" rules={[{ required: true }]}>
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
            options={options}
          />
        </Form.Item>
        <Form.Item label="Mentors" name="mentors">
          <Select mode="multiple" placeholder="Mentors" options={options} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default NewTask
