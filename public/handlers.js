let category = document.getElementsByClassName("category");
let categoryBtns = document.getElementById("categoryBtns");

let filteredArray = [];

function categorySorter() {
  for (let i = 0; i < category.length; i++) {
    let item = category[i].value;

    if (filteredArray.length == 0) {
      filteredArray.push(item);
    } else {
      let found = false;
      for (let j = 0; j < filteredArray.length; j++) {
        if (item == filteredArray[j]) {
          found = true;
          break;
        }
      }
      if (found == false) {
        filteredArray.push(item);
      }
    }
  }
}

categorySorter();

function renderCategories() {
  filteredArray.map(function(category) {
    let categoryList = `<form action='/posts/${category}' method="GET">
    <button type='submit'>${category}</button>

        </form>`;

    categoryBtns.innerHTML += categoryList;
  });
}

renderCategories();
