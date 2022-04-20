import { useState, useEffect } from "react"
import Header from './/components/Header'
import Tasks from './/components/Tasks'
import AddTask from './/components/AddTask'


function App() {
  //const name = 'Girl'


  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState ([])

  useEffect(() => {
     const data = localStorage.getItem('task')

      if(data){
        setTasks(JSON.parse(data))
      }

      console.log(data)
    },[])



//add task function
const addTask = (event, task) => {
  const id = Math.floor(Math.random() * 200 + 1)
  console.log(id)
  const newTask = {id, ...task} // ..task gets all the tasks input from the form

  //setTasks([...tasks, newTask])
  setTasks((preval) => [...preval, newTask])
 
  let info = JSON.parse(localStorage.getItem('task'))
  if (info == null){
    info = []
  }
  
  info.push(JSON.stringify(newTask))
  localStorage.setItem('task', JSON.stringify(info))
 
  //localStorage.setItem(id, JSON.stringify(newTask))

}


//Delete Task
//shows only the tasks whose id is not eqqual to the one that was clicked
const deleteTask = (id) =>{
  setTasks(tasks.filter((task) => task.id !== id))
}

//Reminder - when a user clicks on an a task a green bar pops up if there is a reminder for that task.
const Reminder = (id) => {
  setTasks(tasks.map((task)=> task.id === id ? {...task, reminder : !task.reminder} : task))
}

  return (
    <div className="container">      
      <Header onAdd = {() => setShowAddTask(!showAddTask)}
      showAddTask = {showAddTask} />
      {showAddTask && <AddTask onAdd = {addTask}/>}
      
      {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete ={deleteTask}  onToggle = {Reminder}/> : 'No Tasks here'
      }
    </div>
   
  );
}

export default App;
