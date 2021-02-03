document.addEventListener("DOMContentLoaded", async (event) => {
  //Access the user access token to pass into the header to authorize the user during our requests.
  const token = localStorage.getItem("DFTM_ACCESS_TOKEN");
  const userId = localStorage.getItem("DFTM_USER_ID")
  const overdueTasksSpan = document.querySelector(".overdue-tasks-span")


  //Decide how to figure out which listID we're pulling from.

  //We select all tasks with the class of task, which should be set for every task.
  const selectedTask = document.querySelectorAll("task")
  //For each task, we set up an event listener to find which task is being selected.
  let listId;
  let taskId;
  let counter; //Set up a counter, to count the number of tasks.

  //If no list has been selected. We will fetch all of the completed tasks.

  const allLists = await fetch(`/api/users/${userId}/lists`, { //Returns a list of all lists.
    headers: {
      "Authorization": `Bearer: ${token}`
    }
  })


  const listRes = await allLists.json()
  const listsArr = listRes.lists
  counter = 0;
  listsArr.forEach( async list => {
    const eachTask = await fetch(`/api/lists/${list.id}/tasks`, { //This request will get all the tasks for a list.
      headers: {
        "Authorization": `Bearer: ${token}`
      }
    })

    const taskRes = await eachTask.json()
    //Select only thet asks from the res.
    // console.log("TaskRes", taskRes)
    const allTasks = taskRes.allTasks

    //Loop through each task, to find the number of tasks that are complete
    // allTasks.forEach(tasks => {
    //   const dueDate = (Date.parse(tasks.dueDate))
    //   // console.log(dueDate)
    //   const today = (Date.parse(new Date()))
    //   //Add one to the counter, if the parsed due date is less than today's date, and is not NaN
    //   if(dueDate < new Date() && today !== NaN && tasks.isComplete === false){
    //     counter++
    //   }
    // })

    // //Set the innerHTML of our completeTaskSpan to equal the count of all tasks from each list which have been filtered
    // overdueTasksSpan.innerHTML = counter;

    // FIXES THE ABOVE COMMENTED OUT CODE TO DISPLAY THE CORRECT NUMBER OF OVERDUE
    // TASKS ACROSS ALL LISTS

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

        document.querySelector(".overdue-tasks-span").innerHTML = overdue;
  })

  //Set up event listeners for all tasks that are displayed on the page, to update the
  //Number of completed tasks if someone selects a task on a particular list.

  //TASKS/LISTS FUNCTIONALITY MUST BE COMPLETE BEFORE MOVING FORWARD
  //Add functionality to load the correct task's information when a task is selected on the page.
  selectedTask.forEach(async task => {
    task.addEventListener("click", async event => {
      taskId = event.target.id

      //If a task has been selected, we grab the information about the task from our api.
      //Extract the listId from our task.
      if(taskId){
        const taskList = await fetch(`/api/tasks/${taskId}`, {
          headers: {
            "Authorization": `Bearer: ${token}`
          }
        })

        listId = taskList.listId

      }

      //If there is no list/task selected, we want to display a number for total tasks.

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
        const overdueTasks = tasks.filter( task => {
          const dueDate = (Date.parse(tasks.dueDate))
          const today = (Date.parse(new Date()))

          dueDate < new Date() && today !== NaN

        })

        //We take the element with the class overdue-tasks-span and set the innerHTML of the div to display the number of tasks which have been filtered to show which tasks have due dates less than today's date.
        overdueTasksSpan.innerHTML = overdueTasks.length;


      } catch (e){
        console.log(e)

      }
    })
  })

})



// document.addEventListener("DOMContentLoaded", async (event) => {
//   //Access the user access token to pass into the header to authorize the user during our requests.
//   const token = localStorage.getItem("DFTM_ACCESS_TOKEN");

//   const overdueTasksSpan = document.querySelector(".overdue-tasks-span")

//   //Decide how to figure out which listID we're pulling from.

//   //We select all tasks with the class of task, which should be set for every task.
//   const selectedTask = document.querySelectorAll("task")
//   //For each task, we set up an event listener to find which task is being selected.
//   let listId;
//   let taskId;
//   let counter; //Set up a counter, to count the number of tasks.

//   //If no list has been selected. We will fetch all of the completed tasks.

//   const allLists = await fetch(`/api/lists`, { //Returns a list of all lists.
//     headers: {
//       "Authorization": `Bearer: ${token}`
//     }
//   })


//   const listRes = await allLists.json()
//   // console.log(listRes.allLists)
//   counter = 0;
//   listRes.allLists.forEach( async list => {
//     const eachTask = await fetch(`/api/lists/${list.id}`, { //This request will get all the tasks for a list.
//       headers: {
//         "Authorization": `Bearer: ${token}`
//       }
//     })
//     const taskRes = await eachTask.json()
//     //Select only thet asks from the res.
//     const allTasks = taskRes.list.Tasks

//     //Loop through each task, to find the number of tasks that are overdue
//     allTasks.forEach(tasks => {
//       const today = new Date()
//       console.log(today)
//       console.log(tasks.dueDate)
//       if(tasks.dueDate < today && tasks.dueDate !== null){
//         counter++
//       }
//     })

//     //Set the innerHTML of our overdueTaskSpan to equal the count of all tasks from each list which have been filtered
//     overdueTasksSpan.innerHTML = counter;
//   })

//   //Set up event listeners for all tasks that are displayed on the page, to update the
//   //Number of overdue tasks if someone selects a task on a particular list.

//   //TASKS/LISTS FUNCTIONALITY MUST BE COMPLETE BEFORE MOVING FORWARD
//   selectedTask.forEach(task => {
//     task.addEventListener("click", async event => {
//       taskId = event.target.id

//         const tasksList = await fetch(`/api/tasks/${taskId}`, {
//           headers: {
//             "Authorization": `Bearer: ${token}`
//           }
//         })

//         listId = tasksList.listId

//       try {
//         //We grab all the tasks, from the specific list
//         const res = await fetch(`/api/lists/${listId}`, {
//           headers: {
//             "Authorization": `Bearer: ${token}`
//           }
//         })

//         //if the user's authrozation is not valid, they will be redirected to log-in
//         if(res.status === 401) {
//           window.location.href = "/log-in"
//         }

//         const { tasks } = await res.json()

//         //Filter through all the tasks, to find which tasks are overdue by accessing the column dueDate and comparing it to today's date
//         const overdueTasks = tasks.filter( task => {
//           task.isComplete === true
//         })

//         //We take the element with the class overdue tasks-span and set the innerHTML of the div to display the number of tasks which have been filtered to show which ones dueDate is less than today's date.
//         overdueTasksSpan.innerHTML = overdueTasks.length;


//       } catch (e){
//         console.log(e)

//       }
//     })
//   })

// })
