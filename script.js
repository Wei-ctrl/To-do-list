const taskInput = document.getElementById("add-task");
const addButton = document.getElementById("add-btn");
const mainContainerElement = document.getElementById('main-container');
const noTaskElement = document.getElementById('no-task')
const taskContainerElement = document.getElementById('task-container');

let taskList = JSON.parse(localStorage.getItem("task")) || [];
let id = taskList.length > 0 ? taskList[taskList.length - 1].id : 0;


function submitTask(){
if (noTagging(taskInput.value)) {
    id++;
    const task = { id: id, toDo: noTagging(taskInput.value), categories : tagging(taskInput.value) };
    console.log(task);
    taskList.push(task);
    localStorage.setItem("task", JSON.stringify(taskList));
    taskInput.value = "";
    loadTasks();
  }
}

addButton.addEventListener("click", () => {
  submitTask()
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submitTask()
  }
  }

)

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
    const categoryList = document.createElement('ul');
    categoryList.classList.add('category-list')
    console.log(taskList);
    
    if(task.categories){
    task.categories.forEach((item) => {
      const category = document.createElement('li')
      category.classList.add('category')
      category.innerText = item;
      categoryList.appendChild(category)
    })
    }
    
    taskBox.appendChild(categoryList)
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

  if (taskList.length < 1) {
    // Add noTaskElement if not already in the DOM
    if (!mainContainerElement.contains(noTaskElement)) {
      mainContainerElement.appendChild(noTaskElement);
    }
    // Remove taskContainerElement only if it exists in the DOM
    if (mainContainerElement.contains(taskContainerElement)) {
      mainContainerElement.removeChild(taskContainerElement);
    }
  } else {
    // Add taskContainerElement if not already in the DOM
    if (!mainContainerElement.contains(taskContainerElement)) {
      mainContainerElement.appendChild(taskContainerElement);
    }
    // Remove noTaskElement only if it exists in the DOM
    if (mainContainerElement.contains(noTaskElement)) {
      mainContainerElement.removeChild(noTaskElement);
    }
    createTasks();
  }
}

function tagging(text){
  let matches = text.match(/#\w+/g);
  return matches
}

function noTagging(text){
  let withoutTag = text.replace(/#\w+/g, "").replace(/\s+/g, " ").trim();
  if(withoutTag === ''){
    return ''
  }
  return withoutTag
}

const theme = document.getElementById('theme-check')
theme.addEventListener('click', () => {
  const body = document.getElementById("page");
  const sun = document.querySelector('.sun')
  const moon = document.querySelector('.moon')
  if (theme.checked) {
    console.log('dark');
    sun.style.display = 'none'
    moon.style.display = 'block'
    body.classList.toggle("dark");
    taskInput.focus()
  } else if (!theme.checked){
    console.log('light');
    sun.style.display = 'block'
    moon.style.display = 'none'
    body.classList.toggle("dark");
    taskInput.focus()
  }

})


loadTasks();
