"use strict";

document.addEventListener("DOMContentLoaded", get);

function get() {
  fetch("https://myfirstdatabase-fe41.restdb.io/rest/cars", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887457fd86cb75861e25fb",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(cars => {
      cars.forEach(car => {
        const template = document.querySelector("template").content;
        const copy = template.cloneNode(true);
        copy.querySelector("h1").textContent = car.name;
        copy.querySelector("h2").textContent = car.type;
        copy.querySelector("p").textContent = car.horsepowers;
        document.querySelector(".app").appendChild(copy);
      });
    });
}

function post() {
  const data = {
    name: "Fiat",
    type: "Standard",
    horsepowers: 100
  };

  const postData = JSON.stringify(data);
  fetch("https://myfirstdatabase-fe41.restdb.io/rest/cars", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887457fd86cb75861e25fb",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => console.log(data));

  get();
}

// function delete(id) {
//     fetch("someurl/SOME_ID", {
//         method: "delete",
//         headers: {
//           'Content-Type': 'application/json; charset=utf-8',
//           'x-apikey': "your-cors-api-key",
//           "cache-control": "no-cache"
//         }
//     })
//       .then(res=>res.json())
//       .then(data=>console.log(data));
// }
