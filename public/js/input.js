let static_db = []
var country = sessionStorage.getItem('Country')
let cities = []

$(document).ready(() => {
    //Load country selected & cities from database
    $('.country-name').text(country)
    $.get("/api/" + country, data => {
        // console.log(data)
        data.map(city => cities.push(city.city))
    })
    console.log(cities)
    $.get("/api/code/" + country, data => {
        console.log(data)
    })
    //Picture API to load banner
    // var Picurl = 'https://api.unsplash.com/search/photos?client_id=l_ucLpuaVqeosGc7xD0pKg6Ib61kn737l_M3-nkFmZY&query=' + country;
    // $.ajax({
    //     url: Picurl,
    //     method: "GET"
    // })
    //     .then(function (results) {
    //         var returned_array = results.results
    //         returned_array.map(images => {
    //             document.querySelector('.collage').innerHTML +=
    //                 `<img class="collage_photos" src="${images.urls.full}"></img>`
    //         })
    //     })
});

//Autocomplete function for cities of country
function autocomplete(inp, arr) {
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("city-search"), cities);
// })

//Loads new 'todos' on click from local array stored from API to prevent multiple calls
$('.refresh').click(() => {
    let i = 0
    console.log(static_db)
    document.querySelector('.things_to_do').innerHTML = ""
    while (i < 10) {
        document.querySelector('.things_to_do').innerHTML +=
            `<li class="todo">${static_db[0].features[Math.floor(Math.random() * static_db[0].features.length)].properties.name}</li>`
        i++
    }
})
//Event listener for typing of city
$(document).keypress(e => {
    let search_value = e.target.value
    String.prototype.toProperCase = () => {
        return this.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase)
    }
    //If typed input === city in database, then triggers event to pull API of things to do in city selected
    // if (cities.indexOf(search_value.toProperCase()) !== -1) {
    //     var settings = {
    //         "async": true,
    //         "crossDomain": true,
    //         "url": "https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname?name=" + search_value,
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": "opentripmap-places-v1.p.rapidapi.com",
    //             "x-rapidapi-key": "9d23a098c0mshffb86547dfcfa5ap17bf84jsn411163bf9f70"
    //         }
    //     }

    //     $.ajax(settings).done((response) => {
    //         console.log(response);
    //         var settings = {
    //             "async": true,
    //             "crossDomain": true,
    //             "url": "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=500&lat=" + response.lat + "&lon=" + response.lon,
    //             "method": "GET",
    //             "headers": {
    //                 "x-rapidapi-host": "opentripmap-places-v1.p.rapidapi.com",
    //                 "x-rapidapi-key": "9d23a098c0mshffb86547dfcfa5ap17bf84jsn411163bf9f70"
    //             }
    //         }

    //         $.ajax(settings).done(function (response) {
    //             console.log(response);
    //             let i = 0;
    //             document.querySelector('.things_to_do').innerHTML = ""
    //             while (i < 10) {
    //                 console.log(response)
    //                 document.querySelector('.things_to_do').innerHTML +=
    //                     `<li class="todo">${response.features[Math.floor(Math.random() * response.features.length)].properties.name}</li>`
    //                 i++
    //             }
    //             static_db.push(response)
    //         });
    //     });
    // };
})
//Same function as above but for clicking instead of typing value
$(document).click(e => {
    let selected_value = e.target.querySelector("input").value
    //     if (cities.includes(selected_value)) {
    //         var settings = {
    //             "async": true,
    //             "crossDomain": true,
    //             "url": "https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname?name=" + selected_value,
    //             "method": "GET",
    //             "headers": {
    //                 "x-rapidapi-host": "opentripmap-places-v1.p.rapidapi.com",
    //                 "x-rapidapi-key": "9d23a098c0mshffb86547dfcfa5ap17bf84jsn411163bf9f70"
    //             }
    //         }

    //         $.ajax(settings).done((response) => {
    //             console.log(response);
    //             var settings = {
    //                 "async": true,
    //                 "crossDomain": true,
    //                 "url": "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=500&lat=" + response.lat + "&lon=" + response.lon,
    //                 "method": "GET",
    //                 "headers": {
    //                     "x-rapidapi-host": "opentripmap-places-v1.p.rapidapi.com",
    //                     "x-rapidapi-key": "9d23a098c0mshffb86547dfcfa5ap17bf84jsn411163bf9f70"
    //                 }
    //             }

    //             $.ajax(settings).done(function (response) {
    //                 console.log(response);
    //                 let i = 0;
    //                 document.querySelector('.things_to_do').innerHTML = ""
    //                 while (i < 10) {
    //                     // console.log(response)
    //                     document.querySelector('.things_to_do').innerHTML +=
    //                         `<li class="todo">${response.features[Math.floor(Math.random() * response.features.length)].properties.name}</li>`
    //                     i++
    //                 }
    //                 static_db.push(response)
    //             });
    //         })
    //     }
    // })


})


var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "ajayakv-rest-countries-v1.p.rapidapi.com",
        "x-rapidapi-key": "9d23a098c0mshffb86547dfcfa5ap17bf84jsn411163bf9f70"
    }
}

var exchange_rates = []

fetch(`https://api.exchangerate-api.com/v4/latest/usd`)
    .then(res => res.json())
    .then(data => { exchange_rates.push(data.rates) })


$.ajax(settings).done(function (response) {


    var result = response.filter(obj => {
        return obj.name === country
    })
    console.log(result)
    result.map(item => {
        document.querySelector('.row').innerHTML =
            `
        <div class="col-4">
            <li class="origin-spelling">${item.nativeName}</li>
            <li class="capital" id="${item.name}-capital">Capital:  ${item.capital}</li>
            <li class ="region" id="${item.region}">Region:  ${item.region}</li>
        </div>
        <div class="col-4">
            <li class="population">Population   ${item.population}</li>
            <li class="sub-region" id="${item.subregion}">Subregion:   ${item.subregion}
            <li class="boarding-countries">${item.borders == [] || item.borders == null || item.borders == "" || item.borders == undefined ? "This country does not border any countries." : item.name + `  borders ` + item.borders.length + "  countries:  " + item.borders.map(bordering_country => "<li class='inline-block-text'>" +
                bordering_country) + "</li>"}</li>
        </div>
        <div class="col-4">
            <li class="currency">${(exchange_rates[0][item.currencies]).toFixed(3)}   ${item.currencies[0]} / 1 USD </li>
            <li class="time-zones">Timezone(s):   ${item.timezones.length > 1 ? item.timezones[0] + "  -  " + item.timezones[item.timezones.length - 1] : item.timezones[0]}</li>
            <li class="gini-index">Gini Index:   ${item.gini}</li>
        </div>
        `
    })
})



// })