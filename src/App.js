import { useState, useEffect } from "react"
import Header from './/components/Header'
import Tasks from './/components/Tasks'
import AddTask from './/components/AddTask'


function App() {

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
  const id = Math.floor(Math.random() * 200 + 1);
  const text = event["text"];
  const day = event["day"];
  const reminder = event["reminder"];
  const newTask = { id, text, day, reminder }; // ..task gets all the tasks input from the form
  console.log(newTask);
  setTasks((preval) => [...preval, newTask]);

  let info = JSON.parse(localStorage.getItem("task"));

  if (!info) {
    info = [];
  }

  info.push(newTask);
  localStorage.setItem("task", JSON.stringify(info));

  //localStorage.setItem(id, JSON.stringify(newTask))
};

//Delete Task
//shows only the tasks whose id is not eqqual to the one that was clicked
const deleteTask = (id) =>{
  const data = tasks.filter((task) => task.id !== id)
  console.log(data)
  setTasks(data)
  localStorage.setItem("task", JSON.stringify(data));

}

//Reminder - when a user clicks on an a task a green bar pops up if there is a reminder for that task.
const Reminder = (id) => {
  const data = tasks.map((task)=> task.id === id ? {...task, reminder : !task.reminder} : task)
  setTasks(data)
  localStorage.setItem("task", JSON.stringify(data));

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
