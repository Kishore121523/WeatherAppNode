const weatherForm = document.querySelector("form");
const searchField = document.querySelector("input");
const msg1 = document.querySelector("#message1");
const msg2 = document.querySelector("#message2");
const msg1Before = document.querySelector(".message1Before");
const msg2Before = document.querySelector(".message2Before");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchField.value;

  msg1.textContent = "Loading";
  msg2.textContent = "";
  msg1Before.textContent = "";
  msg2Before.textContent = "";

  fetch(`https://weathery-6zsb.onrender.com//weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msg1.textContent = data.error;
        } else {
          msg1Before.textContent = `Your location: ${data.address}`;
          msg1.textContent = data.location;
          msg2Before.textContent = `Weather Description: ${data.description}`;
          msg2.textContent = data.forecast;
        }
      });
    }
  );
});
