"use strict";

(function () {
  let inputField;
  let numberField;
  let nameField;
  let ageField;
  let addressField;
  let cityField;
  let id;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    numberField = document.getElementById("number");
    nameField = document.getElementById("name");
    ageField = document.getElementById("age");
    addressField = document.getElementById("address");
    cityField = document.getElementById("city");

    inputField = document.getElementById("searchNumber");
    document.getElementById("submit").addEventListener("click", send);
    document.getElementById("update").addEventListener("click", update);
  }

  async function send() {
    clearMessageArea();
    const number = inputField.value;

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ number }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await fetch("/getOne", options);
      const resultJson = await data.json();
      updatePage(resultJson);
    } catch (err) {
      updateMessageArea(err.message);
    }
  }

  function updatePage(result) {
    if (result) {
      if (result.message) {
        updateMessageArea(result.message, result.type);
      } else {
        updateFields(result);
      }
    } else {
      updateMessageArea("Not found");
    }
  }

  function updateFields(obj) {
    id = obj.id;
    numberField.innerHTML = `${id}`;
    nameField.value = obj.name;
    ageField.value = obj.age;
    addressField.value = obj.address;
    cityField.value = obj.city;
  }

  async function update() {
    const obj = {
      number: id,
      name: nameField.value,
      age: ageField.value,
      address: addressField.value,
      city: cityField.value,
    };

    try {
      const options = {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await fetch("/update", options);
      const resultJson = await data.json();
      if (resultJson) {
        if (resultJson === true) {
          updateMessageArea("Update succesfull");
        } else {
          updateMessageArea("Error while updating");
        }
      }
    } catch (err) {
      updateMessageArea(err.message);
    }
  }
})();
