const taskInput = document.getElementById("add-task");
const addButton = document.getElementById("add-btn");

let taskList = JSON.parse(localStorage.getItem("task")) || [];
let id = taskList.length > 0 ? taskList[taskList.length - 1].id : 0;

addButton.addEventListener("click", () => {
  if (taskInput.value) {
    id++;
    const task = { id: id, toDo: taskInput.value };
    taskList.push(task);
    localStorage.setItem("task", JSON.stringify(taskList));
    taskInput.value = "";
loadTasks() 
 }
});

function createTasks() {  
  const taskContainer = document.getElementById("task-container");
  taskContainer.innerHTML = "";
    if (!taskList || taskList.length === 0) {
        return; 
    }
  const reverseTasks = [...taskList].reverse() 
  reverseTasks.forEach(task => {
  const taskElement = document.createElement("div");
  taskContainer.appendChild(taskElement);
  const taskName = document.createElement("p");
  taskName.innerText = task.toDo;
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  taskElement.appendChild(taskName);
  taskElement.appendChild(doneBtn);
  doneBtn.addEventListener("click", () => {
    taskList = taskList.filter(item => item.toDo !== task.toDo)
    console.log(task.toDo);
    
    console.log(taskList);
    
    localStorage.setItem("task", JSON.stringify(taskList))
    taskContainer.removeChild(taskElement)
  })
  });
}


function loadTasks() {
    const taskContainer = document.getElementById('task-container');
    const noTask = taskContainer.querySelector('.no-task'); // find existing

    if (taskList.length < 1) {
        if (!noTask) {
            const newNoTask = document.createElement('h3');
            newNoTask.classList.add('no-task');
            newNoTask.innerText = 'No Task';
            taskContainer.appendChild(newNoTask);
        }
    } else {
      createTasks();
        if (noTask) {
            taskContainer.removeChild(noTask);
        }
    }
}

loadTasks();
