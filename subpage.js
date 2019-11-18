const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id)


fetch("https://camelsaidwhat.com/T9WP/wp-json/wp/v2/huset-event/" + id)
    .then(res => res.json())
    .then(showEvent)

function showEvent(event) {
    console.log(event);
    document.querySelector("h1").textContent = event.title.rendered;
    document.querySelector("h2").textContent = event.event_date;
    document.querySelector("h3").textContent = event.location;
    document.querySelector("h4").textContent = event.price;
    document.querySelector("p").textContent = event.content.rendered;
    }

