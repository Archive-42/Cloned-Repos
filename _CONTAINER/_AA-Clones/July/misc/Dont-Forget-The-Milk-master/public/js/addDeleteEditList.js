// // const form = document.querySelector(".add-list-form")

// // form.addEventListener("submit", async(e) => {
// //   e.preventDefault();
// //   const formData = new FormData(form);
// //   const listName = formData.get("listName")
// //   const body = {listName};
// //   try {
// //     const res = await fetch("/api/lists", {
// //       method: "POST",
// //       body: JSON.stringify(body),
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Beearer ${localStorage.getItem(
// //           "DFTM_USER_TOKEN"
// //         )}`,
// //       },
// //     });
// //     if(res.status === 401) {
// //       window.location.href = "/log-in";
// //       return;
// //     }
// //     if(!res.ok) {
// //       throw res;
// //     }
// //     form.reset();
// //     await fetchList(userId);
// //   } catch (err) {
// //     handleErrors(err);
// //   }
// // });

// ////EDIT FUNCTION
// // Get the modal
// let modal = document.getElementById("myModal");

// // Get the button that opens the modal
// let editBtn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// let modalSpan = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// editBtn.onclick = function () {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }



// ///////working on this 
// // import {handleValidationErrors} from "../routes/api/utils.js"

// const fetchList = async (userId) => {
//   const res = await fetch(`/api/users/${userId}/lists`,
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem(
//           "DFTM_USER_TOKEN"
//         )}`,
//       }
//     }
//   );
//   if (res.status === 401) {
//     window.location.href = "/sign-in";
//     return;
//   }
//   const { lists } = await res.json();
//   const listsContainer = document.querySelector(".list-cat-container");
//   const listsHtml = lists.map(
//     ({ listName, id }) => `
//       <div class="lists">
//         <div class="list-header" data-list-id="${id}">
//           ${listName}
//           <div class="dropdown">
//             <button id="button-drop" class="button-drop fa fa-bars"></button>
//             <div class="drop-content" style="display:none">
//               <button data-editlist-id="${id}" class="edit-button">Rename<i class="fa fa-close"></i></button>
//               <button data-deletelist-id="${id}" class="delete-button fa fa-trash"></button>
//           </div>
//         </div>
//         </div>
//       </div>
//     `
//   );
//   listsContainer.innerHTML = listsHtml.join("");
//   const dropButtons = document.querySelectorAll(".button-drop");
//   // const click = document.getElementById("drop-content");

//   dropButtons.forEach(dropButton => {

//     dropButton.addEventListener('click', (event) => {
//       event.preventDefault();
//       event.stopPropagation();
//       let click = event.target.parentNode.querySelector('.drop-content')
//       console.log(click)
//       if (click.style.display === "none") {
//         click.style.display = "block";
//       } else {
//         click.style.display = "none";
//       }
//     });
//   })

//   const deleteButtons = document.querySelectorAll(".delete-button");
//   if (deleteButtons) {
//     deleteButtons.forEach((button) => {
//       button.addEventListener("click", e => handleDelete(button.dataset.deletelistId));
//     });
//   }

// };

// // When pressing Delete Button on the list
// const handleDelete = async (listId) => {
//   // return async () => {
//   try {
//     const res = await fetch(`/api/lists/${listId}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem(
//           "DFTM_USER_TOKEN"
//         )}`,
//       }
//     });
//     if (!res.ok) {
//       throw res;
//     }
//     document.querySelector(`[data-list-id="${listId}"]`).remove();
//   } catch (err) {
//     console.error(err);
//   }






//   //modal
//   ////EDIT FUNCTION
//   // Get the modal
//   let modal = document.getElementById("myModal");


//   // Get the <span> element that closes the modal
//   let modalSpan = document.getElementById("close-button");


//   // When the user clicks on <span> (x), close the modal
//   modalSpan.onclick = function () {
//     modal.style.display = "none";
//   }

//   // When the user clicks anywhere outside of the modal, close it
//   window.onclick = function (event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
//   }

//   //modal up there
//   const editButtons = document.querySelectorAll(".edit-button");
//   if (editButtons) {
//     editButtons.forEach((button) => {
//       button.addEventListener("click", (e) => {
//         event.stopPropagation();
//         let listId = button.dataset.editlistId;
//         modal.style.display = "block";
//         const saveButton = document.getElementById("submit-edit");
//         saveButton.addEventListener("click", e => {
//           event.stopPropagation();
//           handleEdit(listId);
//         })
//       });
//     })
//   }

//   const handleEdit = async (listId) => {
//     const form = document.querySelector(".edit-list-form");
//     const formData = new FormData(form);
//     const newListName = formData.get("listName");
//     const body = { listName };
//     try {
//       const res = await fetch(`/api/lists/${listId}`, {
//         method: "PUT",
//         body: JSON.stringify(body),
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem(
//             "DFTM_USER_TOKEN"
//           )}`,
//         }
//       });
//       if (!res.ok) {
//         throw res;
//       }
//       document.querySelector(`[data-list-id="${listId}"]`)
//     } catch (err) {
//       console.error(err);
//     }
//   }





//   //add a list button
//   const addListButton = document.getElementById("add-list-button");
//   addListButton.addEventListener("click", e => {
//     event.stopPropagation();
//     let click = document.querySelector(".list-drop-content");
//     if (click.style.display === "none") {
//       click.style.display = "block";
//     } else {
//       click.style.display = "none";
//     }

//   });

//   // };
// };

// const handleEdit = async (listId) => {
//   const form = document.querySelector(".edit-list-form");
//   const formData = new FormData(form);
//   const newListName = formData.get("listName");
//   const body = { listName };
//   try {
//     const res = await fetch(`/api/lists/${listId}`, {
//       method: "PUT",
//       body: JSON.stringify(body),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem(
//           "DFTM_USER_TOKEN"
//         )}`,
//       }
//     });
//     if (!res.ok) {
//       throw res;
//     }
//     document.querySelector(`[data-list-id="${listId}"]`).remove();
//   } catch (err) {
//     console.error(err);
//   }
// }



// //modal
// ////EDIT FUNCTION
// // Get the modal
// let modal = document.getElementById("myModal");


// // Get the <span> element that closes the modal
// let modalSpan = document.getElementById("close-button");


// // When the user clicks on <span> (x), close the modal
// modalSpan.onclick = function () {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

// //modal up there
// const editButtons = document.querySelectorAll(".edit-button");
// if (editButtons) {
//   editButtons.forEach((button) => {
//     button.addEventListener("click", (e) => {
//       event.stopPropagation();
//       let listId = button.dataset.editlistId;
//       modal.style.display = "block";
//       const saveButton = document.getElementById("submit-edit");
//       saveButton.addEventListener("click", e => {
//         event.stopPropagation();
//         handleEdit(listId);
//       })
//     });
//   })
// }



//////EDIT LIST NAME

// let listkId;
// const runListForm = function () {

//   const editListForm = document.getElementById("edit-list-form")

//   editTaskForm.addEventListener("submit", async (e) => {
//     editTaskForm.style.display = "none"
//     e.preventDefault();
//     e.stopImmediatePropagation();

//     const formData = new FormData(updateTaskForm)
//     const taskName = formData.get("taskName")
//     const dueDate = formData.get("dueDate")
//     const description = formData.get("description")

//     const body = { taskName, dueDate, description, taskId }

//     try {
//       const res = await fetch(`api/tasks/${taskId}/update-task`, {
//         method: "PUT",
//         body: JSON.stringify(body),
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem(
//             "DFTM_ACCESS_TOKEN"
//           )}`,
//         }
//       })

//       if (res.status === 401) {
//         window.location.href = "/log-in";
//         return;
//       }
//       if (!res.ok) {
//         throw res;
//       }

//       const { task } = await res.json()

//       await displayTasks(task)

//     } catch (err) {
//       console.error(err)
//     }
//   })
// }