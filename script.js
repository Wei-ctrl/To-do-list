const taskInput = document.getElementById("add-task");
const addButton = document.getElementById("add-btn");
const mainContainerElement = document.getElementById("main-container");
const noTaskElement = document.getElementById("no-task");
const taskContainerElement = document.getElementById("task-container");
const taskContainer = document.getElementById("task-container");

let taskList = JSON.parse(localStorage.getItem("task")) || [];
let id = taskList.length > 0 ? taskList[taskList.length - 1].id : 0;

let currentSection = 'all'

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

 
    const taskBox = document.createElement("div");
    taskBox.classList.add("task-box");
    taskElement.appendChild(taskBox);

    const taskName = document.createElement("input");
    taskName.classList.add("task-item");
    taskName.value = task.toDo;
    taskName.readOnly = true;
    taskBox.appendChild(taskName);

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    taskElement.appendChild(btnContainer);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerText = "Edit";
    btnContainer.appendChild(editBtn);

    let isEditing = null;

    function toggleEditSave() {
      if (editBtn.classList.contains("save-btn")) {
        // Save mode → back to Edit
        document.querySelectorAll('.task-box').forEach((item) => {
          item.classList.toggle('editing')
        })
        
        console.log("saved");
        isEditing = false;
        console.log('unlocked tasks');

        taskName.classList.toggle('edit-active')
        editBtn.classList.remove("save-btn");
        doneBtn.classList.remove("save-hide");
        editBtn.textContent = "Edit";
        taskName.readOnly = true;

        task.toDo = taskName.value;
        localStorage.setItem("task", JSON.stringify(taskList));
      } else {
        // Edit mode → to Save
        isEditing = true;
        console.log(taskBox);
        document.querySelectorAll('.task-box').forEach((item) => {
          item.classList.toggle('editing')
        })
        
        taskName.classList.toggle('edit-active')
        taskName.removeAttribute("readonly");
        taskName.focus();
        editBtn.textContent = "Save";
        editBtn.classList.add("save-btn");
        doneBtn.classList.add("save-hide");

        console.log('locked tasks');
        
      }
    }

    // Click listener
    editBtn.addEventListener("click", () => {

      
      if(editBtn.classList.contains('undone-btn')) {
        console.log('undone logic');
        task.state = 'active'
        updateViewAfterChange()
      } else {
      toggleEditSave() //edit here

      }
    }



    );

    // Enter key listener
    taskName.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        toggleEditSave();
      }
    });

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("done-btn");
    doneBtn.innerText = "Done";
    btnContainer.appendChild(doneBtn);

    renderTaskState()


    function renderTaskState() {
       if (task.state === "done") {
      taskElement.classList.add("done");   //control undone here
      taskBox.classList.add('done')    //control undone here
      doneBtn.textContent = 'Remove'; //control undone here
      doneBtn.classList.add('remove-btn')
      editBtn.textContent = "Undone";
      editBtn.classList.add('undone-btn')
    } else if (task.state === "active") {
      taskElement.classList.add("active");
      taskBox.classList.remove('done')    //control undone here
      doneBtn.textContent = 'Done'; //control undone here
      doneBtn.classList.remove('remove-btn')
      editBtn.textContent = "Edit";
      editBtn.classList.remove('undone-btn')
    }
    }


    taskBox.addEventListener("click", (e) => {
      if(taskBox.classList.contains('editing')){
        return
      }
      taskName.readOnly = true;
      const allBtn = document.querySelectorAll(".btn-container");
      if (btnContainer.classList.contains("btn-active")) {
        btnContainer.classList.remove("btn-active");
        return;
      }

      allBtn.forEach((btn) => btn.classList.remove("btn-active"));

      btnContainer.classList.add("btn-active");
      

    });

    taskBox.addEventListener("click", () => {
      const allBoxes = document.querySelectorAll(".task-box");

      if (taskBox.classList.contains("no-hover")) {
        // Unlock hover for this one
        taskBox.classList.remove("no-hover");
        return;
      }

      // Remove hover lock from all
      allBoxes.forEach((box) => box.classList.remove("no-hover"));

      // Lock hover for the clicked one
      taskBox.classList.add("no-hover");
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

      if (task.state === 'active') {
         task.state = "done";
      localStorage.setItem("task", JSON.stringify(taskList));
      console.log(currentSection);
      
                         renderTaskState()

      updateViewAfterChange();

      } else if(task.state === 'done') {
        taskList = taskList.filter((item) => item.id !== task.id);
      localStorage.setItem("task", JSON.stringify(taskList));
            console.log(currentSection);
                  // renderTaskState()

      updateViewAfterChange();

      }

     
      //taskContainer.removeChild(taskElement);
      ///////loadTasks()
    });
  });
}


  

function updateViewAfterChange() {
  loadTasks();
  if (taskList.length > 0) {
    if (currentSection === 'all') {
          renderAllTasks();
          
    } else if(currentSection === 'active') {
      renderActiveDoneTasks('active')
    } else if (currentSection === 'done'){
            renderActiveDoneTasks('done')
    }

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
    //console.log("active");
    currentSection = 'active'
    renderActiveDoneTasks("active");
  } else if (section === "All") {
    currentSection = 'all'
    loadTasks();
    renderAllTasks();
    //console.log("all");
    
  } else if (section === "Done") {
    currentSection = 'done'
    renderActiveDoneTasks("done");
    //console.log("done");
  }
                console.log(currentSection);

}

function renderActiveDoneTasks(state) {
  renderAllTasks()
  const tasks = document.querySelectorAll(".task");
  let arr = Array.from(tasks);
  arr.forEach((item) => {
    if (!item.classList.contains(state)) {
            item.classList.add("hide-task");
    } else {
            item.classList.remove("hide-task");
    }
  });
}




switchSections("All");
//resetDone();
