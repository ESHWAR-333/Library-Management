let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");
let heading = document.getElementById("popularHeading");

function appedToTheWeb(each) {
    spinner.classList.add("d-none");
    let divElement = document.createElement("div");
    divElement.classList.add("col-6", "mb-3");
    let image = document.createElement("img");
    image.src = each.imageLink;
    image.classList.add("image-style");
    let author1 = document.createElement("p");
    author1.textContent = each.author;
    author1.classList.add("para");
    divElement.appendChild(image);
    divElement.appendChild(author1);
    searchResults.appendChild(divElement);
}


searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinner.classList.remove("d-none");
        let searchEl = searchInput.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchEl;
        let option = {
            method: "GET"
        };
        fetch(url, option).then(function(event) {
                return event.json();
            })
            .then(function(jsondata) {
                if (jsondata.total === 0) {
                    heading.textContent = "No results found";
                    spinner.classList.add("d-none");
                    document.getElementById('searchResults').innerHTML = '';


                } else {
                    for (let each of jsondata.search_results) {
                        heading.textContent = "Popular Books";
                        appedToTheWeb(each);
                        console.log(each);
                    }
                }
            });
    } else {
        heading.textContent = "";
    }
});