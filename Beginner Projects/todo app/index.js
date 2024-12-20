const generateUniqueId = () => Math.floor(1000 + Math.random() * 9000);
const todoCollectionName = "todoCollection";

const setDataToLocalStorage = (key, val) => {
  console.log("val", val);
  return window.localStorage.setItem(key, JSON.stringify(val));
};

const getDataTOLocalStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

const handleCreateTodo = () => {
  let todoInput = document.getElementById("todoInput").value;
  if (!todoInput.trim()) return alert("Please enter todo");

  let existingData = getDataTOLocalStorage(todoCollectionName);

  if (existingData) {
    setDataToLocalStorage(todoCollectionName, [
      ...existingData,
      { id: generateUniqueId(), value: todoInput },
    ]);
  } else {
    setDataToLocalStorage(todoCollectionName, [
      { id: generateUniqueId(), value: todoInput },
    ]);
  }
};
