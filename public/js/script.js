const weatherForm = document.querySelector('form')
const searchField = document.querySelector('input')
const msg1 = document.querySelector('#message1')
const msg2 = document.querySelector("#message2");

weatherForm.addEventListener('submit', (e) => {
   e.preventDefault();
  const location = searchField.value

  msg1.textContent = "Loading"
  msg2.textContent = ''

  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msg1.textContent = data.error
      } else {
        msg1.textContent = data.location
        msg2.textContent = data.forecast
      }
    });
  });
 
})