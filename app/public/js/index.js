var countrydb = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"]
$(window).scroll(function () {
    if ($(document).scrollTop() > 50) {
        $('.nav').addClass('affix');
    } else {
        $('.nav').removeClass('affix');
    }
});
$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    // $(this).addClass('active');

    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();
});
$('.autocomplete').click(function () {
    $(this).parent().toggleClass('open');
    // $(this).parent().addClass('open');
    $('.search-box').focus()
    $('.search-button').toggleClass('fifteenpix')
});


$(document).on('keypress', function (e) {
    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };

    var array = [];
    countrydb.forEach(country => {
        array.push(country.slice(0, -1));
    })
    let searched_value = e.target.value

    if (array.indexOf(searched_value.toProperCase()) !== -1) {
        var search_input = {
            // user: **passport.facebook.userinfo**
            country: $('.search-box').val()
        };
        $.post("/api/country", search_input).then(() => { console.log(search_input) })
        $('.earth').addClass('img-hover-zoom')
        setTimeout(() => { window.location.href = './input' }, 400)
    }
})

$(document).click(e => {
    let selected_value = e.target.querySelector("input").value
    if (countrydb.includes(selected_value)) {
        var search_input = {
            // user: **passport.facebook.userinfo**
            country: $('.search-box').val()
        };
        $.ajax("/api/country", {
            type: "POST",
            data: search_input
        }).then(() => { console.log(search_input) })
        // $.post("/api/country", search_input).then(() => { console.log(search_input) })
        $('.earth').addClass('img-hover-zoom')
        setTimeout(() => { window.location.href = './input' }, 400)
        sessionStorage.setItem('Country', $('.search-box').val())
    }
})

// $(".logo").mouseover(() => {
//     $('.express-logo').addClass('hide')
// })
// $(".logo").mouseout(() => {
//     $('.express-logo').removeClass('hide')
// })

$(".logo").mouseover(() => {
    $('.express-logo').css('display', 'inline-block')
    $('.express-logo').css('color', 'limegreen')
    // $(".express-logo").delay(50).fadeIn();
})
$(".logo").mouseout(() => {
    $('.express-logo').css('display', 'none')
    // $('.express-logo').hide()
})

$.get('/google-data', data => {
    console.log('google' + data)
    if (data) {
        sessionStorage.setItem('User', data.givenName)
        $('.profile-header').addClass('reveal')
        $('.profile-header').attr('src', data.photos[0].value);
        $('.login').replaceWith(` <li><a href="#footer">${data.name.givenName}'s Trips</a></li>`)
    }
})
$.get('/github-data', data => {
    console.log('github' + data)
    if (data) {
        sessionStorage.setItem('User', data.displayName)
        console.log(data)
        $('.profile-header').addClass('reveal')
        $('.profile-header').attr('src', data.photos[0].value);
        $('.login').replaceWith(` <li><a href="/trips">${data.displayName}'s Trips</a></li>`)
    }
})
// $.get('/facebook-data', data => {
//     console.log('facebook' + data)
//     if (data) {
//         sessionStorage.set('User', data.displayName)
//         console.log(data)
//         $('.profile-header').addClass('reveal')
//         $('.profile-header').attr('src', data.photos[0].value);
//         $('.login').replaceWith(` <li><a href="#footer">${data.displayName}'s Trips</a></li>`)
//     }
// })

$('.profile-header').click(() => {
    $('.logout-button').toggle('reveal')
})







