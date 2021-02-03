const searchForm= document.getElementById("search-form");
searchForm.addEventListener("submit", async (e) => {

  // if(e.keyCode === 13) {
    e.preventDefault();
    const formData = new FormData(searchForm);
    const searchStr = formData.get("searchStr");
    // console.log("SEARCH STRING ", searchStr);

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

      const userId = localStorage.getItem('DFTM_USER_ID')

      const res = await fetch(`/api/users/${userId}/lists/search`);

      if(!res.ok) {
        throw res;
      }

      const {allLists} = await res.json();
      const matchingTasks = []

      // console.log(allLists)

      allLists.forEach(list => {
        // if(list.task.taskName) {
          // console.log(list.task)
        // }
        for(let i=0; i<list.task.length; i++) {
          console.log(list.task[i].taskName)
          console.log(searchStr)
          if(list.task[i].taskName.toLowerCase().includes(searchStr.toLowerCase())) {
            console.log(list.task[i])
            matchingTasks.push(list.task[i])
          }
        }
      })

      console.log(matchingTasks)

      const taskListContainer = document.querySelector(".task-list-container")
      matchingTasks.forEach(task => {

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

    } catch (err) {
      console.error(err);
    }
 
});
