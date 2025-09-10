$(document).ready(function () {

  // Load saved todos on page load
  const saved = getCookie("todos");
  if (saved) {
    const todos = JSON.parse(saved);
    todos.forEach(todo => addTodo(todo, false, true)); // loadMode = true
  }

  // Add new todo button
  $("#newBtn").off("click").on("click", function () {
    const text = prompt("Enter a new TO DO:");
    if (text && text.trim() !== "") {
      addTodo(text.trim(), true);
    }
  });

  // Function to add todo
  function addTodo(text, save, loadMode = false) {
    // Prevent duplicate
    if ($(".todo").filter(function() { return $(this).text() === text; }).length) return;

    const $div = $("<div></div>")
      .addClass("todo")
      .text(text)
      .off("click")
      .on("click", function () {
        if (confirm("Do you really want to remove this TO DO?")) {
          $(this).remove();
          saveTodos();
        }
      });

    if (loadMode) {
      $("#ft_list").append($div);
    } else {
      $("#ft_list").prepend($div);
    }

    if (save) saveTodos();
  }

  // Function to save todos to cookie
  function saveTodos() {
    const todos = [];
    $(".todo").each(function () {
      todos.push($(this).text());
    });
    setCookie("todos", JSON.stringify(todos), 7);
  }

  // Cookie helper functions
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days*24*60*60*1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
  }

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let c of cookies) {
      const [key, val] = c.split("=");
      if (key === name) return decodeURIComponent(val);
    }
    return "";
  }

});
