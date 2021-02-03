// const { all } = require("sequelize/types/lib/operators");

document.addEventListener("DOMContentLoaded", async (event) => {
  //Access the user access token to pass into the header to authorize the user during our requests.
  const token = localStorage.getItem("DFTM_ACCESS_TOKEN");
  const userId = localStorage.getItem("DFTM_USER_ID")
  const totalTasksSpan = document.querySelector(".total-task-span")


  //Decide how to figure out which listID we're pulling from.

  //We select all tasks with the class of task, which should be set for every task.
  const selectedTask = document.querySelectorAll("task")
  let listId;
  let taskId;
  let counter; //Set up a counter, to count the number of tasks.

  //If there is no list/task selected, we want to display a number for total tasks.
  const displayTotalTasks = async () => {
    const allLists = await fetch(`/api/users/${userId}/lists`, { //Returns a list of all lists.
      headers: {
        "Authorization": `Bearer: ${token}`
      }
    })

    const listsRes = await allLists.json()
    console.log(listsRes.lists)
    counter = 0;
    listsRes.lists.forEach( async list => {
      // console.log(list.task.length)
      counter += list.task.length

      totalTasksSpan.innerHTML = counter;
    })

  }

  displayTotalTasks()
    //Set the innerHTML of our totalTaskSpan to equal the count of all tasks added from each list

  //For each task, we set up an event listener to find which task is being selected.
  //ADD EVENT LISTENERS TO DELETE BUTTON TO CHANGE THE NUMBERS UNDER THESE SPANS
  //=================================================================================================================================================================
  // selectedTask.forEach(task => {
  //   task.addEventListener("click", async event => {
  //     event.stopImmediatePropagation
  //     taskId = event.target.id

  //     const tasksList = await fetch(`/api/tasks/${taskId}`, {
  //       headers: {
  //         "Authorization": `Bearer: ${token}`
  //       }
  //     })

  //     listId = tasksList.listId

  //     try {
  //       //We grab all the tasks, from the specific list
  //       const res = await fetch(`/api/lists/${listId}`, {
  //         headers: {
  //           "Authorization": `Bearer: ${token}`
  //         }
  //       })

  //       //if the user's authrozation is not valid, they will be redirected to log-in
  //       if(res.status === 401) {
  //         window.location.href = "/log-in"
  //       }

  //       const { tasks } = await res.json()

  //       //We take the element with the class total-task-span and set the innerHTML of the div to display the number of all tasks.
  //       totalTasksSpan.innerHTML = tasks.length;


  //     } catch (e){
  //       console.log(e)

  //     }
  //   })
  //   //==============================================================================================================================================================================
  // })


})
