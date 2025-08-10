const taskInput = document.getElementById("add-task");
const addButton = document.getElementById("add-btn");

let id = 0;
let taskList = [];


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

