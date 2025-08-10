const taskInput = document.getElementById("add-task");
const addButton = document.getElementById("add-btn");

let taskList = JSON.parse(localStorage.getItem('task')) || [];
let id = taskList.length > 0 ? taskList[taskList.length - 1].id : 0;

addButton.addEventListener("click", () => {
  if (taskInput.value) {
    id++;
    const task = { id: id, toDo: taskInput.value };
    taskList.push(task);
    localStorage.setItem("task", JSON.stringify(taskList));
    taskInput.value = "";

    const taskElement = document.createElement('div')
    const taskContainer = document.getElementById('task-container')
    taskContainer.appendChild(taskElement)
    const taskName = document.createElement('p')
    taskName.innerText = JSON.parse(localStorage.getItem('task'))[id-1].toDo;
    //refreshes dont maintain the UI
    const doneBtn = document.createElement('button')
    doneBtn.innerText = 'Done'
    taskElement.appendChild(taskName)
    taskElement.appendChild(doneBtn)
  }
});

function loadTasks(){
    const taskContainer = document.getElementById('task-container')
    if(taskList.length < 1){
        const noTask = document.createElement('h3')
        noTask.innerText = 'No Task'
        taskContainer.appendChild(noTask)
    }
}

