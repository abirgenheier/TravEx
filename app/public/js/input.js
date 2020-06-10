let static_db = []
var country = sessionStorage.getItem('Country')
// let cities = []
let picture_array = []
let city = []
let meta_data = []

var Picurl = 'https://api.unsplash.com/search/photos?client_id=l_ucLpuaVqeosGc7xD0pKg6Ib61kn737l_M3-nkFmZY&query=' + country;
$.ajax({
    url: Picurl,
    method: "GET"
})
    .then(function (results) {
        var returned_array = results.results
        picture_array.push(returned_array)
    })

$(document).ready(() => {
    //Load country selected & cities from database
    $('.country-name').text(country)

    $.get("/api/code/" + country, data => {
        // console.log(data)
    }).then(() => {
        // var Picurl = 'https://api.unsplash.com/search/photos?client_id=l_ucLpuaVqeosGc7xD0pKg6Ib61kn737l_M3-nkFmZY&query=' + country;
        // $.ajax({
        //     url: Picurl,
        //     method: "GET"
        // })
        //     .then(function (results) {
        //         var returned_array = results.results
        //         picture_array.push(returned_array)
        //         returned_array.map(images => {
        //             document.querySelector('.collage').innerHTML +=
        //                 `<img class="collage_photos" src="${images.urls.full}"></img>`
        //         })
        //     })
    }).then(() => {
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

            // console.log(response)
            var result = response.filter(obj => {
                return obj.name === country
            })
            // console.log(result)
            result.map(item => {
                document.querySelector('.row').innerHTML =
                    `
                <div class="col-4">
                    <li class="origin-spelling list-group-item">${item.nativeName}</li>
                    <li class="capital list-group-item" id="${item.name}-capital">Capital:  ${item.capital}</li>
                    <li class ="region list-group-item" id="${item.region}">Region:  ${item.region}</li>
                </div>
                <div class="col-4">
                    <li class="population list-group-item">Population   ${item.population}</li>
                    <li class="sub-region list-group-item" id="${item.subregion}">Subregion:   ${item.subregion}
                    <li class="boarding-countries list-group-item">${item.borders == [] || item.borders == null || item.borders == "" || item.borders == undefined ? "This country does not border any countries." : item.name + `  borders ` + item.borders.length + "  countries:  " + item.borders.map(bordering_country => "<p class='inline-block-text'>" +
                        bordering_country) + "</p>"}</li>
                </div>
                <div class="col-4">
                    <li class="currency list-group-item">${exchange_rates[0][item.currencies] === null || exchange_rates[0][item.currencies] === undefined || item.currencies[0] === null || item.currencies[0] === undefined ? "This countries currency cannot be converted at this time" : (exchange_rates[0][item.currencies]).toFixed(3)}   ${item.currencies[0] + "  /  1 USD"}</li>
                    <li class="time-zones list-group-item">Timezone(s):   ${item.timezones.length > 1 ? item.timezones[0] + "  -  " + item.timezones[item.timezones.length - 1] : item.timezones[0]}</li>
                    <li class="gini-index list-group-item">Gini Index:   ${item.gini === null ? "This country does not register on the Gini Index" : item.gini}</li>
                </div>
                `
            })
        })
    })
})


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
    if (cities.indexOf(search_value.toProperCase()) !== -1) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname?name=" + search_value,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "opentripmap-places-v1.p.rapidapi.com",
                "x-rapidapi-key": "9d23a098c0mshffb86547dfcfa5ap17bf84jsn411163bf9f70"
            }
        }

        $.ajax(settings).done((response) => {
            console.log(response);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=500&lat=" + response.lat + "&lon=" + response.lon,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "opentripmap-places-v1.p.rapidapi.com",
                    "x-rapidapi-key": "9d23a098c0mshffb86547dfcfa5ap17bf84jsn411163bf9f70"
                }
            }

            $.ajax(settings).done(function (response) {
                console.log(response);
                let i = 0;
                document.querySelector('.things_to_do').innerHTML = ""
                while (i < 10) {
                    console.log(response)
                    document.querySelector('.things_to_do').innerHTML +=
                        `<li class="todo">${response.features[Math.floor(Math.random() * response.features.length)].properties.name}</li>`
                    i++
                }
                static_db.push(response)
            });
        });
    };
})
//Same function as above but for clicking instead of typing value
$(document).click(e => {
    let selected_value = e.target.querySelector("input").value;
    if (cities.includes(selected_value)) {
        city.push(selected_value)
        //Wikidata retrieve
        let j = 0;
        let destination_name = []
        let destination_description = []
        // while (j < destination_name.length) {
        //     $.ajax({
        //         url: "https://en.wikipedia.org/w/api.php",
        //         data: {
        //             format: "json",
        //             action: "parse",
        //             page: destination_name[j],
        //             prop: "text",
        //             section: 0,
        //         },
        //         dataType: 'jsonp',
        //         headers: {
        //             'Api-User-Agent': 'MyCoolTool/1.1 (http://example.com/MyCoolTool/; MyCoolTool@example.com) BasedOnSuperLib/1.4'
        //         }.then(response => {
        //             destination_description.push(response)
        //             console.log(response)
        //         })
        //     })
        //     j++
        // }

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname?name=" + selected_value,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "opentripmap-places-v1.p.rapidapi.com",
                "x-rapidapi-key": "9d23a098c0mshffb86547dfcfa5ap17bf84jsn411163bf9f70"
            }
        }

        $.ajax(settings).done((response) => {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=500&lat=" + response.lat + "&lon=" + response.lon,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "opentripmap-places-v1.p.rapidapi.com",
                    "x-rapidapi-key": "9d23a098c0mshffb86547dfcfa5ap17bf84jsn411163bf9f70"
                }
            }
            $.ajax(settings).done(function (response) {
                let i = 1;
                let j = 1;
                let new_response = response.features
                console.log(new_response)
                meta_data.push(new_response)
                console.log(meta_data)
                var filtered_response = new_response.filter(obj => {
                    return obj.properties.name !== ''
                })
                if (filtered_response.length <= 3) {
                    document.querySelector('.things_to_do').innerHTML = ""
                    while (i < filtered_response.length - 1) {
                        destination_name.push(filtered_response[i].properties.name)
                        // console.log(destination_description)
                        document.querySelector('.things_to_do').innerHTML +=
                            `<div class="card">
                                <div class="card-image">
                                    <img src="${picture_array[i]}">
                                    <span class="card-title">${filtered_response[i].properties.name}</span>
                                    <a class="btn-floating halfway-fab waves-effect waves-light red" onClick="myFunction()"><i class="material-icons" id="${(filtered_response[i].properties.name).replace(/\s+/g, '-').toLowerCase()}" >add</i></a>
                                </div>
                                <div class="card-content">
                                    <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                                </div>
                            </div>`
                        i++
                    }
                } else if (filtered_response.length > 4) {
                    let row = document.querySelectorAll(".rows-input");
                    for (let m = 1; m < 4; m++) {
                        for (let n = 1; n < 5; n++) {
                            console.log(row[m])
                            row[m].innerHTML +=
                                `<div class="col-3">
                                    <div
                                        <div class="card card-item">
                                            <div class="card-image">
                                                <img src="${picture_array[0][(m * n)].urls.full}">
                                                <span class="card-title">${filtered_response[(m * n)].properties.name}</span >
                                                <a class="btn-floating halfway-fab waves-effect waves-light red"   onClick="myFunction()"
                                                ><i class="material-icons" id="${(filtered_response[i].properties.name).replace(/\s+/g, '-').toLowerCase()}">add</i></a>
                                            </div >
                                            <div class="card-content">
                                                <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                                            </div>
                                        </div > 
                                    </div>
                                `
                        }
                    }
                }

                else {
                    document.querySelector('.things_to_do').innerHTML = "I'm sorry. We currently do not service this location at this time. Please search for another city."
                }
                static_db.push(response)
            });
        })
    }
})




