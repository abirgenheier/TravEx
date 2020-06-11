var hash = {};
var picture_array = []

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
        var singularCountries = data.map(function (obj) {
            return obj.country;
        }).filter(function (section) {
            if (!hash[section]) {
                hash[section] = true;
                return hash[section];
            }
            return false;
        });

        singularCountries.map(item => {
            $.ajax({
                url: 'https://api.unsplash.com/search/photos?client_id=l_ucLpuaVqeosGc7xD0pKg6Ib61kn737l_M3-nkFmZY&query=' + item,
                method: "GET"
            }).then(function (results) {
                var returned_array = results.results;
                String.prototype.toProperCase = () => {
                    return this.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase)
                }
                document.querySelector('.container-grid').innerHTML +=
                    `
                        <div class="block">
                            <div class="card horizontal">
                            <div class="card-image">
                                <img src="${returned_array[0].urls.full}">
                            </div>
                            <div class="card-stacked">
                                <div class="card-content">
                                    <h2 class="country-heading">${toTitleCase(item)}</h2>
                                    <p>I am a very simple card. I am good at containing small bits of information.</p>
                                </div>
                                <div class="card-action">
                                    <a href="#">This is a link</a>
                                </div>
                            
                            </div>
                        </div>
                `

            })

        })
    })

})

// $('.fa.fa-expand').on("click", function () {
//     $('.card').toggleClass("expand");
// })

// $('.fa.fa-heart').on("click", function () {
//     $(this).toggleClass("active");
// })




