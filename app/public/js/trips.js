var hash = {};
var hash_city = {};
var hash_trip = {};
var hash_trip_one = {};

// console.log(data)
// 

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

$(document).ready(() => {
    $.get('/api/all-info/' + sessionStorage.getItem('User').replace(/\s+/g, '-').toLowerCase(), data => {
        console.log(data)
        var array = data;
        var singularCountries = data.map(function (obj) {
            return obj.country;
        }).filter(function (section) {
            if (!hash[section]) {
                hash[section] = true;
                return hash[section];
            }
            return false;
        });
        var singularCity = data.map(function (obj) {
            return obj.city;
        }).filter(function (section) {
            if (!hash_city[section]) {
                hash_city[section] = true;
                return hash_city[section];
            }
            return false;
        });
        singularCountries.map(item => {
            $.ajax({
                url: 'https://api.unsplash.com/search/photos?client_id=l_ucLpuaVqeosGc7xD0pKg6Ib61kn737l_M3-nkFmZY&query=' + item,
                method: "GET"
            }).then(function (results) {
                var returned_array = results.results;
                var big_picture_array = returned_array.filter(item => item.height > 4000)
                String.prototype.toProperCase = () => {
                    return this.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase)
                }
                console.log(array)

                document.querySelector('.container-grid').innerHTML +=
                    `
                        <div class="block">
                            <div class="card horizontal">
                            <div class="card-image">
                                <img src="${big_picture_array[0].urls.full}">
                            </div>
                            <div class="card-stacked">
                                <div class="card-content">
                                    <h2 class="country-heading">${toTitleCase(item)}</h2>
                                    <ul class="country-unordered-list" id="${toTitleCase(item)}">
                                    </ul>
                                    
                                </div>
                                <div class="card-action">
                                    <a href="#">This is a link</a>
                                </div>
                            
                            </div>
                        </div>
                 `
            })


        })
        console.log(toTitleCase(singularCountries[0]))
        console.log(document.querySelector(`#${toTitleCase(singularCountries[0])}`))
        $.get('/api/all-trips/' + sessionStorage.getItem('User').replace(/\s+/g, '-').toLowerCase() + '/' + singularCountries[0], data => {
            console.log(data)
            var singularTrip = data.map(function (obj) {
                return obj.place_one;
            }).filter(function (section) {
                if (!hash_trip[section]) {
                    hash_trip[section] = true;
                    return hash_trip[section];
                }
                return false;
            });
            console.log(singularTrip)
            let i = 0;
            while (i < data.length) {
                document.querySelector(`#${toTitleCase(singularCountries[0])}`).innerHTML +=
                    `
            <li class="country-list">${toTitleCase((singularTrip[i]).replace(/\-+/g, ' ').toLowerCase())}<button class="delete" id="${singularTrip[i]}" onClick="myFunction()">x</button></li>
            `
                i++
            }
        })
        $.get('/api/all-trips/' + sessionStorage.getItem('User').replace(/\s+/g, '-').toLowerCase() + '/' + singularCountries[1], data => {
            console.log(data)
            var singularTripOne = data.map(function (obj) {
                return obj.place_one;
            }).filter(function (section) {
                if (!hash_trip_one[section]) {
                    hash_trip_one[section] = true;
                    return hash_trip_one[section];
                }
                return false;
            });
            console.log(singularCountries)
            let i = 0;
            while (i < data.length) {
                document.querySelector(`#${toTitleCase(singularCountries[1])}`).innerHTML +=
                    `
            <li class="country-list">${toTitleCase((singularTripOne[i]).replace(/\-+/g, ' ').toLowerCase())}<button class="delete" id="${singularTripOne[i]}" onClick="myFunction()">x</button></li>
            `
                i++
            }

        })


    })
})


function myFunction() {
    var id = (event.target.id)
    $.ajax({
        method: "DELETE",
        url: "/api/delete_item/" + id,
        success: (result) => {
            console.log(result)
            location.reload(true)
        }
    })
}


    // })




