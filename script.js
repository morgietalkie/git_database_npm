"use strict";

document.addEventListener("DOMContentLoaded", get);
const editForm = document.querySelector("#editform");
const form = document.querySelector("#addform");
// form.setAttribute("novalidate", true);

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

  copy.querySelector("article.car").dataset.carid = car._id;
  copy.querySelector("h1").textContent = car.name;
  copy.querySelector("h2").textContent = car.type;
  copy.querySelector("p").textContent = car.horsepowers;
  copy.querySelector(".removeCar").value = car._id;
  copy.querySelector(".removeCar").addEventListener("click", () => {
    removeCar(car._id);
  });
  copy.querySelector(".edit").addEventListener("click", () => {
    document.querySelector(".info_box").classList.remove("fade_in_out");

    document.querySelector("#editform").style.display = "flex";
    document.querySelector("#addform").style.display = "none";
    document.querySelector(".title").textContent = "EDIT A CAR";
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchAndPopulate(car._id);
  });

  document.querySelector(".app").prepend(copy);
  document.querySelector(".app").style.opacity = "1";
}

function post(name, type, horsepowers) {
  document.querySelector(".card").classList.add("fade_out");
  const data = {
    name: name,
    type: type,
    horsepowers: horsepowers
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
      addCarToTheDom(data);
    });
  document.querySelector(".card").addEventListener("animationend", resetCard);
}

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
      document.querySelector(`.car[data-carid="${id}"]`).remove();
    });
}

form.addEventListener("submit", grab);

editForm.addEventListener("submit", evt => {
  document.querySelector("#editform").style.display = "none";
  document.querySelector("#addform").style.display = "flex";
  document.querySelector(".title").textContent = "ADD A CAR";

  document.querySelector(".card h1").textContent = "Car name";
  document.querySelector(".card h2").textContent = "Car Type";
  document.querySelector(".card p").textContent = "123";

  evt.preventDefault();
  put();
});

function grab() {
  event.preventDefault();

  let name = form.elements.name.value;
  let type = form.elements.type.value;
  let horsepowers = form.elements.horsepowers.value;

  post(name, type, horsepowers);
}

form.addEventListener("input", e => {
  if (form.elements.name.value) {
    document.querySelector(".card h1").textContent = form.elements.name.value;
  }
  if (form.elements.type.value) {
    document.querySelector(".card h2").textContent = form.elements.type.value;
  }
  if (form.elements.horsepowers.value) {
    document.querySelector(".card p").textContent = form.elements.horsepowers.value;
  }
});

editForm.addEventListener("input", e => {
  if (editForm.elements.name.value) {
    document.querySelector(".card h1").textContent = editForm.elements.name.value;
  }
  if (editForm.elements.type.value) {
    document.querySelector(".card h2").textContent = editForm.elements.type.value;
  }
  if (editForm.elements.horsepowers.value) {
    document.querySelector(".card p").textContent = editForm.elements.horsepowers.value;
  }
});

function resetCard() {
  document.querySelector(".card h1").textContent = "Car name";
  document.querySelector(".card h2").textContent = "Car Type";
  document.querySelector(".card p").textContent = "123";
  document.querySelector(".card").classList.remove("fade_out");
  document.querySelector(".card").classList.add("fade_in");

  document.querySelector(".card h1").textContent = cars.name;
  document.querySelector(".card h2").textContent = cars.type;
  document.querySelector(".card p").textContent = cars.horsepowers;
}

// form.elements.name.addEventListener("blur", e => {
//   if (form.elements.name.checkValidity()) {
//   } else {
//     form.elements.classList.add("no");
//   }
// });

document.querySelector(".reset_card_info").addEventListener("click", resetCarInfo);

function resetCarInfo() {
  document.querySelector(".card h1").textContent = "Car name";
  document.querySelector(".card h2").textContent = "Car Type";
  document.querySelector(".card p").textContent = "123";
  form.elements.name.value = "";
  form.elements.type.value = "";
  form.elements.horsepowers.value = "";
  editForm.elements.name.value = "";
  editForm.elements.type.value = "";
  editForm.elements.horsepowers.value = "";
}

function fetchAndPopulate(id) {
  fetch(`https://myfirstdatabase-fe41.restdb.io/rest/cars/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887457fd86cb75861e25fb",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(cars => {
      editForm.elements.name.value = cars.name;
      editForm.elements.type.value = cars.type;
      editForm.elements.horsepowers.value = cars.horsepowers;
      editForm.elements.id.value = cars._id;

      document.querySelector(".card h1").textContent = cars.name;
      document.querySelector(".card h2").textContent = cars.type;
      document.querySelector(".card p").textContent = cars.horsepowers;
    });
}

function put() {
  let data = {
    name: editForm.elements.name.value,
    type: editForm.elements.type.value,
    horsepowers: editForm.elements.horsepowers.value
  };

  let postData = JSON.stringify(data);
  const superID = editForm.elements.id.value;

  // TODO: SCROLL TO SELECTED TARGET BASED ON ID.
  document.querySelector(`.car[data-carid="${superID}"]`).scrollIntoView({ block: "center", behavior: "smooth" });
  document.querySelector(`.car[data-carid="${superID}"]`).classList.add("car_updated");
  document.querySelector(".info_box").classList.add("fade_in_out");

  fetch(`https://myfirstdatabase-fe41.restdb.io/rest/cars/${superID}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887457fd86cb75861e25fb",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(d => d.json())
    .then(updatedCar => {
      //  Find parent
      const parentElement = document.querySelector(`.car[data-carid="${updatedCar._id}"]`);

      parentElement.querySelector("h1").textContent = updatedCar.name;
      parentElement.querySelector("h2").textContent = updatedCar.type;
      parentElement.querySelector("p").textContent = updatedCar.horsepowers;
    });
}
