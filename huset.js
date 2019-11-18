window.addEventListener("DOMContentLoaded", getData);

function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");

    fetch("https://camelsaidwhat.com/T9WP/wp-json/wp/v2/huset-event?_embed&per_page=50&search="+search)
        .then(res => res.json())
        .then(handleData)
}

function handleData(myData) {
    //console.log(myData);
    myData.forEach(showPod)
}

function showPod(pod) {
    console.log(pod);
    const template = document.querySelector(".eventsTemplate").content;
    const podCopy = template.cloneNode(true);

    const h1 = podCopy.querySelector("h1");
    h1.textContent = pod.title.rendered;

    const p = podCopy.querySelector("p");
    p.textContent = pod.short_description;

    const imgPath = pod._embedded['wp:featuredmedia']['0'].media_details.sizes.medium.source_url;
    console.log(imgPath);
    const img = podCopy.querySelector("img.eventsImgs");
    img.setAttribute("src", imgPath)


    const a = podCopy.querySelector("a");
    a.href = "subpage.html?id=" + pod.id


    document.querySelector("#events").appendChild(podCopy)
}
