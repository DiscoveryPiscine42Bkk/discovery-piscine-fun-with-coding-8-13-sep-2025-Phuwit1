const list = document.getElementById("ft_list");
const newBtn = document.getElementById("newBtn");

window.onload = function() {
  const saved = getCookie("todos");
  if (saved) {
    const todos = JSON.parse(saved);
    todos.forEach(todo => addTodo(todo, false, true)); // <- loadMode = true
  }
};

newBtn.addEventListener("click", () => {
    const text = prompt("Enter a new TO DO:");
    if (text && text.trim() !== "") {
    addTodo(text.trim(), true);
    }
});


function addTodo(text, save, loadMode = false) {
  const div = document.createElement("div");
  div.className = "todo";
  div.textContent = text;

  div.addEventListener("click", () => {
    if (confirm("Do you really want to remove this TO DO?")) {
      div.remove();
      saveTodos();
    }
  });

  if (loadMode) {
    list.appendChild(div);
  } else {
    list.insertBefore(div, list.firstChild);
  }

  if (save) saveTodos();
}
function saveTodos() {
    const todos = [];
    document.querySelectorAll(".todo").forEach(div => {
        todos.push(div.textContent);
    });
    setCookie("todos", JSON.stringify(todos), 7);
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let c of cookies) {
    const [key, val] = c.split("=");
    if (key === name) return val;
    }
    return "";
}
