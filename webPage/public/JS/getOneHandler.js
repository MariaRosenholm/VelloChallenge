"use strict";

(function () {
  let resultArea;
  let inputField;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    resultArea = document.getElementById("resultArea");
    inputField = document.getElementById("number");
    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessageArea();
    resultArea.innerHTML = "";
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
        update(result);
      }
    } else {
      updateMessageArea("Not found");
    }
  }

  function update(obj) {
    resultArea.innerHTML = `
    <p><span class="legend">Number: </span> ${obj.id} </p>
    <p><span class="legend">Name: </span> ${obj.name} </p>
    <p><span class="legend">Age: </span> ${obj.age} </p>
    <p><span class="legend">Address: </span> ${obj.address} </p>
    <p><span class="legend">City: </span> ${obj.city} </p>`;
  }
})();
