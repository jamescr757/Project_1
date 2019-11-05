$(document).ready(function() {

    // global movie info variables
    var posterImg;
    var posterTitle;
    var posterRelease;
    var posterId;
    var cardDiv;

    // global time delay variable for new sidebar content 
    var timeDelay = 8 * 1000; 

    // global variables for js frame window
    var clickCounter = 0;
    var windowOpen = false;

    // global fullUrl variable for search api call
    var fullUrl;

    // global ajax objects for each category 
    var popularAjax = {
        url: "https://api.themoviedb.org/3/movie/popular?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1",
        method: "GET"
    }

    var topRatedAjax = {
        url: "https://api.themoviedb.org/3/movie/top_rated?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1",
        method: "GET"
    }

    var upcomingAjax = {
        url: "https://api.themoviedb.org/3/movie/upcoming?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1",
        method: "GET"
    }

    var nowPlayingAjax = {
        url: "https://api.themoviedb.org/3/movie/now_playing?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1",
        method: "GET"
    }

    // generic api call 
    function apiCall(ajaxObj, responseFunction, responseFxnInput1, responseFxnInput2, responseFxnInput3) {
        $.ajax(ajaxObj)
            .then(response => {
                // response function inputs are optional
                responseFunction(response, responseFxnInput1, responseFxnInput2, responseFxnInput3);
            })
    }

    // search movies api call 
    // render movie cards with release year
    function searchApiCards() {
        fullUrl = sessionStorage.getItem('searchApiUrl');

        $.ajax({
                url: fullUrl,
                method: "GET"
            })
            .then(response => {
                renderSearchCards(response);
            })
            .catch(() => {
                $('.card-deck.search-cards').append(`
            <h5 class='text-center text-primary'>No results. Go back or click 'Search' above to try again.</h5>
            `)
            });
    }

    function assignResponseData(response, index) {
        posterImg = response.results[index].poster_path;
        posterTitle = response.results[index].title;
        posterRelease = response.results[index].release_date;
        posterId = response.results[index].id;
        posterRating = response.results[index].vote_average;
    }

    function renderMovieCard(pageName, subInfo) {
        cardDiv = `
            <div>
                <div class="card m-3 imageLayout">
                    <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${posterImg}" 
                        class="card-img-top" 
                        alt="${posterTitle} image"
                        data-name= "${posterTitle}"
                        data-release="${posterRelease}"
                        data-id="${posterId}"
                        />
                    <div class="card-body">
                        <p class="card-text"><b>${posterTitle}</b></p>
                        <p class="card-text poster-release">${subInfo}</p>
                    </div>
                </div>
            </div>`;

        $(`.card-deck.${pageName}`).append(cardDiv);
        $(".card img").on("click", movieClick);
    }

    // passed test
    function renderReleaseDateCard(response, targetClassName, dateFormat) {
        for (var i = 0; i < 10; i++) {
            assignResponseData(response, i);
            // format release date based on page
            posterRelease = moment(posterRelease).format(dateFormat);

            renderMovieCard(targetClassName, posterRelease);
        }
    }

    // passed test
    function renderRatingCard(response, targetClassName) {
        for (var i = 0; i < 10; i++) {
            assignResponseData(response, i);

            renderMovieCard(targetClassName, `Rating: ${posterRating}`);
        }
    }

    // need to base for loop off number of results
    // max iterations 10
    // render error screen if user search gets no results
    function renderSearchCards(response) {
        console.log(response);

        if (response.results.length === 0) {
            var numberOfCards = 0;
            $('.card-deck.search-cards').append(`
            <h5 class='text-center text-primary'>No results. Go back or click 'Search' above to try again.</h5>
            `);
        }
        else if (response.results.length <= 10) {
            var numberOfCards = response.results.length;
        } else {
            var numberOfCards = 10;
        }

        for (var i = 0; i < numberOfCards; i++) {
            assignResponseData(response, i);

            // only render movie card if there is an image and a date
            if (posterImg && posterRelease) {
                // format release date for specific page
                posterRelease = moment(posterRelease).format('YYYY');
                renderMovieCard('search-cards', posterRelease);
            }
        }
    }

    // run ajax method if search button clicked on search form
    // grab and sanitize user inputs and add to base url 
    // save full url in session storage for search-cards.html file
    function searchClick() {
        // api host 
        var host = "https://api.themoviedb.org/3/search/"

        // movie query base parameters
        var movieStarterParams = "movie?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1&include_adult=false";

        var userSearch = $("#form-title").val().trim();
        var userYear = $('#form-year').val();

        var fullUrl = `${host}${movieStarterParams}&query=${userSearch}`;

        // user inputs a year, concat the value
        if (userYear) {
            fullUrl += `&year=${userYear}`;
        }

        // need to save url because new html page resets the DOM and loses user inputs
        sessionStorage.clear();
        sessionStorage.setItem('searchApiUrl', fullUrl);

        // blank out search inputs if user hits back button
        $("#form-title").val("");
        $('#form-year').val("");
    }

    // render sidebar content 
    // random number between 0-3 to pick one of the categories 
    // based on category, fire release date text or rating text functions
    function renderSidebarContent() {
        // ["Popular", "Top Rated", "Upcoming", "Now Playing"]
        var randomNumber = Math.floor(Math.random() * 4);

        switch (randomNumber) {
            // popular was picked
            case 0:
                apiCall(popularAjax, renderSidebarReleaseDateText, "Popular", "MMMM YYYY", 'popular.html');
                break;

            // top rated was picked
            case 1:
                apiCall(topRatedAjax, renderSidebarRatingText, "Top Rated", 'top-rated.html');
                break;

            // now playing was picked
            case 2:
                apiCall(nowPlayingAjax, renderSidebarRatingText, "Now Playing", 'now-playing.html');
                break;

            // upcoming was picked
            case 3:
                apiCall(upcomingAjax, renderSidebarReleaseDateText, "Upcoming", "MMMM Do", 'upcoming.html');
                break;

            default:
                break;
        }
    }

    // passed test
    function renderSidebarReleaseDateText(response, sidebarTitle, dateFormat, pageLink) {
        // blank out sidebar first and then append
        $(".sideList").empty();
        $('.sideList').append(`
            <a class="nav-link p-0 sidebar" href=${pageLink}>
                ${sidebarTitle}
            </a>
        `);

        for (var i = 0; i < 10; i++) {
            assignResponseData(response, i);
            posterRelease = moment(posterRelease).format(dateFormat);

            var cardDiv = `
                <li class="nav-item my-4">
                    <p class="card-text my-0">${i+1}. <b>${posterTitle}</b></p>
                    <p class="card-text my-0 poster-release">${posterRelease}</p>
                </li>`;

            $(".sideList").append(cardDiv);
        }
    }

    // passed test
    function renderSidebarRatingText(response, sidebarTitle, pageLink) {
        // blank out sidebar first and then append title and text
        $(".sideList").empty();
        $('.sideList').append(`
            <a class="nav-link p-0 sidebar" href=${pageLink}>
                ${sidebarTitle}
            </a>
        `);

        for (var i = 0; i < 10; i++) {
            assignResponseData(response, i);

            var cardDiv = `
                <li class="nav-item my-4">
                    <p class="card-text my-0">${i+1}. <b>${posterTitle}</b></p>
                    <p class="card-text my-0 poster-release">Rating: ${posterRating}</p>
                </li>`;

            $(".sideList").append(cardDiv);
        }
    }

    function renderCarousel(response) {

        for (var i = 0; i < 10; i++) {
            posterImg = response.results[i].poster_path;
            // posterRelease = response.results[i].release_date;
            // posterRelease = moment(posterRelease).format('MMMM Do');

            $('.carousel-indicators').append(`
                <li data-target="#carouselCaptions" data-slide-to="${i}"></li>
                `);

            $('.carousel-inner').append(`
                    <div class="carousel-item">
                        <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${posterImg}" class="d-block w-100" alt="...">
                    </div>
                `)

            // if want a carousel caption
            // <div class="carousel-caption d-xl-block d-none">
            // <p>${posterRelease}</p>
            // </div>

            if (i === 0) {
                $('.carousel-indicators li').addClass('active');
                $('.carousel-item').addClass('active');
            }
        }
    }

    // render still image of poster on home page 
    // generate random number between 0-19
    // use random number to select element from response.results array 
    // append image to home page side column
    function renderHomeImage(response, side) {
        var randomNumber = Math.floor(Math.random() * 20);

        posterImg = response.results[randomNumber].poster_path;
        posterTitle = response.results[randomNumber].title;
        $(`#home-${side}-col`).append(`
            <img 
                src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${posterImg}"
                alt="${posterTitle} poster" 
            />
        `);
    }

    function movieClick(response) {
        var clickInfo = $(this);
        // viewport width and height in px
        var viewportWidth = $(window).width();
        var viewportHeight = $(window).height();
        // margins as a percent a window dimension
        var xMargin = viewportWidth * 11 / 100;
        var yMargin = viewportHeight * 9 / 100;
        // subtract margins to set jsFrame dimensions
        var frameWidth = viewportWidth - xMargin * 2;
        var frameHeight = viewportHeight - yMargin * 2;


        if (clickCounter % 10 === 0) {

            if (!windowOpen) {

                const jSFrame = new JSFrame();
                //Style from preset
                const frame01 = jSFrame.create({
                    title: clickInfo.attr("data-name"),
                    left: xMargin,
                    top: yMargin,
                    width: frameWidth,
                    height: frameHeight,
                    appearanceName: 'material',
                    appearanceParam: {
                        border: {
                            shadow: '2px 2px 10px  rgba(0, 0, 0, 0.5)',
                            width: 0,
                            radius: 6,
                        },
                        titleBar: {
                            color: 'white',
                            background: 'rgba(0,0,0,0.8)',
                            leftMargin: 40,
                            height: 30,
                            fontSize: 20,
                            buttonWidth: 60,
                            buttonHeight: 30,
                            buttonColor: 'white',
                            buttons: [{
                                fa: 'fas fa-times',
                                name: 'closeButton',
                                visible: true
                            }, ],
                        }
                    },

                    style: {
                        backgroundColor: 'rgba(220,220,220,0.8)',
                        overflow: 'hidden',
                        width: '100%',
                    },
                    html: `
                        <ul class="nav nav-pills" style="background-color: rgba(0,0,0,.7)" >
                        <li class="nav-item movieButton">
                        <a class="nav-link" id="infoModule">Info</a>
                        </li>
                        <li class="nav-item movieButton">
                        <a class="nav-link" id="trailerModule">Trailer</a>
                        </li>
                        </ul>
                        
                        <div class="container movieInfo">
                        <div class="row">
                        <div class="col" id="movieContent">                       
                        </div>
                        </div>
                        </div>`,
                }).show();
                loadInfo(clickInfo);
                youtubeApi(clickInfo);

                $("#infoModule").on("click", function() {
                    $("#movieContent").html("");
                    loadInfo(clickInfo);
                });
                windowOpen = true

                window.onclick = function(event) {
                    if (event.path[0].className === "jsframe-modal-window-background") {
                        frame01.closeFrame();
                    }
                }
                frame01.showModal(_frame => {
                    //Callback when modal window is closed.
                    windowOpen = false;
                });
            }
        }
        clickCounter++;
    }


    function loadInfo(arg) {
        $("#movieContent").html("");
        var srcImg = arg;
        var movieId = arg.attr("data-id");
        $.ajax({
            url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&`,
            method: "GET"
        }).then(function(response) {
            var posterImg = response.poster_path;
            var createMovieImg = $("<img>").attr("src", "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + posterImg)
            createMovieImg.addClass("moviePoster")
            var createMovieDiv = $("<div>");
            createMovieDiv.addClass("movieData");
            var concatGenre;
            concatGenre = "";

            function genreGen() {
                for (var i = 0; i < response.genres.length; i++) {
                    concatGenre += response.genres[i].name + " ";
                }
            }
            genreGen()
            var budget = (response.budget).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

            createMovieDiv.html(
                `<p class="movieHeaders">Movie Title:<span class="movieWindowInfo"> ${response.title}</span></p>
                 <p class="movieHeaders">Release Date:<span class="movieWindowInfo"> ${response.release_date}</span></p>
                 <p class="movieHeaders">Rating:<span class="movieWindowInfo"> ${response.vote_average}</span></p>
                 <p class="movieHeaders">Genre:<span class="movieWindowInfo"> ${concatGenre} </span></p>
                 <p class="movieHeaders">Status:<span class="movieWindowInfo"> ${response.status}</span></p>
                 <p class="movieHeaders">Runtime:<span class="movieWindowInfo"> ${response.runtime} mins</span></p>
                 <p class="movieHeaders">Popularity:<span class="movieWindowInfo"> ${response.popularity}</span></p>
                 <hr>
                 <p class="movieHeaders">Overview:<span class="movieWindowInfo" > ${response.overview}</span></p>`)
            $("#movieContent").append(createMovieImg, createMovieDiv);



        });
    }

    function youtubeApi(clickInfo) {
        console.log(clickInfo);
        arg2 = clickInfo.attr("data-name") + "+trailer"
        search = arg2.replace(/\s+/g, '+');

        // Youtube api here
        queryUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&key=AIzaSyCWbq6hcw0U9aqEm-mcqV1feqRnWwDJuJo&q="
        $.ajax({
            url: queryUrl + search,
            method: "GET"
        }).then(function(response) {

            var vidUrl = [];
            for (var i = 0; i < response.items.length; i++) {
                var videoLoc = response.items[i].id.videoId;
                vidUrl.push(videoLoc);
            };

            $("#trailerModule").on("click", function(event) {
                $("#movieContent").html("");
                vidUrl.forEach(function(url) {
                    $("#movieContent").append(
                        `<iframe class="trailerBox" width = "392"
                        height = "220.5"
                        src = "https://www.youtube.com/embed/${url}"
                        frameborder = "0"
                        allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen> </iframe>`
                    )
                })
            })
        });
    }


    // based on which page is active call the necessary api functions
    // if popular active, fire popular cards and sidebar content
    // if top rated active, fire top rated cards and sidebar content
    // if upcoming active, fire upcoming cards and sidebar content
    // if now playing active, fire now playing cards and sidebar content
    // if search active, fire search cards and sidebar content
    // default is home page, so fire now playing carousel and popular + top rated home images
    switch ($('.nav-link.active').text()) {
        case 'Popular(current)':
            apiCall(popularAjax, renderReleaseDateCard, 'popular', 'MMMM YYYY');
            renderSidebarContent();
            setInterval(renderSidebarContent, timeDelay);
            break;

        case 'Top Rated(current)':
            apiCall(topRatedAjax, renderRatingCard, 'top-rated');
            renderSidebarContent();
            setInterval(renderSidebarContent, timeDelay);
            break;

        case 'Upcoming(current)':
            apiCall(upcomingAjax, renderReleaseDateCard, 'upcoming', 'MMMM Do');
            renderSidebarContent();
            setInterval(renderSidebarContent, timeDelay);
            break;

        case 'Now Playing(current)':
            apiCall(nowPlayingAjax, renderRatingCard, 'now-playing');
            renderSidebarContent();
            setInterval(renderSidebarContent, timeDelay);
            break;

        case 'Search(current)':
            searchApiCards();
            renderSidebarContent();
            setInterval(renderSidebarContent, timeDelay);
            break;

        default:
            apiCall(nowPlayingAjax, renderCarousel);
            apiCall(popularAjax, renderHomeImage, 'left');
            apiCall(topRatedAjax, renderHomeImage, 'right');
            break;
    }

    // register click event for search button on search form
    $('#search-button').on('click', searchClick);

// Chat box code starts here

var firebaseConfig = {
    apiKey: "AIzaSyByy4qbn8q_ok3HqY9L9yQawaHfa9w-JUo",
    authDomain: "themoviesource-ec7f8.firebaseapp.com",
    databaseURL: "https://themoviesource-ec7f8.firebaseio.com",
    projectId: "themoviesource-ec7f8",
    storageBucket: "themoviesource-ec7f8.appspot.com",
    messagingSenderId: "404075692642",
    appId: "1:404075692642:web:3bac80c1fcde772b70c73b",
    measurementId: "G-J0187NSR5D"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var database = firebase.database();

  var myDataRef = new firebase.database().ref();
  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      myDataRef.push({name: name, text: text});
      $('#messageInput').val('');
    }       
  });

  myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
  });
  
  function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  };

  // Toggles the chat window
  var showChat = false;
  $( ".chat-launcher" ).click(function() {
        if (!showChat) {    
            $('#chat-container').show();
            showChat = true;
        }
        else {
            $('#chat-container').hide();
            showChat = false;
        }
    });

// Chatbox code ends here






});