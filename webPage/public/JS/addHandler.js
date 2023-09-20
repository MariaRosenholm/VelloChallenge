"use strict";

(function () {
  let nameField;
  let ageField;
  let addressField;
  let cityField;
  let messageArea;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    nameField = document.getElementById("name");
    ageField = document.getElementById("age");
    addressField = document.getElementById("address");
    cityField = document.getElementById("city");
    messageArea = document.getElementById("messageArea");

    document.getElementById("submit").addEventListener("click", send);
  }

  function updateMessageArea(obj) {
    console.log(typeof obj);
    if (!obj.name) {
      messageArea.innerHTML = `Error: ${obj}`;
    } else {
      messageArea.innerHTML = `
      <p><span class="legend">Number: </span> ${obj.id} </p>
      <p><span class="legend">Name: </span> ${obj.name} </p>
      <p><span class="legend">Age: </span> ${obj.age} </p>
      <p><span class="legend">Address: </span> ${obj.address} </p>
      <p><span class="legend">City: </span> ${obj.city} </p>`;
    }
  }

  async function send() {
    const obj = {
      name: nameField.value,
      age: ageField.value,
      address: addressField.value,
      city: cityField.value,
    };

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await fetch("/add", options);
      const resultJson = await data.json();
      if (resultJson) {
        updateMessageArea(resultJson);
      }
    } catch (err) {
      updateMessageArea(err.message);
    }
  }
})();
