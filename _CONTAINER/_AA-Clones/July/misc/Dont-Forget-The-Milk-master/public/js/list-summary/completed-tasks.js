document.addEventListener("DOMContentLoaded", async (event) => {
  //Access the user access token to pass into the header to authorize the user during our requests.
  const token = localStorage.getItem("DFTM_ACCESS_TOKEN");
  const userId = localStorage.getItem("DFTM_USER_ID")
  const listId = localStorage.getItem("CURRENT_LIST")

  const completedTasksSpan = document.querySelector(".completed-tasks-span")

  //Decide how to figure out which listID we're pulling from.

  //We select all tasks with the class of task, which should be set for every task.
  const selectedTask = document.querySelectorAll("task")
  //For each task, we set up an event listener to find which task is being selected.
  // let listId;
  let taskId;
  let counter; //Set up a counter, to count the number of tasks.

  //If no list has been selected. We will fetch all of the completed tasks.
  if (!listId){
    // console.log(listId)
    const allLists = await fetch(`/api/users/${userId}/lists`, { //Returns a list of all lists.
      headers: {
        "Authorization": `Bearer: ${token}`
      }
    })


    const listRes = await allLists.json()
    const listArr = listRes.lists
    counter = 0;
    listArr.forEach( async list => {
      const eachTask = await fetch(`/api/lists/${list.id}/tasks`, { //This request will get all the tasks for a list.
        headers: {
          "Authorization": `Bearer: ${token}`
        }
      })
      const taskRes = await eachTask.json()
      //Select only thet asks from the res.
      // console.log(taskRes.allTasks)
      const allTasks = taskRes.allTasks

      //Loop through each task, to find the number of tasks that are complete
      allTasks.forEach(tasks => {
        if(tasks.isComplete === true){
          counter++
        }
      })

      //Set the innerHTML of our completeTaskSpan to equal the count of all tasks from each list which have been filtered
      completedTasksSpan.innerHTML = counter;
    })

  }

  if(listId){
    const allLists = await fetch(`/api/lists/${listId}/tasks`, { //Returns a list of all tasks from a list
      headers: {
        "Authorization": `Bearer: ${token}`
      }
    })
    const listRes = await allLists.json()
    const listArr = listRes.tasks
    console.log(listRes.tasks)
    counter = 0;
    listArr.forEach(task => {
      if(task.isComplete === true){
        counter++
      }
    })
    completedTasksSpan.innerHTML = counter;
    // listArr.forEach( async list => {
    //   const eachTask = await fetch(`/api/lists/${list.id}/tasks`, { //This request will get all the tasks for a list.
    //     headers: {
    //       "Authorization": `Bearer: ${token}`
    //     }
    //   })
    //   const taskRes = await eachTask.json()
    //   //Select only thet asks from the res.
    //   // console.log(taskRes.allTasks)
    //   const allTasks = taskRes.allTasks

    //   //Loop through each task, to find the number of tasks that are complete
    //   allTasks.forEach(tasks => {
    //     if(tasks.isComplete === true){
    //       counter++
    //     }
    //   })

    //   //Set the innerHTML of our completeTaskSpan to equal the count of all tasks from each list which have been filtered
    //   completedTasksSpan.innerHTML = counter;
    // })
  }

  //Set up event listeners for all tasks that are displayed on the page, to update the
  //Number of completed tasks if someone selects a task on a particular list.

  //TASKS/LISTS FUNCTIONALITY MUST BE COMPLETE BEFORE MOVING FORWARD
  //ADD EVENT LISTENERS TO DELETE BUTTON TO CHANGE THE NUMBERS UNDER THESE SPANS
  //=================================================================================================================================================================
  selectedTask.forEach(task => {
    task.addEventListener("click", async event => {
      taskId = event.target.id

        const tasksList = await fetch(`/api/tasks/${taskId}`, {
          headers: {
            "Authorization": `Bearer: ${token}`
          }
        })

        listId = tasksList.listId

      try {
        //We grab all the tasks, from the specific list
        const res = await fetch(`/api/lists/${listId}`, {
          headers: {
            "Authorization": `Bearer: ${token}`
          }
        })

        //if the user's authrozation is not valid, they will be redirected to log-in
        if(res.status === 401) {
          window.location.href = "/log-in"
        }

        const { tasks } = await res.json()

        //Filter through all the tasks, to find which tasks are completed by accessing the column isComplete and checking the boolean value
        const completedTasks = tasks.filter( task => {
          task.isComplete === true
        })

        //We take the element with the class completed tasks-span and set the innerHTML of the div to display the number of tasks which have been filtered to show which ones are complete.
        // console.log(completedTasks)
        completedTasksSpan.innerHTML = completedTasks.length;


      } catch (e){
        console.log(e)

      }
      //===============================================================================================================================================================================
    })
  })

})
