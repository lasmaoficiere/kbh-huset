window.addEventListener("DOMContentLoaded", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");

    const id = urlParams.get("id");
    const category = urlParams.get("category");

    if (search) {
        getSearchData();
    } else if (id) {
        getSingleEvent();
    } else if (category) {
        //category stuff
        getCategoryData(category);
    } else {
        getEventPageData();
    }
    getNavigation()
}

function getNavigation() {
    fetch("https://camelsaidwhat.com/T9WP/wp-json/wp/v2/categories?per_page=50")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.forEach(addLink)
        })
}

function addLink(oneItem) {
    //console.log(oneItem.name)
    //document.querySelector("nav").innerHTML += oneItem.name
    if (oneItem.parent === 9 && oneItem.count > 0) {
        const link = document.createElement("a");
        link.textContent = oneItem.name;
        link.setAttribute("href", "events.html?category=" + oneItem.id);
        document.querySelector("nav").appendChild(link);
    }
}

function getSearchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");

    fetch("https://camelsaidwhat.com/T9WP/wp-json/wp/v2/huset-event?_embed&per_page=50&search=" + search)
        .then(res => res.json())
        .then(handleData)
}

function getEventPageData() {
    fetch("https://camelsaidwhat.com/T9WP/wp-json/wp/v2/huset-event?_embed&per_page=50")
        .then(res => res.json())
        .then(handleData)
}

function getCategoryData(catId) {
    console.log(catId);
    fetch("https://camelsaidwhat.com/T9WP/wp-json/wp/v2/huset-event?_embed&per_page=50&categories="+ catId)
        .then(res => res.json())
        .then(handleData)
}


function getSingleEvent() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    //console.log(id)


    fetch("https://camelsaidwhat.com/T9WP/wp-json/wp/v2/huset-event/" + id)
        .then(res => res.json())
        .then(showEvent)

    function showEvent(event) {
        console.log(event);
        document.querySelector("h1").textContent = event.title.rendered;
        document.querySelector("h2").textContent = event.event_date;
        document.querySelector("h3 span").textContent = event.location;
        document.querySelector("h4 span").textContent = event.price;
        document.querySelector("p").innerHTML = event.content.rendered;
    }
}


function handleData(myData) {
    //console.log(myData);
    myData.forEach(showPod)
}

function showPod(pod) {
    //console.log(pod);
    const template = document.querySelector(".eventsTemplate").content;
    const podCopy = template.cloneNode(true);

    const h1 = podCopy.querySelector("h1");
    h1.textContent = pod.title.rendered;

    const p = podCopy.querySelector("p");
    p.textContent = pod.short_description;

    const imgPath = pod._embedded['wp:featuredmedia']['0'].media_details.sizes.medium.source_url;
    //console.log(imgPath);
    const img = podCopy.querySelector("img.eventsImgs");
    img.setAttribute("src", imgPath)


    const a = podCopy.querySelector("a");
    a.href = "subpage.html?id=" + pod.id


    document.querySelector("#events").appendChild(podCopy)
}



//ABOUT SCROLL

jQuery(document).ready(function($) {
  function scrollToSection(event) {
    event.preventDefault();
    var $section = $($(this).attr('href')); 
    $('html, body').animate({
      scrollTop: $section.offset().top
    }, 500);
  }
  $('[data-scroll]').on('click', scrollToSection);
}(jQuery));