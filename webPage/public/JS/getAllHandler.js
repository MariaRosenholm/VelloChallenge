"use strict";

(function () {
  document.addEventListener("DOMContentLoaded", init);
  async function init() {
    try {
      const data = await fetch("/");
      const dataJSON = await data.json();
      const resultArea = document.getElementById("results");

      for (let obj of dataJSON) {
        const tr = document.createElement("tr");
        tr.appendChild(createCell(obj.number));
        tr.appendChild(createCell(obj.name));
        tr.appendChild(createCell(obj.age));
        tr.appendChild(createCell(obj.address));
        tr.appendChild(createCell(obj.city));
        resultArea.appendChild(tr);
      }
    } catch (err) {
      document.getElementById(
        "errorMessage"
      ).innerHTML = `<p class="error">${err.message}</p>`;
    }
  }
  function createCell(data) {
    const td = document.createElement("td");
    td.textContent = data;
    return td;
  }
})();
