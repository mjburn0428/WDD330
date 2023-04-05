document.querySelector("#registerForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const address = document.querySelector("#address").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ name, address, email, password }),
  };

  fetch("https://wdd330-backend.onrender.com/users", options)
    .then((response) => response.json())
    .then((response) => {
      if ("message" in response) {
        alert(response.message);
      }
    });
});
