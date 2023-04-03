// Your code here
const url = "http://localhost:3000/films";
const list = document.getElementById("films");
document.addEventListener("DOMContentLoaded", () => {
  document.getElementsByClassName("film item")[0].remove();
  Movies(url);
});

//fetch function
function Movies(url) {
  fetch(url)
    .then((response) => response.json())
    .then((movies) => {
      movies.forEach((movie) => {
        display(movie);
      });
    });
}

function display(movie) {
  const li = document.createElement("li");
  li.style.cursor = "pointer";
  li.textContent = movie.title.toUpperCase();
  list.appendChild(li);
  addClickEvent();
}
function addClickEvent() {
  let children = list.children;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
      child.addEventListener("click", () => {
      fetch(`${url}/${i + 1}`)
        .then((res) => res.json())
        .then((movie) => {
          document.getElementById("buy-ticket").textContent = "Buy Ticket";
          setUpMovieDetails(movie);
        });
    });
  }
}
function setUpMovieDetails(childMovie) {
  const preview = document.getElementById("poster");
  preview.src = childMovie.poster;

  const movieTitle = document.querySelector("#title");
  movieTitle.textContent = childMovie.title;
  const movieTime = document.querySelector("#runtime");
  movieTime.textContent = `${childMovie.runtime} minutes`;
  const movieDescription = document.querySelector("#film-info");
  movieDescription.textContent = childMovie.description;
  const showTime = document.querySelector("#showtime");
  showTime.textContent = childMovie.showtime;
  const tickets = document.querySelector("#ticket-num");
  tickets.textContent = childMovie.capacity - childMovie.tickets_sold;
}
const btn = document.getElementById("buy-ticket");

btn.addEventListener("click", function (e) {
  let ticketsRem = document.querySelector("#ticket-num").textContent;
  e.preventDefault();
  if (ticketsRem > 0) {
    document.querySelector("#ticket-num").textContent = ticketsRem - 1;
  } else if (parseInt(ticketsRem, 10) === 0) {
    btn.textContent = "Sold Out";
  }
});
