document.addEventListener('DOMContentLoaded', e => {

  const addTask = document.querySelector(".add-task-btn")


  const addTaskForm = document.querySelector(".add-task-form")
  // send a post request to create a new task
  addTaskForm.addEventListener("submit", async(e) => {

    e.preventDefault()
    e.stopPropagation();
    const selectListPopup = document.querySelector(".select-list-popup-holder")
    let listId = localStorage.getItem("CURRENT_LIST")
    console.log(listId)
    if(listId === null) {
      selectListPopup.style.display = "block"
      return
    }
    console.log(listId)
    const formData = new FormData(addTaskForm)
    const newTask = formData.get("new-task")
    let userId = localStorage.getItem("DFTM_USER_ID")
    const body = { newTask, listId, userId }
    try{
      const res = await fetch(`api/lists/${listId}/tasks/create-task`, {
        method: "POST",
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

      addTaskForm.reset();
      // document.querySelector(".total-task-span").innerHTML ++
      const { task } = await res.json()

      // clear old script tags

      const oldTaskContainer = document.getElementById("task-list-container")

      let scriptElement = document.querySelector('.script')
      if(scriptElement) {
        oldTaskContainer.removeChild(scriptElement)
      }

      const taskListContainer = document.querySelector(".task-list-container")
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
      taskContainer.dataset.taskId = task.id
      taskContainer.classList.add("task-container")
      const taskItem = document.createElement('div')
      taskItem.classList.add("task");
      taskItem.setAttribute("id", `${task.id}`)
      taskItem.innerHTML = task.taskName
      taskContainer.appendChild(taskItem)
      taskContainer.appendChild(buttonContainer)
      taskListContainer.appendChild(taskContainer)

      // add click event listeners on all of the tasks

      const script = document.createElement('script')
      script.setAttribute('src', './js/test.js')
      script.classList.add('script')
      taskListContainer.appendChild(script)

      // set up event listeners on delete buttons

      const scriptForDeleteButtons = document.createElement('script')
      scriptForDeleteButtons.setAttribute('src', './js/modify-tasks.js')
      scriptForDeleteButtons.classList.add('script')
      taskListContainer.appendChild(scriptForDeleteButtons)

      //Functionality to add one to the innerHTML of allTasks container
      const allTasksSpan = document.querySelector(".total-task-span")
      let allTasksValue = allTasksSpan.innerHTML
      allTasksSpan.innerHTML = Number(`${allTasksValue}`) + 1

    } catch(err) {
      console.error(err)
    }
  })
})
