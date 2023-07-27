const { createContext, useState } = require("react");

const initialTasks = [
  { id: 1, name: "Lecture", completed: false },
  { id: 2, name: "Grading", completed: true },
  { id: 3, name: "Assist", completed: false },
]

export const TasksContext = createContext({
  tasks: [],
  addTask: () => { },
  toggleCompleteTask: () => { },
  removeTask: () => { }
})

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks)

  const addTask = (taskName) => {
    const newTask = { id: tasks.length + 1, name: taskName, completed: false }
    setTasks(tasks.concat(newTask))
  }

  const removeTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId))
  }

  const toggleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map(t => {
      if (t.id === taskId) return { ...t, completed: !t.completed }
      return t
    })
    setTasks(updatedTasks)
  }

  const contextValue = {
    tasks,
    addTask,
    toggleCompleteTask,
    removeTask
  }

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  )
}
