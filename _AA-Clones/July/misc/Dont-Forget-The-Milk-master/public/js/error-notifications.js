export const errorNotifications = async (error) => {
  if (error.status >= 400 && error.status < 600) {
    const errorJSON = await error.json();
    console.log(errorJSON)
    const errorsContainer = document.querySelector(".errors-container");
    let errorsHtml = [
      `
        <div class="alert alert-danger">
            Something went wrong. Please try again.
        </div>
      `,
    ];
    const { errors } = errorJSON;
    if (errors && Array.isArray(errors)) {
      errorsHtml = errors.map(
        (message) => `
          <div class="alert alert-danger">
              <li>${message}</li>
          </div>
        `
      );
    }
    errorsContainer.innerHTML = errorsHtml.join("");
  } else {
    throw error;
  }
};
