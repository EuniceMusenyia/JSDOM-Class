fetch('https://dummyjson.com/todos/user/1')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const todos = data.todos;
    todos.forEach(todo => {
      const todoId = todo.id;
      const todoTitle = todo.todo;
      const todoElement = createNewTaskElement(todoId, todoTitle, todo.completed);
      const todoList = todo.completed ? document.getElementById('completed') : document.getElementById('pending');
      todoList.appendChild(todoElement);
      bindTaskEvents(todoElement);
    });
  })
  .catch(error => {
    console.error('Error', error);
  });

var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("pending");
var completedTasksHolder = document.getElementById("completed");

var createNewTaskElement = function (taskId, taskString, completed) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  label.innerText = taskString;
  checkBox.type = "checkbox";
  checkBox.dataset.taskId = taskId;
  checkBox.checked = completed;
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function () {
  console.log("Add Task...");
  var taskString = taskInput.value;
  if (taskString.trim() === "") {
    return;
  }
  taskInput.value = "";

  fetch("https://dummyjson.com/todos", {
    method: "POST",
    body: JSON.stringify({
      title: taskString,
      completed: false,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const taskId = data.id;
      const todoElement = createNewTaskElement(taskId, taskString, false);
      incompleteTaskHolder.appendChild(todoElement);
      bindTaskEvents(todoElement);
    })
    .catch((error) => {
      console.error("Error", error);
    });
};

var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
};

var deleteTask = function () {
  console.log("Delete Task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

var taskCompleted = function () {
  console.log("Complete Task...");
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem);
};

var taskIncomplete = function () {
  console.log("Incomplete Task...");
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem);
};

// var ajaxRequest = function () {
//   console.log("AJAX Request");
// };

// addButton.onclick = addTask;
// addButton.addEventListener("click", addTask);
// addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem) {
  console.log("bind list item events");
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBox.checked ? taskCompleted : taskIncomplete;
};

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i]);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i]);
}

// *********************
var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("pending");
var completedTasksHolder = document.getElementById("completed");

// ...

var addTask = function () {
  console.log("Add Task...");
  var taskString = taskInput.value;
  if (taskString.trim() === "") {
    return;
  }
  taskInput.value = "";

  // Create a new task element
  var taskId = Date.now(); // Generate a unique ID for the task
  var todoElement = createNewTaskElement(taskId, taskString, false);
  incompleteTaskHolder.appendChild(todoElement);
  bindTaskEvents(todoElement);

  // Optional: You can also send a request to a server to save the task
  fetch("https://dummyjson.com/todos", {
    method: "POST",
    body: JSON.stringify({
      id: taskId,
      todo: taskString,
      completed: false,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Task saved:", data);
    })
    .catch((error) => {
      console.error("Error", error);
    });
};

// ...

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

