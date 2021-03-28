import { errorNotifications } from "./error-notifications.js";

document.addEventListener("DOMContentLoaded", async (event) => {
  try {
    const res = await fetch("https://type.fit/api/quotes")
    if (!res.ok) {
      throw res
    }
    const quotesArray = await res.json();
    const randomNumber = Math.floor(Math.random() * (quotesArray.length + 1))
    const randomQuote = quotesArray[randomNumber];
    const quoteText = randomQuote.text;
    const quoteAuthor = randomQuote.author;
    const quoteContainer = await document.querySelector(".left-panel__quote-text");
    const authorContainer = await document.querySelector(".left-panel__quoted-person");
    quoteContainer.innerHTML = `"${quoteText}"`;
    authorContainer.innerHTML = `-${quoteAuthor}`;
  } catch (error) {
    errorNotifications(error);
  }
  const siteTour = document.querySelector(".registration-form__demo-button");
  siteTour.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = "demo@dftm.com";
    const password = "demo123";
    const demoBody = { email, password };
    try {
      const res = await fetch("/api/users/token", {
        method: "POST",
        body: JSON.stringify(demoBody),
        headers: { "Content-Type": "application/json" }
      });
      console.log(res);
      if (!res.ok) {
        throw res;
      }
      const { token, user: { id } } = await res.json();
      localStorage.setItem("DFTM_USER_TOKEN", token);
      localStorage.setItem("DFTM_USER_ID", id);
      window.location.href = "/";
    } catch (error) {
      errorNotifications(error);
    }
  });
  const signInForm = document.querySelector(".sign-in-form");
  signInForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(signInForm);
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { email, password };
    try {
      const res = await fetch ("/api/users/token", {
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
});
