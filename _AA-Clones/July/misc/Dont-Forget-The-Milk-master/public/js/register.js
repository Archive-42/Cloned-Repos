import { errorNotifications } from "./error-notifications.js";

const registrationForm = document.querySelector(".registration-form");

registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(registrationForm);

  const firstName = formData.get("firstname");
  const lastName = formData.get("lastname");
  const userName = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmpass");

  const body = {
    firstName,
    lastName,
    userName,
    email,
    password,
    confirmPassword,
  };

  try {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      throw res;
    }

    const { token, user: { id, userName } } = await res.json();

    localStorage.setItem("DFTM_USER_TOKEN", token);
    localStorage.setItem("DFTM_USER_ID", id);
    localStorage.setItem("DFTM_USER_NAME", userName);

    window.location.href = "/";
  } catch (error) {
    errorNotifications(error);

  }
});
