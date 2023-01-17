const text = document.getElementById("text");
const saveIndex = document.getElementById("saveIndex");
const addTaskBtn = document.getElementById("add-task-btn");
const saveTaskBtn = document.getElementById("save-todo-btn");
const listBox = document.getElementById("listBox");

let todoArray = [];

document.addEventListener("DOMContentLoaded", () => {
  displayTodo();
});

addTaskBtn.addEventListener("click", (e) => {
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }

  if (text.value === "") {
    return;
  } else {
    todoArray.push(text.value);
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));

    displayTodo();
  }
});

displayTodo = () => {
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }

  let htmlCode = "";

  todoArray.forEach((todoItem, i) => {
    htmlCode += `
        <div>
            <p>${todoItem}</p>
            <button onclick='editTodo(${i})'>Edit</button>
            <button onclick='deleteTodo(${i})'>Delete</button>
        </div>
    `;
  });

  listBox.innerHTML = htmlCode;
};

deleteTodo = (todoIndex) => {
  todoArray = JSON.parse(localStorage.getItem("todo"));
  todoArray.splice(todoIndex, 1);
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
};

editTodo = (todoIndex) => {
  todoArray = JSON.parse(localStorage.getItem("todo"));
  saveIndex.value = todoIndex;
  text.value = todoArray[todoIndex];
  addTaskBtn.style.display = "none";
  saveTaskBtn.style.display = "";
};

saveTaskBtn.addEventListener("click", () => {
  todoArray = JSON.parse(localStorage.getItem("todo"));
  let id = saveIndex.value;
  todoArray[id] = text.value;
  saveTaskBtn.style.display = "none";
  addTaskBtn.style.display = "";
  text.value = "";
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
});
