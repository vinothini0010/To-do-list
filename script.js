document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("task");
    let taskValue = taskInput.value.trim();
    if (taskValue === "") return;
    
    let li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${taskValue}</span>
        <div>
            <button class="edit" onclick="editTask(this)">Edit</button>
            <button class="delete" onclick="removeTask(this)">X</button>
        </div>
    `;
    
    document.getElementById("taskList").appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function removeTask(button) {
    button.parentElement.parentElement.remove();
    saveTasks();
}

function editTask(button) {
    let taskSpan = button.parentElement.parentElement.querySelector(".task-text");
    let newTask = prompt("Edit task:", taskSpan.innerText);
    if (newTask) {
        taskSpan.innerText = newTask.trim();
        saveTasks();
    }
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li .task-text").forEach(task => {
        tasks.push(task.innerText);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskText => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div>
                <button class="edit" onclick="editTask(this)">Edit</button>
                <button class="delete" onclick="removeTask(this)">X</button>
            </div>
        `;
        document.getElementById("taskList").appendChild(li);
    });
}
