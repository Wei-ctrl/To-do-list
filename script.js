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
    loadTasks();
  }
});

function createTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.innerHTML = "";
  if (!taskList || taskList.length === 0) {
    return;
  }
  const reverseTasks = [...taskList].reverse();
  reverseTasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add('task')
    taskContainer.appendChild(taskElement);
    const taskBox = document.createElement('div')
    taskBox.classList.add('task-box');
    taskElement.appendChild(taskBox)
    const taskName = document.createElement("p");
    taskName.classList.add('task-item')
    taskName.innerText = task.toDo;
    const doneBtn = document.createElement("button");
    doneBtn.classList.add('done-btn')
    doneBtn.innerText = "Done";
    taskBox.appendChild(taskName);
    taskElement.appendChild(doneBtn);
    doneBtn.addEventListener("click", () => {
      taskList = taskList.filter((item) => item.toDo !== task.toDo);
      console.log(task.toDo);

      console.log(taskList);

      localStorage.setItem("task", JSON.stringify(taskList));
      taskContainer.removeChild(taskElement);
      loadTasks()
    });
  });
}

function loadTasks() {
  console.log(taskList.length);
  console.log(taskList);
  
  const noTask = document.getElementById('no-task')

  if (taskList.length < 1) {
    noTask.style.display = 'block'
  } else {
    createTasks();
    noTask.style.display = 'none'
  }
}

loadTasks();
