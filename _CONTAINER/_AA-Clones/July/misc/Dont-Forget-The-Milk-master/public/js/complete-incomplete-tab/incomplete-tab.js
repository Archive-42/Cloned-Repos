document.addEventListener("DOMContentLoaded", event => {
  const userId = localStorage.getItem("DFTM_USER_ID");
  const token = localStorage.getItem("DFTM_ACCESS_TOKEN");
  const incompleteTab = document.querySelector(".incomplete-task-tab");
  const oldTaskContainer = document.getElementById("task-list-container")


  incompleteTab.addEventListener("click", async event => {
    const listId = localStorage.getItem("CURRENT_LIST")
    // console.log(listId)


    // Remove old tasks from the list of tasks
    let oldTasks = document.querySelectorAll(".task-container")
    if(oldTasks) {
      oldTasks.forEach( task => {
        oldTaskContainer.removeChild(task)
      })
    }

    // Remove script tags for tasks
    let scriptElement = document.querySelector('.script')
    if(scriptElement) {
      oldTaskContainer.removeChild(scriptElement)
    }

    if(!listId){
      const allTasksJson = await fetch(`/api/users/${userId}/lists/incompletedTasks`, {
        headers: {
          "Authorization": `Bearer: ${token}`
        }
      })


      const allTasksObj = await allTasksJson.json()
      const allTasksArr = allTasksObj.incompleteTasks
      // console.log(allTasksArr)
      allTasksArr.forEach(task => {

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
      })

    } else if (listId){
      const allTasksJson = await fetch(`/api/lists/${listId}/tasks/incompletedTasks`, {
        headers: {
          "Authorization": `Bearer: ${token}`
        }
      })

      const allTasksObj = await allTasksJson.json()
      const allTasksArr = allTasksObj.incompleteTasks
      // console.log(allTasksArr)
      allTasksArr.forEach(task => {
        // const oldTaskContainer = document.getElementById("task-list-container")

        // // Remove old tasks from the list of tasks
        // let oldTasks = document.querySelectorAll(".task-container")
        // if(oldTasks) {
        //   oldTasks.forEach( task => {
        //     oldTaskContainer.removeChild(task)
        //   })
        // }

        // // Remove script tags for tasks
        // let scriptElement = document.querySelector('.script')
        // if(scriptElement) {
        //   oldTaskContainer.removeChild(scriptElement)
        // }


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
      })
    }


  })
})
