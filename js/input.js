let static_db = []
$(document).ready(() => {
    // var pic_api_key = 'l_ucLpuaVqeosGc7xD0pKg6Ib61kn737l_M3-nkFmZY'
    // var Picurl = 'https://api.unsplash.com/search/photos?client_id=' + pic_api_key +
    //     '&query=' + "Russia";
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


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname?name=" + "Seattle",
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
                document.querySelector('.things_to_do').innerHTML +=
                    `<li class="todo"><a href="${response.features[Math.floor(Math.random() * response.features.length)].properties.wikidata}">${response.features[Math.floor(Math.random() * response.features.length)].properties.name}</li>`
                i++
            }
            static_db.push(response)
        });
    });
});

$('.refresh').click(() => {
    let i = 0
    console.log(static_db)
    document.querySelector('.things_to_do').innerHTML = ""
    while (i < 10) {
        document.querySelector('.things_to_do').innerHTML +=
            `<li class="todo"><a href="${static_db[0].features[Math.floor(Math.random() * static_db[0].features.length)].properties.wikidata}">${static_db[0].features[Math.floor(Math.random() * static_db[0].features.length)].properties.name}</li>`
        i++
    }
})

// $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=15&generator=search&origin=*&gsrsearch=" + "Q43306680", function (data) {
//     console.log(data)
// });
$.getJSON('https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q43306680&format=json&props=labels', function (data) {
    console.log(data)
});


// 'https://www.wikidata.org/w/api.php?action=wbgetentities&props=sitelinks/urls&ids=Q43306680&format=json'
// Q43306680