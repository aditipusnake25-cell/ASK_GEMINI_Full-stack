let body = document.body;
let form = document.getElementById("form");
let input = document.getElementById("question");
let error = document.getElementById("error");
let load = document.getElementById("loading");
let answer = document.getElementById("answer");
let submit = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let question = input.value.trim();
  error.textContent = "";
  answer.textContent = "";
  if (!question) {
    error.textContent = "Please Enter the Question first!!";
    return;
  }
  load.textContent = "Thinking...";
  submit.disabled = true;
  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Something went wrong!!");
    }
    answer.innerHTML = marked.parse(data.answer);
  } catch (err) {
    console.error(err);

    if (err.message === "Failed to fetch") {
      error.textContent =
        "Cannot connect to the server. Please make sure the backend is running.";
    } else {
      error.textContent =
        err.message || "Something went wrong. Please try again.";
    }
  } finally {
    load.textContent = "";
    submit.disabled = false;
  }
});
