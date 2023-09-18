"use strict";

(function () {
  let numberField;
  let nameField;
  let ageField;
  let addressField;
  let cityField;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    numberField = document.getElementById("number");
    nameField = document.getElementById("name");
    ageField = document.getElementById("age");
    addressField = document.getElementById("address");
    cityField = document.getElementById("weight");

    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessageArea();
    const obj = {
      number: numberField.value,
      name: nameField.value,
      age: ageField.value,
      adderssField: addressField.value,
      cityField: cityField.value,
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
      if (resultJson.message) {
        updateMessageArea(resultJson.message, resultJson.type);
      }
    } catch (err) {
      updateMessageArea(err.message);
    }
  }
})();
