const container = document.querySelector(".grid-3-cols");
const gridItems = document.querySelectorAll(".grid-item");
const btn = document.querySelector(".btn");
const over = document.querySelector(".over");
const input = document.querySelectorAll(".input");
const firstSec = document.querySelector(".first-sec");

const prev = 0;
const dArray = [];
let current = "X";
let set = false;

input.forEach((inp) => {
  inp.addEventListener("click", function (e) {
    console.log(e.target.value);
    current = e.target.value;
    firstSec.classList.add("hidden");
  });
});
function swap(current) {
  if (current === "O") current = "X";
  else if ((current = "X")) {
    current = "O";
  }
  return current;
}
function columnWise(current) {
  const str = "grid-item-";
  const number = Number(current.dataset.num);
  const prevNum = (number + 6) % 9 === 0 ? 9 : (number + 6) % 9;
  const nextNum = (number + 3) % 9 === 0 ? 9 : (number + 3) % 9;
  const prev = document.querySelector(`.${str + prevNum}`);
  const next = document.querySelector(`.${str + nextNum}`);
  if (
    current.textContent === prev.textContent &&
    current.textContent === next.textContent
  ) {
    return true;
  }
  return false;
}

function rowWise(current) {
  const str = "grid-item-";
  const number = Number(current.dataset.num);

  let prefix = 0;
  if (number > 3) prefix = number <= 6 ? 3 : 6;

  const prevNum = ((number % 3) + 1) % 3 === 0 ? 3 : ((number % 3) + 1) % 3;
  const nextNum = ((number % 3) + 2) % 3 === 0 ? 3 : ((number % 3) + 2) % 3;
  const prev = document.querySelector(`.${str + (prevNum + prefix)}`);
  const next = document.querySelector(`.${str + (nextNum + prefix)}`);
  if (
    current.textContent === prev.textContent &&
    current.textContent === next.textContent
  ) {
    return true;
  }
  return false;
}
function acrossRight(current) {
  const str = "grid-item-";
  let number = Number(current.dataset.num);
  let prevNum = 0;
  let nextNum = 0;
  if (number === 1 || number === 5 || number === 9) {
    number = 5;
    prevNum = 1;
    nextNum = 9;
  }
  const curr = document.querySelector(`.${str + number}`);
  const prev = document.querySelector(`.${str + prevNum}`);
  const next = document.querySelector(`.${str + nextNum}`);

  if (
    curr?.textContent === next?.textContent &&
    curr?.textContent === prev?.textContent
  ) {
    return true;
  }

  return false;
}
function acrossLeft(current) {
  const str = "grid-item-";
  let number = Number(current.dataset.num);
  let prevNum = 0;
  let nextNum = 0;
  if (number === 3 || number === 5 || number === 7) {
    number = 5;
    prevNum = 3;
    nextNum = 7;
  }
  const curr = document.querySelector(`.${str + number}`);
  const prev = document.querySelector(`.${str + prevNum}`);
  const next = document.querySelector(`.${str + nextNum}`);

  if (
    curr?.textContent === next?.textContent &&
    curr?.textContent === prev?.textContent
  ) {
    return true;
  }

  return false;
}

function checkForTie() {
  const gridarray = [];
  let right = true;
  gridItems.forEach((grid) => {
    gridarray.push(grid);
  });
  for (let i = 0; i < gridarray.length; i++) {
    if (gridarray[i].textContent === "") {
      right = false;
      break;
    }
  }
  return right;
}
function removeListener(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].classList.add("takeToback");
    console.log("feda");
  }
  arr[arr.length - 1]?.classList.remove("takeToback");
}
function clearArray(arr) {
  arr.splice(0, arr.length);
}

function setValue(grid) {
  if (grid.textContent !== "") {
    grid.textContent = "";
    set = !set;
    dArray.pop();
  } else if (!set) {
    dArray.push(grid);
    firstSec.classList.add("hidden");
    current = swap(current);
    grid.textContent = current;
    if (
      rowWise(grid) ||
      columnWise(grid) ||
      acrossRight(grid) ||
      acrossLeft(grid)
    ) {
      over.textContent = `${current} WON`;
      container.classList.remove("shadow");
      over.classList.remove("hidden");
      container.classList.add("takeToback");
      btn.textContent = "Restart";
      clearArray(dArray);
    }
    if (
      (!rowWise(grid) ||
        !columnWise(grid) ||
        !acrossRight(grid) ||
        !acrossLeft(grid)) &&
      checkForTie()
    ) {
      over.textContent = "IT-IS-TIE";
      container.classList.remove("shadow");
      over.classList.remove("hidden");
      container.classList.add("takeToback");
      btn.textContent = "Restart";
      clearArray(dArray);
    }
  } else {
    grid.textContent = current;
    set = !set;
    dArray.push(grid);
  }
  removeListener(dArray);
}

gridItems.forEach((grid) =>
  grid.addEventListener("click", () => setValue(grid))
);
container.classList.add("takeToback");

btn.addEventListener("click", function () {
  clearArray(dArray);
  gridItems.forEach((grid) => {
    grid.textContent = "";
    grid.classList.remove("takeToback");
  });
  container.classList.add("shadow");
  if (container.classList.contains("takeToback")) {
    over.classList.add("hidden");
    container.classList.remove("takeToback");
  }
});
