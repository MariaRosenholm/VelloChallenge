"use strict";

function updateMessageArea(message) {
  const messageArea = document.getElementById("messageArea");
  messageArea.textContent = message;
}

function clearMessageArea() {
  const messageArea = document.getElementById("messageArea");
  messageArea.textContent = "";
}
