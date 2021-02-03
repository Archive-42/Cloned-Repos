document.addEventListener("DOMContentLoaded", e => {


  // display tasks after updating

  const displayTasks = async function(task) {


    // clear old tasks

    let oldTaskContainer = document.getElementById("task-list-container");
    let oldTasks = document.querySelectorAll(".task-container");
    if(oldTasks) {
      oldTasks.forEach(task => {
        oldTaskContainer.removeChild(task);

      })

    }

    // clear old script tags

    let scriptElement = document.querySelector('.script')
    if(scriptElement) {
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

    if(!res.ok) {
      throw res;
    }

    // extract tasks from the server response and dynamically generate HTML that is used to display the tasks

    // console.log("soemthing", await res.json())
    const {allTasks}  = await res.json()
    let overdue = 0;
    let currentDate = new Date()
    let currentDateVals =
    [currentDate.getFullYear(),
      currentDate.getMonth()+1,
    currentDate.getDate(),
    ]
    // console.log(allTasks)
    document.querySelector(".total-task-span").innerHTML = allTasks.length
    allTasks.forEach(task => {
      let dueDate = task.dueDate
      if(dueDate !== null){
        dueDate = dueDate.slice(0, 10).split('-')
        // console.log('due date:', dueDate)
        // console.log(currentDateVals)
        if(currentDateVals[0] > dueDate[0]){
          overdue +=1
          return;
        } else if(currentDateVals[0] == dueDate[0] && currentDateVals[1] > dueDate[1]) {
          overdue += 1
          return
        } else if(currentDateVals[1] == dueDate[1] && currentDateVals[2] > dueDate[2]){
          overdue += 1
        }
      }
    })
    document.querySelector(".overdue-tasks-span").innerHTML = overdue;

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

  // delete a task on the back-end and make a call to the function that renders the change on the front-end

  const deleteTask = async function (taskId) {
    let listId = localStorage.getItem("CURRENT_LIST")

    const body = {taskId}

    try {
      const res = await fetch(`/api/tasks/${taskId}/get-task`, {
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

      if(!res.ok) {
        throw res;
      }

      const {task}  = await res.json()

      let overdue = document.querySelector(".overdue-tasks-span")
      // console.log('overdue container:', overdue)
      let currentDate = new Date()
      console.log('current date:', currentDate)
      let currentDateVals =
      [currentDate.getFullYear(),
        currentDate.getMonth()+1,
      currentDate.getDate(),
      ]
      let dueDate = task.dueDate
      console.log(dueDate)
      if(dueDate !== null){
        dueDate = dueDate.slice(0, 10).split('-')
        // console.log('due date:', dueDate)
        // console.log(currentDateVals)
        if(currentDateVals[0] > dueDate[0]){
           overdue.innerHTML -= 1
          return;
        } else if(currentDateVals[0] == dueDate[0] && currentDateVals[1] > dueDate[1]) {
          overdue.innerHTML -= 1
          return
        } else if(currentDateVals[1] == dueDate[1] && currentDateVals[2] > dueDate[2]){
          overdue.innerHTML -= 1
        }
      }
      // document.querySelector(".overdue-tasks-span").innerHTML = overdue;

    } catch(err) {
      console.error(err)
    }

    try{
      const res = await fetch(`/api/lists/${listId}/tasks/delete-task`, {
        method: 'DELETE',
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

      if(!res.ok) {
        throw res;
      }

      const data  = await res.json()
      // console.log(data.deletedTask)
      const deletedTask = document.querySelector(`[data-task-id="${data.deletedTask}"]`)
      deletedTask.remove()

      const totalTasks = document.querySelector(".total-task-span")
      totalTasks.innerHTML -= 1


    } catch(err) {
      console.error(err)
    }

  }

  //-----------------------------------------------------------------------------

  // Update tasks on the back-end and render the change on the front-end

  let taskId;
  const runTaskForm = function() {

    const updateTaskForm = document.getElementById("edit-task-form")
    updateTaskForm.addEventListener("submit", async(e) => {
      editTaskForm.style.display = "none"
      e.preventDefault();
      e.stopImmediatePropagation();

      const formData = new FormData(updateTaskForm)
      const taskName = formData.get("taskName")
      let dueDate = formData.get("dueDate")
      if(dueDate === "No Due Date") {
        dueDate = ''
      }
      const description = formData.get("description")

      let status = document.querySelector(".status").value;
      // console.log(status)
      // console.log(typeof status)

      if(status === "false") {
        status = false
      }else if (status === "true") {
        status = true
      }

      const isCompleteDisplay = document.querySelector(".completed-span").innerText
      if(status === true && isCompleteDisplay === "Incomplete") {
        const completedTaskSpan = document.querySelector(".completed-tasks-span")
        let numericalCompletedTasks = Number(completedTaskSpan.innerHTML)
        completedTaskSpan.innerHTML = numericalCompletedTasks + 1

      } else if(status === false && isCompleteDisplay === "Complete"){
        const completedTaskSpan = document.querySelector(".completed-tasks-span")
        let numericalCompletedTasks = Number(completedTaskSpan.innerHTML)
        completedTaskSpan.innerHTML = numericalCompletedTasks - 1
      }


      const body = {taskName, dueDate, description, status, taskId}
      console.log(body)
      try{
        const res = await fetch(`api/tasks/${taskId}/update-task`, {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem(
              "DFTM_ACCESS_TOKEN"
              )}`,
            }
          })

        //Functionality to display increment overdue tasks span if new task has a due date that has passed.


        // if(new Date(dueDate) > new Date() && status === false){
        //   const overdueTasksSpan = document.querySelector(".overdue-tasks-span")
        //   let overdueTasksValue = overdueTasksSpan.innerHTML
        //   overdueTasksSpan.innerHTML = Number(`${overdueTasksValue}`) - 1
        // }

        // if(new Date(dueDate) < new Date() && status === false){
        //   const overdueTasksSpan = document.querySelector(".overdue-tasks-span")
        //   let overdueTasksValue = overdueTasksSpan.innerHTML
        //   overdueTasksSpan.innerHTML = Number(`${overdueTasksValue}`) + 1

        // }

        // if(new Date(dueDate) < new Date() && status === true){
        //   const overdueTasksSpan = document.querySelector(".overdue-tasks-span")
        //   let overdueTasksValue = overdueTasksSpan.innerHTML
        //   overdueTasksSpan.innerHTML = Number(`${overdueTasksValue}`) - 1
        // }

        // console.log(res)
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
        taskNameHeader.style.display = "block";

        const taskNameInput = document.querySelector(".edit-task-name-input");
        taskNameInput.setAttribute("placeholder", task.taskName);

        // Displays description on the task info section (right column)
        const description = document.querySelector(".task-description");
        description.innerHTML = task.description;

        const completionStatus = document.querySelector(".completed-span");
        if(task.isComplete === true){
          completionStatus.innerHTML = "Complete"
        } else if(task.isComplete === false) {
          completionStatus.innerHTML = "Incomplete"
        }

        await displayTasks(task)


      }catch(err) {
        console.error(err)
      }
    })
  }

  //--------------------------------------------------------------------------------

  // functionality for deleting a task on the front end

  const tasksContainer = document.querySelector('.task-list-container');
  // console.log(tasksContainer)


  tasksContainer.addEventListener("click", async(e)=> {
    e.preventDefault();
    e.stopImmediatePropagation();
    if(e.target.className.startsWith('delete')) {
      const overdueSpan = document.querySelector(".overdue-tasks-span")
      const taskId = e.target.dataset.id
      const currentTaskJson = await fetch(`./api/tasks/${taskId}`)
      const currentTask = await currentTaskJson.json()
      const taskDueDate = currentTask.tasks.dueDate
      const completedSpan = document.querySelector(".completed-tasks-span")
      const taskStatus = currentTask.tasks.isComplete
      const allTasksSpan = document.querySelector(".total-task-span")

      // if(new Date(taskDueDate) < new Date() && taskDueDate !== null){
      //   const overdueNum = Number(overdueSpan.innerHTML) - 1
      //   overdueSpan.innerHTML = overdueNum

      // }

      if(taskStatus === true ){
        const completedNum = Number(completedSpan.innerHTML) - 1
        completedSpan.innerHTML = completedNum

      }

      deleteTask(taskId)

      //Functionality to subtract one from allTasks if a task is successfully deleted

    } else if (e.target.className.startsWith('update')) {
      taskId = e.target.dataset.id
      const editTaskForm = document.querySelector(".edit-task-form-holder")

      // getting text from the right-col__task-info div
      const date = document.querySelector(".date-span")
      const taskContent = document.getElementById(taskId)
      const description = document.querySelector(".task-description")
      if(!description.innerText || description.innerText === "THIS HOLDS THE DESCRIPTION") {
        description.innerText = ''
      }
      // this adds the text from above to the update form
      setTimeout(() => {
        document.querySelector(".taskNameField").value = taskContent.innerText

        document.querySelector(".dueDateField").value = date.innerText

        document.querySelector(".descriptionField").value = description.innerText
        editTaskForm.style.display = "block"
      },50)

      runTaskForm()
    }
    return;
  })
})
