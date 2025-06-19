const inputbox = document.getElementById('inputbox');
const addBtn = document.getElementById('addBtn');
const todolist = document.getElementById('todolist');
const emptyMessage = document.getElementById('emptyMessage');
let editTodo = null;

const fetchTodos = () => JSON.parse(localStorage.getItem("todos") || "[]");

const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const showEmptyMessage = () => {
    emptyMessage.style.display = todolist.children.length ? 'none' : 'block';
};

const createTodoItem = (todoText, completed = false) => {
    const li = document.createElement("li");
    if (completed) li.classList.add('completed');

    const p = document.createElement("p");
    p.innerHTML = todoText;
    li.appendChild(p);

    // Mark complete on click
    p.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateLocalStorage();
    });

    const editBtn = document.createElement('button');
    editBtn.innerHTML = "Edit";
    editBtn.classList.add('btn', 'editBtn');
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "Remove";
    deleteBtn.classList.add('btn', 'deleteBtn');
    li.appendChild(deleteBtn);

    todolist.appendChild(li);
};

const addTodo = () => {
    const inputText = inputbox.value.trim();
    if (!inputText) {
        alert("Please enter a task!");
        return;
    }

    if (addBtn.innerText === "Update") {
        editTodo.children[0].innerHTML = inputText;
        addBtn.innerText = "Add";
        inputbox.value = "";
        updateLocalStorage();
        editTodo = null;
    } else {
        createTodoItem(inputText);
        updateLocalStorage();
        inputbox.value = "";
    }
    showEmptyMessage();
};

const updateTodo = (e) => {
    const target = e.target;

    if (target.classList.contains('deleteBtn')) {
        target.parentElement.remove();
        updateLocalStorage();
    }

    if (target.classList.contains('editBtn')) {
        inputbox.value = target.parentElement.children[0].innerHTML;
        inputbox.focus();
        addBtn.innerText = "Update";
        editTodo = target.parentElement;
    }
    showEmptyMessage();
};

const updateLocalStorage = () => {
    const todos = [];
    todolist.querySelectorAll('li').forEach(item => {
        todos.push({
            text: item.children[0].innerHTML,
            completed: item.classList.contains('completed')
        });
    });
    saveTodos(todos);
};

const getLocalTodos = () => {
    const todos = fetchTodos();
    todos.forEach(todo => createTodoItem(todo.text, todo.completed));
    showEmptyMessage();
};

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todolist.addEventListener('click', updateTodo);
