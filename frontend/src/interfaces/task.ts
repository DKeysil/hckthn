enum Type {
  task = 1,
  issue,
}

enum State {
  todo = 1,
  doing,
  done,
  closed,
}

export interface Task {
  id: number
  title: string
  description: string
  start_date: string
  column_order: number
  end_date?: string
  type: Type
  state: State
  plan: number
  responsibles: number
  mentors?: []
}
