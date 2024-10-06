// include.js

function includeHTML() {
    let elements = document.querySelectorAll("[id$='-placeholder']");
    elements.forEach(el => {
      let file = el.id.split("-placeholder")[0] + ".html";
      fetch(file).then(response => {
        if (response.ok) return response.text();
        else return "Content not found.";
      }).then(data => {
        el.innerHTML = data;
      });
    });
  }
  includeHTML();
  