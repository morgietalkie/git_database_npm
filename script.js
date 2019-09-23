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
      cars.forEach(addCarToTheDom);
    });
}

function addCarToTheDom(car) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  //   console.log(car._id);

  copy.querySelector("article.car").dataset.carid = car._id;
  copy.querySelector("h1").textContent = car.name;
  copy.querySelector("h2").textContent = car.type;
  copy.querySelector("p").textContent = car.horsepowers;
  copy.querySelector(".removeCar").value = car._id;
  copy.querySelector(".removeCar").addEventListener("click", () => {
    removeCar(car._id);
  });

  document.querySelector(".app").prepend(copy);
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
    .then(data => {
      //   window.location = "";
      console.log(data);
      addCarToTheDom(data);
    });
}

document.querySelector(".addCar").addEventListener("click", post);

function removeCar(id) {
  fetch(`https://myfirstdatabase-fe41.restdb.io/rest/cars/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887457fd86cb75861e25fb",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      // TODO: Delete from DOM.
      console.log(document.querySelector(`.car[data-carid="${id}"]`));
      document.querySelector(`.car[data-carid="${id}"]`).remove();
    });
}
