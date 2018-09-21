// Define UI Vars

const form = document.querySelector("#task-form");
const tasklist = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");


// load all event event listeners

loadEventListeners();



function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTask);
  form.addEventListener("submit", addTask);
  tasklist.addEventListener("click", removeItems);
  clearBtn.addEventListener("click", clearAll);
  filter.addEventListener('keyup', filterTasks);
  clearBtn.addEventListener


}



function addTask(e) {
  if (taskInput.value === '') {
    alert("please input");
  }

  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  const link = document.createElement('a');
  link.className = "delete-item secondary-content";
  link.innerHTML = `<i class="fa fa-remove"></i>`;
  li.appendChild(link);
  tasklist.appendChild(li);
  storeInLocalStorage(taskInput.value);

  e.preventDefault();


}

function removeItems(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
    removeTaskFromLocalStorage( e.target.parentElement.parentElement);


  }
  e.preventDefault();
}

function clearAll(e) {
  // tasklist.innerHTML = '';

  while (tasklist.firstChild) {
    tasklist.removeChild(tasklist.firstChild);
  }

  clearAllFromLocalStorage();
}

function removeTaskFromLocalStorage(taskItems){

  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  }
  else {

    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task,index){

    if(task===taskItems.textContent){
      tasks.splice(index,1);
    }

  });
  localStorage.setItem("tasks",JSON.stringify(tasks));
}

function clearAllFromLocalStorage(){
  localStorage.clear();
}

function filterTasks(e) {
  const txt = filter.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(
    function (task) {
      const item = task.firstChild.textContent;
      console.log(item);
      if (item.toLowerCase().indexOf(txt) != -1) {
        task.style.display = 'block';
      }
      else {
        task.style.display = 'none';
      }


    }
  );
}


function storeInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];

  }
  else {

    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

}

function getTask(e) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];


  }
  else {

    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  console.log(tasks);
  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = "delete-item secondary-content";
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    li.appendChild(link);
    tasklist.appendChild(li);
    e.preventDefault();




  });

}