const $ = document;
const addTodo = $.querySelector(".add-todo");
const inputElem = $.querySelector(".todo-input");
const todoList = $.querySelector(".todolist");
const selectTodo = $.querySelector(".filter-todos");
const todoeditbox = $.querySelector(".todo-edit");
const overlay = $.querySelector(".overlay");
const canselbtn = $.querySelector(".todo-edit-btn__cancel");
const changeEditbtn = $.querySelector(".todo-edit-btn__change");
const inputEdit = $.querySelector(".todo-edit__input");
let todosArrey = [];
let filterValue = "all";
let selectTodoId = null;
function addNewTodo(valueTodo) {
  let inputValue = valueTodo;
  if (inputValue) {
    let newtodo = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      title: inputValue,
      compelet: false,
    };
    inputElem.value = "";
    todosArrey.push(newtodo);
    filtetodo();
    setLocalstorage(todosArrey);
    inputElem.focus();
  }
}
function genarateTodo(todos) {
  let result = "";
  todos.forEach((item) => {
    result += ` <li class="todo">
    <p class="todo__title ${item.compelet && "completed"}">${item.title}</p>
    <span class="todo__createdAt">${new Date(item.createdAt).toLocaleDateString("fa-IR")}</span>
     <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03346E"
              class="todo__edit">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
          </button>
    <button>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6d28d9"
    class="todo__check">
    <path stroke-linecap="round" stroke-linejoin="round"
    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
    
    </button>
    <button>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
    stroke="#db2777" class="todo__remove">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                  </svg>
                  </button>
                  </li>`;
  });
  todoList.innerHTML = result;
  inputElem.value = "";
  const deleteButtons = $.querySelectorAll(".todo__remove");
  deleteButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      removebtn(todos[index].id);
    });
  });
  const checkBtnTodo = $.querySelectorAll(".todo__check");
  checkBtnTodo.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      checktodo(todos[index].id);
    });
  });
  const editBtnTodo = $.querySelectorAll(".todo__edit");
  editBtnTodo.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      editTodo(todos[index].title, todos[index].id);
    });
  });
}
function removebtn(todoId) {
  todosArrey = todosArrey.filter((todo) => {
    return todo.id !== todoId;
  });
  filtetodo();
  setLocalstorage(todosArrey);
}
function checktodo(todoId) {
  todosArrey.forEach((todo) => {
    if (todo.id === todoId) {
      todo.compelet = !todo.compelet;
    }
  });

  filtetodo();
  setLocalstorage(todosArrey);
}
function editTodo(todoTitle, todoid) {
  selectTodoId = todoid;
  todoeditbox.classList.add("todo-edit--active");
  overlay.classList.add("overlay--active");
  inputEdit.value = todoTitle;
  inputEdit.focus();
}
function canseltodo() {
  todoeditbox.classList.remove("todo-edit--active");
  overlay.classList.remove("overlay--active");
}
function changetodo() {
  const newTitleTodo = inputEdit.value;
  todosArrey.forEach((todo) => {
    if (todo.id === selectTodoId) {
      todo.title = newTitleTodo;
    }
  });
  filtetodo();
  setLocalstorage(todosArrey);
  canseltodo();
}
function filtetodo() {
  switch (filterValue) {
    case "all": {
      genarateTodo(todosArrey);
      break;
    }
    case "completed": {
      const filtersTodos = todosArrey.filter((todo) => todo.compelet);
      genarateTodo(filtersTodos);
      break;
    }
    case "uncompleted": {
      const filtersTodos = todosArrey.filter((todo) => !todo.compelet);
      genarateTodo(filtersTodos);
      break;
    }
    default:
      genarateTodo(todosArrey);
  }
}
function setLocalstorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
window.addEventListener("DOMContentLoaded", () => {
  const getLocalStorage = JSON.parse(localStorage.getItem("todos"));
  if (getLocalStorage) {
    todosArrey = getLocalStorage;
  } else {
    todosArrey = [];
  }
  genarateTodo(todosArrey);
});
addTodo.addEventListener("click", (e) => {
  e.preventDefault();
  addNewTodo(inputElem.value);
});
selectTodo.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filtetodo();
});
canselbtn.addEventListener("click", canseltodo);
changeEditbtn.addEventListener("click", changetodo);
 inputEdit.addEventListener("keydown", (e) => {
   if (e.key === "Enter") {
     e.preventDefault();
     changetodo();
     // جلوگیری از رفرش صفحه هنگام زدن Enter
   }
 });