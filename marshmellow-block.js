// "use strict";

const addCount = () => {
  count = document.getElementById("count");
  count.innerHTML = parseInt(count.innerHTML) + 1;
}

const deleteMarshmellow = (el) => {
  container = document.getElementById("mm-container");
  container.removeChild(container.childNodes[0]);
  addCount();
};

const spawnMarshmellow = () => {
  container = document.getElementById("mm-container");
  container.innerHTML += '<div class="mm"><img class="mm-img" src="/images/marshmellow.svg"></div>';

  document.getElementsByClassName("mm")[length].addEventListener('click', function (el) {
    deleteMarshmellow(el);
  })
}

setInterval(spawnMarshmellow, 15000);