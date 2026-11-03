const activityForm = document.getElementById("activity-form");
const activityInput = document.getElementById("activity-input");
const activityList = document.getElementById("activity-list");
const activityCount = document.getElementById("activity-count");
const emptyState = document.getElementById("empty-state");

function updateActivityCount() {
    const count = activityList.querySelectorAll(".activity-item").length;
    activityCount.textContent = `${count} kegiatan`;
    emptyState.hidden = count > 0;
}

activityForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const activityName = activityInput.value.trim();
    if (!activityName) {
        activityInput.focus();
        return;
    }

    const item = document.createElement("li");
    item.className = "activity-item";

    const checkbox = document.createElement("input");
    checkbox.className = "activity-checkbox";
    checkbox.type = "checkbox";
    checkbox.setAttribute("aria-label", `Tandai "${activityName}" selesai`);

    const text = document.createElement("span");
    text.className = "activity-text";
    text.textContent = activityName;

    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.type = "button";
    removeButton.textContent = "Hapus";
    removeButton.setAttribute("aria-label", `Hapus kegiatan "${activityName}"`);

    checkbox.addEventListener("change", () => {
        item.classList.toggle("is-complete", checkbox.checked);
    });

    removeButton.addEventListener("click", () => {
        item.remove();
        updateActivityCount();
    });

    item.append(checkbox, text, removeButton);
    activityList.append(item);
    activityInput.value = "";
    activityInput.focus();
    updateActivityCount();
});
