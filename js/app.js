// getting elements
// let nameValue = document.querySelector("h1 .name");

document.addEventListener("DOMContentLoaded", getTodo);

let userInput = document.querySelector(".todo-item-input");
let addItemBtn = document.querySelector(".addBtn");
let todoUl = document.querySelector(".todoList");
let filterTodo = document.querySelector(".filter-todos");

// adding the event listeners

// setting username for todo app
// let userName = prompt(`Hello there! What is your name?`);
// nameValue.textContent = `${userName}'s `;
// if (userName === null) {
//     nameValue.textContent = ``;
// }

addItemBtn.addEventListener("click", addItem);
todoUl.addEventListener("click", removeItem);
filterTodo.addEventListener("click", filtered);

// adding functions to event listeners
function addItem(e) {
    // prevent add buttton default event
    e.preventDefault();

    if (userInput.value == "") {
        userInput.placeholder = `enter a valid input`;
        return false;
    }
    // creating new elements

    // the todo div
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("theList");

    // the todo li
    let todoLi = document.createElement("li");
    todoLi.classList.add("todoItem");
    todoLi.textContent = userInput.value;
    saveLocalTodo(userInput.value);

    // the todo butttons
    let taskCompletedBtn = document.createElement("button");
    taskCompletedBtn.innerHTML = `<i class="fas fa-check">`;
    taskCompletedBtn.classList.add("completedBtn");

    let taskDeletedBtn = document.createElement("button");
    taskDeletedBtn.innerHTML = `<i class="fas fa-trash">`;
    taskDeletedBtn.classList.add("deletedBtn");

    // appending elements

    todoUl.appendChild(todoDiv);

    todoDiv.appendChild(todoLi);
    todoDiv.appendChild(taskCompletedBtn);
    todoDiv.appendChild(taskDeletedBtn);

    userInput.value = ``;

    userInput.placeholder = `enter a new item`;

    // save todo input to local storage
}

// removing todo items
function removeItem(e) {
    let clickedItem = e.target;

    if (clickedItem.classList == "deletedBtn") {
        clickedItem = clickedItem.parentElement;
        clickedItem.classList.add("taskDelete");
        removeLocalTodo(todoUl);
        clickedItem.addEventListener("transitionend", e => {
            clickedItem.remove();
        });
    } else if (clickedItem.classList == "completedBtn") {
        clickedItem = clickedItem.parentElement;
        clickedItem.classList.add("taskComplete");
    } else {}
}

// adding todo filters
function filtered(e) {
    const todos = todoUl.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("taskComplete")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("taskComplete")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    });
}

// saving and removing from local storage

// saving to local storage

function saveLocalTodo(todo) {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// removing from local

function getTodo(todo) {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo) {
        let todoDiv = document.createElement("div");
        todoDiv.classList.add("theList");

        // the todo li
        let todoLi = document.createElement("li");
        todoLi.classList.add("todoItem");
        todoLi.textContent = todo;

        // the todo butttons
        let taskCompletedBtn = document.createElement("button");
        taskCompletedBtn.innerHTML = `<i class="fas fa-check">`;
        taskCompletedBtn.classList.add("completedBtn");

        let taskDeletedBtn = document.createElement("button");
        taskDeletedBtn.innerHTML = `<i class="fas fa-trash">`;
        taskDeletedBtn.classList.add("deletedBtn");

        // appending elements

        todoUl.appendChild(todoDiv);
        todoDiv.appendChild(todoLi);
        todoDiv.appendChild(taskCompletedBtn);
        todoDiv.appendChild(taskDeletedBtn);
    });
}

function removeLocalTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todoUl.childNodes;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem("todos", JSON.stringify(todos));
}