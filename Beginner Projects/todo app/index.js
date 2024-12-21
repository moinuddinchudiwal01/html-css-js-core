const generateUniqueId = () => Math.floor(1000 + Math.random() * 9000);
const todoCollectionName = "todoCollection";

const setDataToLocalStorage = (key, val) => {
  return window.localStorage.setItem(key, JSON.stringify(val));
};

const getDataTOLocalStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

const handleCreateTodo = () => {
  let todoInput = document.getElementById("todoInput").value;
  if (!todoInput.trim()) return alert("Please enter todo");

  let editId = document.getElementById("todoEditId").value;

  let existingData = getDataTOLocalStorage(todoCollectionName);

  if (existingData) {
    if (editId) {
      const updatedData = existingData.map((item, index) => {
        if (item.id == parseInt(editId)) {
          return { ...item, value: todoInput };
        }

        return item;
      });
      setDataToLocalStorage(todoCollectionName, updatedData);
      document.getElementById("todoButton").innerText = "Add";
      document.getElementById("todoEditId").value = "";
    } else {
      setDataToLocalStorage(todoCollectionName, [
        ...existingData,
        { id: generateUniqueId(), value: todoInput, isChecked: false },
      ]);
    }
  } else {
    setDataToLocalStorage(todoCollectionName, [
      { id: generateUniqueId(), value: todoInput, isChecked: false },
    ]);
  }

  document.getElementById("todoInput").value = "";
  renderTodoList();
};

const handleDeleteTodo = (id) => {
  let existingData = getDataTOLocalStorage(todoCollectionName);
  const filtrdData = existingData.filter((item) => item.id !== id);
  setDataToLocalStorage(todoCollectionName, [...filtrdData]);
  renderTodoList();
};

const handleUpdateTodo = (item) => {
  document.getElementById("todoInput").value = item.value;
  document.getElementById("todoButton").innerText = "Update";
  document.getElementById("todoEditId").value = item.id;
};

const handleCheckMark = (checkItem) => {
  let existingData = getDataTOLocalStorage(todoCollectionName);
  const updatedData = existingData.map((item, index) => {
    if (checkItem.id == parseInt(item.id)) {
      return { ...item, isChecked: !item.isChecked };
    }

    return item;
  });

  setDataToLocalStorage(todoCollectionName, updatedData);
  renderTodoList();
};

const renderTodoList = () => {
  const listContainer = document.getElementById("todo-list__items");
  const todoData = getDataTOLocalStorage(todoCollectionName);

  listContainer.innerHTML = "";
  if (todoData && todoData.length > 0) {
    todoData.map((item, index) => {
      const li = document.createElement("li");
      li.className = "todo-item";

      const checkbox = document.createElement("input");
      checkbox.type = "radio";
      checkbox.className = "todo-item__checkbox";
      checkbox.checked = item.isChecked ? true : false;
      checkbox.onclick = () => handleCheckMark(item);

      const span = document.createElement("span");
      span.className = `todo-item__text ${
        item.isChecked ? "todo-item__text--completed" : ""
      }`;
      span.textContent = item.value;

      const deleteButton = document.createElement("button");
      deleteButton.className = "todo-item__button todo-item__button--delete";
      deleteButton.innerHTML = `<img src="icons/delete.svg" alt="Delete Task">`;
      deleteButton.onclick = () => handleDeleteTodo(item.id);

      const editButton = document.createElement("button");
      editButton.className = "todo-item__button todo-item__button--edit";
      editButton.innerHTML = `<img src="icons/edit.svg" alt="Edit Task">`;
      editButton.onclick = () => handleUpdateTodo(item);
      editButton.disabled = item.isChecked ? true : false;

      const actions = document.createElement("div");
      actions.className = "todo-item__actions";
      actions.appendChild(deleteButton);
      actions.appendChild(editButton);

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(actions);

      listContainer.appendChild(li);
    });
  } else {
    const span = document.createElement("span");
    span.className = "todo-item__text";
    span.textContent = "No todo list found";
    listContainer.appendChild(span);
  }
};
renderTodoList();
