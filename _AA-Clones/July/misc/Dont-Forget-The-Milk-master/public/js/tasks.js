document.addEventListener('DOMContentLoaded', e => {
  if(localStorage.getItem('CURRENT_LIST')) {
    localStorage.removeItem('CURRENT_LIST')
  }

  // set up the variable for the list id that will be used to navigate to the correct endpoint
  // obtain the userId from the access token that is in the user's local storage, because it's needed for authentication

  let listId;

  // find and add a click event listener to all the lists so that the list id can be extracted and used in the path for the GET request
  // to obtain and display all tasks associated with the given list

  const lists = document.querySelectorAll('.list-cat-container');

  lists.forEach(list => {
    list.addEventListener('click', async(e) => {
      e.stopImmediatePropagation();


      const listHeader = document.getElementById("list-header")
      // localStorage.setItem("DFTM_USER_ID", 1)
      // let userId = localStorage.getItem("DFTM_USER_ID")

      listId = e.target.dataset.listId;

      listHeader.innerHTML = e.target.innerText

      localStorage.setItem("CURRENT_LIST", listId)

      try {

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

        // not finished... am going to add update and delete buttons


        // extract tasks from the server response and dynamically generate HTML that is used to display the tasks


        const {allTasks, count}  = await res.json()

        const totalTaskSpan = document.querySelector(".total-task-span")
        totalTaskSpan.innerHTML = allTasks.length
        const completedTasksSpan = document.querySelector(".completed-tasks-span")
        completedTasksSpan.innerHTML = count

        let overdue = 0;
        let currentDate = new Date()
        let currentDateVals =
        [
          currentDate.getFullYear(),
          currentDate.getMonth()+1,
          currentDate.getDate(),
        ]
        // console.log(allTasks)
        // document.querySelector(".total-task-span").innerHTML = allTasks.length
        allTasks.forEach(task => {
          let dueDate = task.dueDate
          if(dueDate !== null){
            dueDate = dueDate.slice(0, 10).split('-')
            // console.log('due date:', dueDate)
            // console.log(currentDateVals)
            if(currentDateVals[0] > dueDate[0]){
              console.log('first')
              overdue +=1
              return;
            } else if(currentDateVals[0] == dueDate[0] && currentDateVals[1] > dueDate[1]) {
              console.log('second')
              overdue += 1
              return
            } else if(currentDateVals[1] == dueDate[1] && currentDateVals[2] > dueDate[2]){
              console.log('third')
              overdue += 1
            }
          }
        })
        console.log('hello')
        document.querySelector(".overdue-tasks-span").innerHTML = overdue;

        const taskListContainer = document.querySelector(".task-list-container")
        allTasks.forEach(task => {

          // make all of the HTML elements for the buttons

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

          // make all of the HTML elements for the buttons

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

        // deal with any errors that arise

      } catch(err) {
        // handleErrors(err)
        console.error(err)
      }

    });
  });
});