function myFunction() {
    let tripData = {
        country: country.replace(/\s+/g, '-').toLowerCase(),
        city: city[0].replace(/\s+/g, '-').toLowerCase(),
        place_one: event.target.id
    }
    $.post("/api/trips", tripData)
}

function next_page(page_identifier) {
    const loading = document.querySelector('.loader');
    loading.classList.add('show');
    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            showPosts();
        }, 300);
    }, 1000);
    let row = document.querySelectorAll(".rows-input");
    for (let m = 1; m < 4; m++) {
        for (let n = 1; n < 5; n++) {
            console.log(row[m])
            row[m].innerHTML +=
                `<div class="col-3">
                    <div
                        <div class="card card-item">
                            <div class="card-image">
                                <img src="${picture_array[0][(m * n)].urls.full}">
                                <span class="card-title">${meta_data[0][(m * n) + page_identifier].properties.name}</span >
                                <a class="btn-floating halfway-fab waves-effect waves-light red"   onClick="myFunction()"
                                ><i class="material-icons" id="${(meta_data[0][(m * n) + page_identifier].properties.name).replace(/\s+/g, '-').toLowerCase()} ">add</i></a>
                            </div >
                            <div class="card-content">
                                <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                            </div>
                        </div > 
                    </div >
            `
        }
    }
}

window.addEventListener('scroll', () => {
    // console.log(picture_array)
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    let p = 0;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        p += 12
        next_page(p)
    }
});

