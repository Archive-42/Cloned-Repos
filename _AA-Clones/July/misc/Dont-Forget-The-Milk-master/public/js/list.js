// import {handleValidationErrors} from "../routes/api/utils.js"
/* <button id="add-list-button" class="add-list-button fa fa-plus fa-fw"></button> */

const fetchList = async (userId) => {
  let leftSide = ''

  leftSide = document.querySelector(".add-list-container");
  leftSide.innerHTML = `
      <a class="all-lists" id="all-lists">Lists</a>
        <button id="add-list-button" class="add-list-button fa fa-plus fa-fw"></button>
  `;

  const res = await fetch(`/api/users/${userId}/lists`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "DFTM_USER_TOKEN"
        )}`,
      }
    }
  );
  if (res.status === 401) {
    window.location.href = "/sign-in";
    return;
  }

  const { lists } = await res.json();
  const listsContainer = document.querySelector(".list-cat-container");
  const listsHtml = lists.map(
    ({ listName, id }) => `
      <div class="lists">
        <div class="list-header" data-list-id="${id}">
          ${listName}
          <div class="dropdown">
            <button id="button-drop" class="button-drop fa fa-bars"></button>
            <div class="drop-content" style="display:none">
              <button data-editlist-id="${id}" class="edit-button">Edit<i class="fa fa-close"></i></button>
              <button data-deletelist-id="${id}" class="delete-button fa fa-trash" ></button>
          </div>
        </div>
        </div>
      </div>
    `
  );
  listsContainer.innerHTML = listsHtml.join("");

  //add a list button
  let addListButton = document.getElementById("add-list-button");
  addListButton.addEventListener("click", e => {
    e.stopImmediatePropagation();
    e.preventDefault();
    const addForm = document.querySelector(".add-list-form-holder");
    addForm.style.display = "block";

  });




  const dropButtons = document.querySelectorAll(".button-drop");

  //DROP BUTTON
  dropButtons.forEach(dropButton => {

    dropButton.addEventListener('click', (event) => {

      event.preventDefault();
      event.stopPropagation();
      let click = event.target.parentNode.querySelector('.drop-content')
      if (click.style.display === "none") {
        click.style.display = "block";
      } else {
        click.style.display = "none";
      }




      window.onclick = function (event) {
        if (event.target === click) {
          click.style.display = "none";
        }
      }
    });
  })

  // const dropDownButtons = document.querySelector(".drop-content");

  // window.onclick = function (event) {
  //   if (event.target === dropDownButtons) {
  //     dropDownButtons.style.display = "none";
  //   }
  // }
  let deleteButtonId;
  const deleteButtons = document.querySelectorAll(".delete-button");
  if (deleteButtons) {
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async e => {
        // handleDelete(button.dataset.deletelistId))
        deleteButtonId = button.dataset.deletelistId;
        console.log(deleteButtonId)
      try {
        const res = await fetch(`/api/lists/${deleteButtonId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "DFTM_USER_TOKEN"
            )}`,
          }
        });
        if (!res.ok) {
          throw res;
        }
        document.querySelector(`[data-list-id="${deleteButtonId}"]`).remove();
        deleteButtonId = NaN;
        await fetchList(userId)
      } catch (err) {
        console.error(err);
      }
    });
  });
}






  ///EDIT BUTTON
  let editListIdTwo;
  const editButtons = document.querySelectorAll(".edit-button");
  if (editButtons) {
    editButtons.forEach((button) => {
      button.addEventListener("click", e => {
        e.stopPropagation();
        e.preventDefault();
        const editForm = document.querySelector(".edit-list-form-holder");
        editForm.style.display = "block";
        editListIdTwo = button.dataset.editlistId;
        const editListForm = document.getElementById("edit-list-form")
        editListForm.addEventListener("submit", async (e) => {
          e.stopPropagation();
          e.preventDefault();
          const form = document.getElementById("edit-list-form");
          const formData = new FormData(form);
          const editListName = formData.get("editListName");
          const body = { editListName };
          try {
            const res = await fetch(`/api/lists/${editListIdTwo}`, {
              method: "PUT",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem(
                  "DFTM_USER_TOKEN"
                )}`,
              }
            });
            if (!res.ok) {
              throw res;
            }
            editListIdTwo = NaN;
            form.reset();
            editForm.style.display = "none";
            await fetchList(userId);
          } catch (err) {
            console.error(err);
          }
        })

      })
    });
  }


};


document.addEventListener("DOMContentLoaded", async()=> {

  try{
    // localStorage.setItem('DFTM_USER_ID', 3)
    let userId = localStorage.getItem('DFTM_USER_ID');
    if (!userId) {
      window.location.href = '/sign-in';
    }
    await fetchList(userId);

    //ADD FORM SUBMIT

    const form = document.getElementById("add-list-form")

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      const addForm = document.querySelector(".add-list-form-holder");
      addForm.style.display = "block";
      const formData = new FormData(form);
      let listName = formData.get("listName");
      const body = { listName };
      try {
        const res = await fetch(`/api/users/${userId}/lists`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
              "DFTM_USER_TOKEN"
            )}`,
          },
        });
        if (res.status === 401) {
          window.location.href = "/log-in";
          return;
        }
        if (!res.ok) {
          throw res;
        }
        form.reset();
        addForm.style.display = "none";
        await fetchList(userId);
      } catch (err) {
        handleErrors(err);
      }
    });




      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        e.stopImmediatePropagation()
        const formData = new FormData(form);
        const listName = formData.get("listName")
        const body = { listName };
        try {
          const res = await fetch(`/api/users/${userId}/lists`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Beearer ${localStorage.getItem(
                "DFTM_USER_TOKEN"
              )}`,
            },
          });
          if (res.status === 401) {
            window.location.href = "/log-in";
            return;
          }
          if (!res.ok) {
            throw res;
          }
          form.reset();
          console.log('hello')
          await fetchList(userId);
        } catch (err) {
          handleErrors(err);
        }
      });
      // displays user name on the nav ========================================
      // const navUserName = document.getElementById("navUserName");
      // // console.log(navUserName)
      // // console.log("USER NAME!!!!", localStorage.getItem("DFTM_USER_NAME"));
      // navUserName.innerText = localStorage.getItem("DFTM_USER_NAME") + "!";

  } catch (e) {
    console.error(e);
  }

});
