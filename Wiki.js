let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');
function createAndappendSearchResult(result) {
    //result container div
    let {
        title,
        link,
        description
    } = result;
    let resultitemEl = document.createElement('div');
    resultitemEl.classList.add('result-item');

    searchResultsEl.appendChild(resultitemEl);
    //anchor1
    let resultTitleEl = document.createElement('a');
    resultTitleEl.classList.add('result-Title');
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = '_blank';
    resultitemEl.appendChild(resultTitleEl);
    //title break
    let BreakEl = document.createElement('br');
    resultitemEl.appendChild(BreakEl);
    //anchor2 url result
    let urlEl = document.createElement('url');
    urlEl.classList.add('result-url');
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultitemEl.appendChild(urlEl);


    //line break
    let lineBreakEl = document.createElement('br');
    resultitemEl.appendChild(lineBreakEl);
    //paragraph
    let descriptionEl = document.createElement('p');
    descriptionEl.classList.add('line-description');
    descriptionEl.textContent = description;
    resultitemEl.appendChild(descriptionEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle('d-none');
    for (let result of searchResults) {
        //let result = searchResults[0];
        createAndappendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle('d-none');
        searchResultsEl.textContent="";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);