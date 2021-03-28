
// Edits the NAME of the task ==================================================
const taskNameForm = document.getElementById("edit-task-form");
taskNameForm.addEventListener("keydown", async (e) => {

  if (e.keyCode === 13) {
    e.preventDefault();
    alert("enter button pressed!");
    const formData = new FormData(taskNameForm);
    const taskNameToUpdate = formData.get("taskNameToUpdate");

    console.log("test!!!! ", taskNameToUpdate);
    
    // The rest of the code should take the value and UPDATE the name of the task
  }

});