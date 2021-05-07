import React, { useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import styles from './board.module.scss'
import Card from './Card/Card'
import { Button } from 'antd'

// fake data generator
const getItems = (count: number, offset = 0) => {
  return Array.from({ length: count }, (v, k) => k).map(
    (k) => `item-${k + offset}-${new Date().getTime()}`,
  )
}

const Board = () => {
  const [state, setState] = useState<string[][]>([
    getItems(10),
    getItems(5, 10),
    getItems(5, 15),
  ])

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return
    const sourceId = parseInt(source.droppableId)
    const destinationId = parseInt(destination.droppableId)
    const sourceClone = Array.from(state[sourceId])
    const destinationClone = Array.from(state[destinationId])

    const [removed] = sourceClone.splice(source.index, 1)
    destinationClone.splice(destination.index, 0, removed)

    const result = {} as Record<string, string[]>
    result[source.droppableId] = sourceClone
    result[destination.droppableId] = destinationClone
    const newState = [...state]
    newState[sourceId] = result[sourceId]
    newState[destinationId] = result[destinationId]

    setState(newState)
  }

  return (
    <>
      <Button
        className={styles.button}
        onClick={() => {
          setState([...state, getItems(1)])
        }}
      >
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
                  {list.map((id, index) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Card />
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
    </>
  )
}

export default Board
