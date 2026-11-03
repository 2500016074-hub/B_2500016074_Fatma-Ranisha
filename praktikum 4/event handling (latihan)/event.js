const inputTask = document.createElement("input");
inputTask.type = "text";
inputTask.placeholder = "Masukkan tugas baru...";
inputTask.id = "task-input";
inputTask.setAttribute("aria-label", "Masukkan tugas baru");

const btnAdd = document.createElement("button");
btnAdd.textContent = "Tambah";
btnAdd.id = "add-task";
btnAdd.type = "button";

const taskList = document.createElement("ul");
taskList.id = "task-list";
taskList.setAttribute("aria-label", "Daftar tugas");

const outputDiv = document.getElementById("output5");

if (!outputDiv) {
    throw new Error('Elemen dengan id "output5" tidak ditemukan.');
}

outputDiv.append(inputTask, btnAdd, taskList);

btnAdd.addEventListener("click", () => {
    const taskText = inputTask.value.trim();

    if (taskText !== "") {
        addTask(taskText);
        inputTask.value = "";
        saveTasks();
        inputTask.focus();
    }
});

inputTask.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btnAdd.click();
    }
});

function addTask(taskText, completed = false) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.setAttribute("aria-label", `Tandai "${taskText}" selesai`);

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.style.textDecoration = completed ? "line-through" : "none";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Hapus";
    deleteBtn.setAttribute("aria-label", `Hapus tugas "${taskText}"`);

    checkbox.addEventListener("change", () => {
        taskSpan.style.textDecoration = checkbox.checked ? "line-through" : "none";
        saveTasks();
    });

    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    li.append(checkbox, taskSpan, deleteBtn);
    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = Array.from(taskList.querySelectorAll("li"), (li) => ({
        text: li.querySelector("span").textContent,
        completed: li.querySelector('input[type="checkbox"]').checked,
    }));

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (!savedTasks) {
        return;
    }

    const tasks = JSON.parse(savedTasks);
    tasks.forEach((task) => addTask(task.text, task.completed));
}

loadTasks();