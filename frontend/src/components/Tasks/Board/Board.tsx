import React, { useCallback, useEffect, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import styles from './board.module.scss'
import Card from './Card/Card'
import { Button } from 'antd'
import { Task } from '../../../interfaces/task'
import { useTasksMutation } from '../../../hooks/useTasks'
import { useQueryClient } from 'react-query'
import NewTask from '../../common/NewTask/NewTask'

interface Props {
  tasks?: Task[]
}

const Board = (props: Props) => {
  const { tasks } = props
  const { mutateAsync: patchTask } = useTasksMutation()
  const [state, setState] = useState<Task[][]>([[], [], []])
  const queryClient = useQueryClient()

  const getItems = useCallback(
    (state: number) => {
      return (tasks as Task[])
        .filter((task) => state === task.state)
        .sort((a, b) => a.column_order - b.column_order)
    },
    [tasks],
  )

  useEffect(() => {
    if (!tasks) return
    setState([getItems(1), getItems(2), getItems(3)])
  }, [getItems, tasks])

  const handlePatchTask = async (
    task: Task,
    taskIndex: number,
    columnIndex: number,
    newState: Task[][],
  ) => {
    const taskCopy = {
      ...task,
      column_order: taskIndex,
      state: columnIndex + 1,
    }
    if (!taskCopy.mentors?.length) delete taskCopy.mentors
    await Promise.all(
      newState[columnIndex].map(async (task, index) => {
        if (index <= taskIndex) return
        await patchTask({ id: task.id, column_order: index + 1 })
      }),
    )
    await patchTask(taskCopy)
    await queryClient.invalidateQueries(`tasks`)
  }

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return
    const sourceId = parseInt(source.droppableId)
    const destinationId = parseInt(destination.droppableId)
    const sourceClone = Array.from(state[sourceId])
    const destinationClone = Array.from(state[destinationId])

    const [removed] = sourceClone.splice(source.index, 1)
    const result = {} as Record<string, Task[]>
    if (source.droppableId === destination.droppableId) {
      sourceClone.splice(destination.index, 0, removed)
      result[sourceId] = sourceClone
    } else {
      destinationClone.splice(destination.index, 0, removed)
      result[sourceId] = sourceClone
      result[destinationId] = destinationClone
    }
    const newState = [...state]
    newState[sourceId] = result[sourceId]
    newState[destinationId] = result[destinationId]

    setState(newState)
    handlePatchTask(removed, destination.index, destinationId, newState).then()
  }

  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button className={styles.button} onClick={() => setVisible(true)}>
        Add new item
      </Button>
      <div className={styles.wrapper}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((list, index) => (
            <Droppable key={index} droppableId={index.toString()}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={styles.list}
                >
                  {list.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Card task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
      <NewTask visible={visible} setVisible={setVisible} tasks={state} />
    </>
  )
}

export default Board
