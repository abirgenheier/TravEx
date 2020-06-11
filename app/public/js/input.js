let static_db = []
var country = sessionStorage.getItem('Country')
let picture_array = []
let city = []
let meta_data = []
let row = document.querySelectorAll(".rows-input");

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
                let i = 0;
                let new_response = response.features
                meta_data.push(new_response)
                var filtered_response = new_response.filter(obj => {
                    return obj.properties.name !== ''
                })
                if (filtered_response.length > 2) {
                    document.querySelector('.container-grid').innerHTML = "";
                    while (i < filtered_response.length - 1) {
                        document.querySelector('.container-grid').innerHTML +=
                            `<div class="box">
                                <div class="post-module">
                                <div class="thumbnail">
                                    <div class="date">
                                        <div class="day">27</div>
                                        <div class="month">Mar</div>
                                    </div><img src="${picture_array[0][(i)].urls.full}" />
                                </div>
                                <div class="post-content">
                                    <div class="category" id="${(filtered_response[(i)].properties.name).replace(/\s+/g, '-').toLowerCase()}" onclick="myFunction()">Add</div>
                                    <h1 class="title">${filtered_response[(i)].properties.name}</h1>
                                    <h2 class="sub_title">${city},  ${country}</h2>
                                    <p class="description">New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>
                                    <div class="post-meta"><span class="timestamp"><i class="fa fa-clock-">o</i> 6 mins ago</span><span class="comments"><i class="fa fa-comments"></i><a href="#"> 39 comments</a></span></div>
                                </div>
                                </div>
                            </div>`
                        i++
                    }

                }
                else {
                    document.querySelector('.container-grid').innerHTML = "I'm sorry. We currently do not service this location at this time. Please search for another city."
                }
                static_db.push(response)
            });
        })
    }
})

function myFunction() {
    let tripData = {
        user: sessionStorage.getItem('User').replace(/\s+/g, '-').toLowerCase(),
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

        // setTimeout(() => {
        // }, 300);
    }, 1000);
    document.querySelector('.container-grid').innerHTML +=
        `<div class="box">
            <div class="post-module">
            <div class="thumbnail">
                <div class="date">
                    <div class="day">27</div>
                    <div class="month">Mar</div>
                </div><img src="${picture_array[0][(i)].urls.full}" />
            </div>
            <div class="post-content">
                <div class="category" id="${(meta_data[0][(i) + page_identifier].properties.name).replace(/\s+/g, '-').toLowerCase()}">Add</div>
                <h1 class="title">${meta_data[0][(i) + page_identifier].properties.name}</h1>
                <h2 class="sub_title">${city},  ${country}</h2>
                <p class="description">New York, the largest city in the U.S., is an architectural marvel with plenty of historic monuments, magnificent buildings and countless dazzling skyscrapers.</p>
                <div class="post-meta"><span class="timestamp"><i class="fa fa-clock-">o</i> 6 mins ago</span><span class="comments"><i class="fa fa-comments"></i><a href="#"> 39 comments</a></span></div>
            </div>
            </div>
        </div>`

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

// 
$(window).on('load', () => {
    $('.post-module').hover(function () {
        $(this).find('.description').stop().animate({
            height: "toggle",
            opacity: "toggle"
        }, 300);
    });
});
$(document).ready(() => {
    $.get('/api/all-info/' + sessionStorage.getItem('User').replace(/\s+/g, '-').toLowerCase(), data => {
        console.table(data)
        $('.number').text(data.length)
    })
})

$('.basket').mouseover(() => {
    $('.basket').addClass('hover-class')
    $('.number').addClass('hover-class')
})
$('.basket').mouseout(() => {
    $('.basket').removeClass('hover-class')
    $('.number').removeClass('hover-class')
})
