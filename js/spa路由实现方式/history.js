const routes = {
  "/": "home page",
  "/resume": "my resume",
  "/contact": "contact me",
};

const handleChange = (key) => {
  console.log(key);
  // go to url
  window.history.pushState(null, routes[key], key);
  // new data
  document.getElementById("app").innerHTML = `
  <h1>${routes[key]}</h1>
`;
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav")) {
    e.preventDefault();
    handleChange(e.target.dataset.route);
  }
});

window.onpopstate = () => {
  handleChange(window.location.pathname);
};
