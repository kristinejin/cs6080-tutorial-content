const URL = "https://cgi.cse.unsw.edu.au/~cs6080/raw/data/package.json";
const BAD_URL = "https://cse.unsw.edu.au/~cs6080/raw/data/package.json";

const container = document.createElement("div");
container.setAttribute("id", "main");
container.innerHTML = "Loading, please wait";
document.body.appendChild(container);

fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    container.innerHTML = "";
    localStorage.setItem("cache", JSON.stringify(data));
    renderItems(data);
  })
  .catch((err) => {
    // display local storage data
    const data = localStorage.getItem("cache");
    const parsedData = JSON.parse(data);

    container.innerHTML = "";
    renderItems(parsedData);

    // display "This data is not live."
    const errMsgElem = document.createElement("p");
    errMsgElem.innerHTML = "This data is not live.";
    document.body.appendChild(errMsgElem);
  });

// helpers

const renderItems = (data) => {
  createItem("name", data.name);
  createItem("primary", data.primary);
  createItem("reindeers", data.reindeers);
};

const createItem = (category, value) => {
  const box = document.createElement("div");
  box.setAttribute("class", "box");

  const categoryElem = document.createElement("p");
  categoryElem.innerHTML = category;

  const valueElem = document.createElement("p");
  valueElem.innerHTML = value;

  box.appendChild(categoryElem);
  box.appendChild(valueElem);

  container.appendChild(box);
};
