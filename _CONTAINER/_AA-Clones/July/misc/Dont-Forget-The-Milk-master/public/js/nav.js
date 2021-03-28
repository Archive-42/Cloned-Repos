import { errorNotifications } from "./error-notifications.js";

document.addEventListener("DOMContentLoaded", async (event) => {

  const id = localStorage.getItem("DFTM_USER_ID");
  try {
    // const res = await fetch(`/users/${id}`, {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem(
    //       "DFTM_USER_TOKEN"
    //     )}`,
    //   }
    // });
    const res = await fetch(`/api/users/${id}`)
    if (!res.ok) {
      throw res;
    }

    const data = await res.json();

    const welcomeMessage = document.querySelector('.welcome-container');
    welcomeMessage.innerHTML = `Welcome ${data.name}`;

  } catch (error) {
    console.warn(error);
  }

  document.querySelector(".logout-btn").addEventListener("click", async () => {
    try {
      const res = await fetch("/api/users/token", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) {
        throw res;
      }
      localStorage.removeItem("DFTM_USER_TOKEN");
      localStorage.removeItem("DFTM_USER_ID");

      window.location.href = "/sign-in";
    } catch (error) {
      errorNotifications(error);
    }
  });
});
