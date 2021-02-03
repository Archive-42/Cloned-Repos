// COMMENTED OUT SOME OF DEREK'S CODE. CHECK TO SEE IF IT WORKS WHEN COMMENTED IN

(() => {
  const tasks = document.querySelectorAll(".task-container")
tasks.forEach(task => {
  task.addEventListener("click", async event => {

    // the two lines below get the task id from either the container or the update button
    // depending on which was clicked and is used in the fetch call below to display
    // the info in the right-col__task-info div
    const taskIdFromButton = event.target.dataset.id
    const taskIdFromContainer = event.target.parentNode.dataset.taskId

    const dueDateSpan = document.querySelector(".date-span")
    const listSpan = document.querySelector(".list-span")
    const description = document.querySelector(".task-description")
    const completed = document.querySelector(".completed-span")

    // console.log(taskIdFromButton)
    // console.log(taskIdFromContainer)
    let taskJson;
    if(taskIdFromButton !== undefined){
      taskJson = await fetch(`./api/tasks/${taskIdFromButton}`)
    } else {
      taskJson = await fetch(`./api/tasks/${taskIdFromContainer}`)
    }
    // const taskJson = await fetch(`./api/tasks/${taskId}`)
    let taskId;
    const taskInfo = await taskJson.json()
    taskId = taskInfo.tasks.id;

    // console.log(taskInfo)
    // console.log(taskInfo.tasks.List)

    if(taskInfo.tasks.dueDate === null) {
      dueDateSpan.innerHTML = "No Due Date"
    } else {
      const splitDateArr = taskInfo.tasks.dueDate.split("T")
      const displayDate = splitDateArr[0]
      dueDateSpan.innerHTML = `${displayDate}`
    }
    if(taskInfo.tasks.List.listName === undefined) {
      listName.innerHTML = "No List Name"
    } else {
      listSpan.innerHTML = taskInfo.tasks.List.listName
    }
    if(taskInfo.tasks.description === null) {
      description.innerHTML = "No Description"
    } else {
      description.innerHTML = taskInfo.tasks.description
    }

    if(taskInfo.tasks.isComplete === false) {
      completed.innerHTML = "Incomplete"
    } else {
      completed.innerHTML = "Complete"
    }


    // ======================================================================
      // When task is clicked, the task name shows up as the header of
      // of the right column.
      // User can click on the name to EDIT the name (ONLY)
      // ======================================================================

      const taskNameHeader = document.querySelector(".edit-task-name-form");
      taskNameHeader.style.display = "block";
      const taskNameInput = document.querySelector(".edit-task-name-input");
      taskNameInput.setAttribute("placeholder", taskInfo.tasks.taskName);
      taskNameInput.dataset.id = taskId;
      const editTaskModal = document.getElementById("edit-task-modal");
      if(!editTaskModal.dataset.id) {
        editTaskModal.style.display = "block";
        editTaskModal.dataset.id = 1;
        setTimeout(() => {
          editTaskModal.style.display = "none";
        }, 3900);
      }

  })
})

})();
