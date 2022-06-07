const displayTasks = async function (task) {
  // clear old tasks
  let oldTaskContainer = document.getElementById("task-list-container");
  let oldTasks = document.querySelectorAll(".task-container");
  if (oldTasks) {
    oldTasks.forEach(task => {
      oldTaskContainer.removeChild(task);
    })
  }
  // clear old script tags
  let scriptElement = document.querySelector('.script')
  if (scriptElement) {
    oldTaskContainer.removeChild(scriptElement)
  }
  // make a get request to the end-point below
  // check authorization of user by adding an authorization header in the GET request
  let listId = localStorage.getItem("CURRENT_LIST")
  const res = await fetch(`/api/lists/${listId}/tasks`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "DFTM_USER_TOKEN"
      )}`
    }
  })
  if (res.status === 401) {
    window.location.href = "/log-in";
    return;
  }
  if (!res.ok) {
    throw res;
  }
  // extract tasks from the server response and dynamically generate HTML that is used to display the tasks
  const { allTasks } = await res.json()
  const taskListContainer = document.querySelector(".task-list-container")
  allTasks.forEach(task => {
    // make all of the HTML elements for the buttons and tasks
    let buttonContainer = document.createElement('div')
    let deleteButtonContainer = document.createElement('div')
    let updateButtonContainer = document.createElement('div')
    buttonContainer.classList.add("buttons-container")
    deleteButtonContainer.classList.add("delete-button-container")
    updateButtonContainer.classList.add("update-button-container")
    let deleteButton = document.createElement('button')
    let updateButton = document.createElement('button')
    deleteButton.setAttribute("type", "submit")
    updateButton.setAttribute("type", "submit")
    deleteButton.dataset.id = task.id
    updateButton.dataset.id = task.id
    deleteButton.classList.add("delete-task-btn")
    updateButton.classList.add("update-task-btn")
    deleteButton.innerHTML = "Delete"
    updateButton.innerHTML = "Update"
    deleteButtonContainer.appendChild(deleteButton)
    updateButtonContainer.appendChild(updateButton)
    buttonContainer.appendChild(deleteButtonContainer)
    buttonContainer.appendChild(updateButtonContainer)
    const taskContainer = document.createElement('div');
    taskContainer.classList.add("task-container")
    taskContainer.dataset.taskId = task.id
    const taskItem = document.createElement('div')
    taskItem.classList.add("task");
    taskItem.setAttribute("id", `${task.id}`)
    taskItem.innerHTML = task.taskName
    taskContainer.appendChild(taskItem)
    taskContainer.appendChild(buttonContainer)
    taskListContainer.appendChild(taskContainer)
  });
  // Set up event listeners on tasks so that information can be displayed after clicking on them
  const script = document.createElement('script')
  script.setAttribute('src', './js/test.js')
  script.classList.add('script')
  taskListContainer.appendChild(script)
  // set up event listeners on delete buttons
  const scriptForDeleteButtons = document.createElement('script')
  scriptForDeleteButtons.setAttribute('src', './js/modify-tasks.js')
  scriptForDeleteButtons.classList.add('script')
  taskListContainer.appendChild(scriptForDeleteButtons)
}

//---------------------------------------------------------------------------------

  const updateTaskNameForm = document.querySelector(".edit-task-name-form");
  updateTaskNameForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const formData = new FormData(updateTaskNameForm)
    const taskName = formData.get("taskName")
    const taskId = document.querySelector(".edit-task-name-input").dataset.id;

    const body = { taskName, taskId }

    try {
      const res = await fetch(`api/tasks/${taskId}/update-task-name`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem(
            "DFTM_ACCESS_TOKEN"
          )}`,
        }
      })
      if (res.status === 401) {
        window.location.href = "/log-in";
        return;
      }
      if (!res.ok) {
        throw res;
      }
      const { task } = await res.json()

      // Displays the task name in the header section (right column)
      const taskNameHeader = document.querySelector(".edit-task-name-form");
      taskNameHeader.reset();
      const taskNameInput = document.querySelector(".edit-task-name-input");

      taskNameInput.setAttribute("placeholder", task.taskName);

      await displayTasks(task)
    } catch (err) {
      console.error(err)
    }
  })
