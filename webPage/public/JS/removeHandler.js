"use strict";

(function () {
  let inputField;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    inputField = document.getElementById("number");
    document.getElementById("submit").addEventListener("click", send);
  }

  async function send() {
    clearMessageArea();
    const number = inputField.value;
    try {
      const options = {
        method: "DELETE",
        body: JSON.stringify({ number }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await fetch("/remove", options);
      const result = await data.json();

      if (result) {
        if (result === true) {
          updateMessageArea("Succesfull deletion!");
        } else {
          updateMessageArea("Error! Document not deleted!");
        }
      }
    } catch (err) {
      updateMessageArea(err.message);
    }
  }
})();
