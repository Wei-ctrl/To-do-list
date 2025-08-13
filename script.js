const taskInput = document.getElementById("add-task");
const addButton = document.getElementById("add-btn");
const mainContainerElement = document.getElementById("main-container");
const noTaskElement = document.getElementById("no-task");
const taskContainerElement = document.getElementById("task-container");
const taskContainer = document.getElementById("task-container");

let taskList = JSON.parse(localStorage.getItem("task")) || [];
let id = taskList.length > 0 ? taskList[taskList.length - 1].id : 0;

function loadTasks() {
  //console.log(taskList.length);
  //console.log(taskList);

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
    //createTasks();
  }
}

function submitTask() {
  if (noTagging(taskInput.value)) {
    id++;
    const task = {
      id: id,
      toDo: noTagging(taskInput.value),
      state: "active",
      categories: tagging(taskInput.value),
    };
    console.log(task);
    taskList.push(task);
    localStorage.setItem("task", JSON.stringify(taskList));
    taskInput.value = "";
    //loadTasks();
    updateViewAfterChange();
  }
}

addButton.addEventListener("click", () => {
  submitTask();
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submitTask();
  }
});

taskInput.addEventListener("focus", (e) => {
  console.log("focus active");
  sectionElement.forEach((item) => {
    item.classList.remove("active");
  });
  const allSection = document.querySelector(".all-section");
  allSection.classList.add("active");
  switchSections("All");
});

function renderAllTasks() {
  if (!taskList || taskList.length === 0) {
    return;
  }

  taskContainer.innerHTML = "";

  const reverseTasks = [...taskList].reverse();
  reverseTasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.id = task.id;
    taskContainer.appendChild(taskElement);

    if (task.state === "done") {
      taskElement.classList.add("done");
      //taskName.classList.add('done');
    } else if (task.state === "active") {
      taskElement.classList.add("active");
    }

    const taskBox = document.createElement("div");
    taskBox.classList.add("task-box");
    taskElement.appendChild(taskBox);

    const taskName = document.createElement("p");
    taskName.classList.add("task-item");
    taskName.innerText = task.toDo;
    taskBox.appendChild(taskName);

    const btnContainer = document.createElement('div')
    btnContainer.classList.add('btn-container')
    taskElement.appendChild(btnContainer)

    const editBtn = document.createElement("button")
    editBtn.classList.add('edit-btn')
    editBtn.innerText = "Edit"
    btnContainer.appendChild(editBtn)

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("done-btn");
    doneBtn.innerText = "Done";
    btnContainer.appendChild(doneBtn);


    taskBox.addEventListener("click", () => {
      const allBtn = document.querySelectorAll(".btn-container");

      if (btnContainer.classList.contains("btn-active")) {
        btnContainer.classList.remove("btn-active");
              taskBox.classList.remove('btn-clicked')

        return;
      }

      allBtn.forEach((btn) => btn.classList.remove("btn-active"));

      btnContainer.classList.add("btn-active");
      taskBox.classList.add('btn-clicked')
      console.log("clicked");
    });

    const categoryList = document.createElement("ul");
    categoryList.classList.add("category-list");
    //console.log(taskList);
    if (task.categories) {
      task.categories.forEach((item) => {
        const category = document.createElement("li");
        category.classList.add("category");
        category.innerText = item;
        categoryList.appendChild(category);
      });
    }
    taskBox.appendChild(categoryList);

    doneBtn.addEventListener("click", () => {
      //taskList = taskList.filter((item) => item.id !== task.id);
      //localStorage.setItem("task", JSON.stringify(taskList));
      //set the state
      //taskList.filter((item) => item.id !== task.id)[0].state = 'done'
      task.state = "done";
      //console.log(task.id);

      localStorage.setItem("task", JSON.stringify(taskList));
      updateViewAfterChange();
      //taskContainer.removeChild(taskElement);
      ///////loadTasks()
    });
  });
}

function updateViewAfterChange() {
  loadTasks();
  if (taskList.length > 0) {
    renderAllTasks();
  }
}

function tagging(text) {
  let matches = text.match(/#\w+/g);
  return matches;
}

function noTagging(text) {
  let withoutTag = text.replace(/#\w+/g, "").replace(/\s+/g, " ").trim();
  if (withoutTag === "") {
    return "";
  }
  return withoutTag;
}

const theme = document.getElementById("theme-check");
theme.addEventListener("click", () => {
  const body = document.getElementById("page");
  const sun = document.querySelector(".sun");
  const moon = document.querySelector(".moon");
  if (theme.checked) {
    console.log("dark");
    sun.style.display = "none";
    moon.style.display = "block";
    body.classList.toggle("dark");
    taskInput.focus();
  } else if (!theme.checked) {
    console.log("light");
    sun.style.display = "block";
    moon.style.display = "none";
    body.classList.toggle("dark");
    taskInput.focus();
  }
});

const sectionElement = document.querySelectorAll(".sections-child");
console.log(sectionElement);

sectionElement.forEach((section) => {
  section.addEventListener("click", () => {
    sectionElement.forEach((item) => {
      item.classList.remove("active");
    });
    section.classList.add("active");
    //console.log(section.innerText)
    switchSections(section.innerText);
  });
});

function switchSections(section) {
  if (section === "Active") {
    console.log("active");
    renderActiveDoneTasks("task done");
  } else if (section === "All") {
    loadTasks();
    renderAllTasks();
    console.log("all");
  } else if (section === "Done") {
    renderActiveDoneTasks("task active");
    console.log("done");
  }
}

function renderActiveDoneTasks(reversedState) {
  const tasks = document.querySelectorAll(".task");
  let arr = Array.from(tasks);
  arr.forEach((item) => {
    if (item.className === reversedState) {
      console.log(`hide ${item}`);
      item.classList.add("hide-task");
    } else {
      item.classList.remove("hide-task");
    }
  });
}

switchSections("All");
//resetDone();
