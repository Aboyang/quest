import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [enterTask, setEnterTask] = useState('')
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || [])

  tasks.sort((a, b) => a[1] - b[1]) // incomplete task on top

  let deleteOccured = false

  // update to local storage whenever tasks changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // add task
  function addTask() {

    setTasks(prevTasks => {

      const newTasks = [...prevTasks, [enterTask, false]]
      setEnterTask('') // clear field after added

      return newTasks
    })
  }

  // delete task
  function deleteTask(targetIndex) {
    
    setTasks(prevTasks => {

      // filter by retaining the items which indexes are not the targeted index
      const newTasks = prevTasks.filter((_, index) => 
        index != targetIndex
      )

      return newTasks

    })

    deleteOccured = true // to avoid single click event (toggle)

  }

  // check and uncheck task
  function toggle(targetIndex) {

    // set timeout to avoid conflict between single click and double click

    setTimeout(() => {

      if (deleteOccured) {return} // toggle avoided if deletion occurs

      setTasks(prevTasks => {

        const newTasks = prevTasks.map((task, index) =>
          index == targetIndex? [task[0], !task[1]] : task
        )
  
        return newTasks
      })
    }, 500)
  }


  return (
    <>
    <ul className='tasks'>

      {tasks.map((task, index) => (
        <li 
          key={index} 
          className={task[1]? 'task completed' : 'task'} 
          onClick={() => toggle(index)}
          onDoubleClick={() => deleteTask(index)}
        >
          {task[0]}
        </li>
      ))}

    </ul>

    <div className='entry'>

      <input 
        type='text' 
        value={enterTask} 
        placeholder='Enter Task' 
        onChange={(e) => setEnterTask(e.target.value)}
      />

      <button onClick={addTask}>+</button>

    </div>

    </>
  )
}

export default App
