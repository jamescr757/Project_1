$(document).ready(function() {

    // upcoming api call
    $.ajax({
        url: "https://api.themoviedb.org/3/movie/upcoming?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1",
        method: "GET"
    }).then(function(response) {
        renderUpcoming(response);
        renderUpcomingText(response);
        renderCarousel(response);
    });

    // popular api call
    $.ajax({
        url: "https://api.themoviedb.org/3/movie/popular?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1",
        method: "GET"
    }).then(function(response) {
        // renderUpcoming(response);
        // renderUpcomingText(response);
        // renderCarousel(response);
        renderPopular(response);
    });

    // top_rated api call
    $.ajax({
        url: "https://api.themoviedb.org/3/movie/top_rated?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1",
        method: "GET"
    }).then(function(response) {
        // renderUpcoming(response);
        // renderUpcomingText(response);
        // renderCarousel(response);
        renderTopRated(response);
    });

    function renderUpcoming(response) {
        for (var i = 0; i < 10; i++) {
            var posterImg = response.results[i].poster_path;
            var posterTitle = response.results[i].title;
            var posterRelease = response.results[i].release_date;
            var posterId = response.results[i].id;
            posterRelease = moment(posterRelease).format('MMMM Do');
            var cardNum = "cardNum" + i
            var cardDiv = `<div>
            <div class="card m-4 imageLayout">
            <img src="" class="card-img-top ${cardNum} " alt="">
            <div class="card-body">
              <p class="card-text"><b>${posterTitle}</b></p>
              <p class="card-text poster-release">${posterRelease}</p>
            </div>
          </div>
          </div>`;
            var contentCreation = $(".card-deck.upcoming").append(cardDiv);
            $(".cardNum" + i).attr("src", "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + posterImg);
            $(".cardNum" + i).attr("alt", posterTitle + " image");
            $(".cardNum" + i).attr("data-name", posterTitle);
            $(".cardNum" + i).attr("data-release", posterRelease);
            $(".cardNum" + i).attr("data-id", [posterId]);
            $(".card img").on("click", movieClick);
        }
    }

    function renderPopular(response) {
        for (var i = 0; i < 10; i++) {
            var posterImg = response.results[i].poster_path;
            var posterTitle = response.results[i].title;
            var posterRelease = response.results[i].release_date;
            posterRelease = moment(posterRelease).format('MMMM Do');
            var cardNum = "cardNum" + i
            var cardDiv = `<div>
            <div class="card m-4 imageLayout">
                <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${posterImg}" class="card-img-top ${cardNum}" alt="${posterTitle} image">
                <div class="card-body">
                    <p class="card-text"><b>${posterTitle}</b></p>
                    <p class="card-text poster-release">${posterRelease}</p>
                </div>
            </div>
          </div>`;
            var contentCreation = $(".card-deck.popular").append(cardDiv);
            $(".cardNum" + i).attr("src", "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + posterImg);
            $(".cardNum" + i).attr("alt", posterTitle + " image");
            $(".card img").on("click", movieClick);
        }
    }

    function renderTopRated(response) {
        for (var i = 0; i < 10; i++) {
            var posterImg = response.results[i].poster_path;
            var posterTitle = response.results[i].title;
            var posterRelease = response.results[i].release_date;
            posterRelease = moment(posterRelease).format('MMMM Do');
            var cardNum = "cardNum" + i
            var cardDiv = `<div>
            <div class="card m-4 imageLayout">
            <img src="" class="card-img-top ${cardNum} " alt="">
            <div class="card-body">
              <p class="card-text"><b>${posterTitle}</b></p>
              <p class="card-text poster-release">${posterRelease}</p>
            </div>
          </div>
          </div>`;
            var contentCreation = $(".card-deck.top-rated").append(cardDiv);
            $(".cardNum" + i).attr("src", "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + posterImg);
            $(".cardNum" + i).attr("alt", posterTitle + " image");
            $(".card img").on("click", movieClick);
        }
    }

    function renderSearchCards(response) {
        for (var i = 0; i < 10; i++) {
            var posterImg = response.results[i].poster_path;
            var posterTitle = response.results[i].title;
            var posterRelease = response.results[i].release_date;
            posterRelease = moment(posterRelease).format('MMMM Do');
            var cardNum = "cardNum" + i
            var cardDiv = `<div>
            <div class="card m-4 imageLayout">
            <img src="" class="card-img-top ${cardNum} " alt="">
            <div class="card-body">
              <p class="card-text"><b>${posterTitle}</b></p>
              <p class="card-text poster-release">${posterRelease}</p>
            </div>
          </div>
          </div>`;
            var contentCreation = $(".card-deck.search-cards").append(cardDiv);
            $(".cardNum" + i).attr("src", "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + posterImg);
            $(".cardNum" + i).attr("alt", posterTitle + " image");
            $(".cardNum" + i).attr("data-name", posterTitle);
            $(".cardNum" + i).attr("data-release", posterRelease);
            $(".cardNum" + i).attr("data-id", [posterId]);
            $(".card img").on("click", movieClick);
        }
    }

    function renderUpcomingText(response) {
        for (var i = 0; i < 10; i++) {
            var posterTitle = response.results[i].title;
            var posterRelease = response.results[i].release_date;
            posterRelease = moment(posterRelease).format('MMMM Do');
            var cardNum = "cardNum" + i
            var cardDiv = `<li class="nav-item my-4">
            <p class="card-text my-0">${i+1}. <b>${posterTitle}</b></p>
            <p class="card-text my-0 poster-release">${posterRelease}</p>
            </li>`;
            var contentCreation = $(".upcomingList").append(cardDiv);
        }
    }

    function renderCarousel(response) {

        for (var i = 0; i < 10; i++) {
            var posterImg = response.results[i].poster_path;
            var posterRelease = response.results[i].release_date;
            posterRelease = moment(posterRelease).format('MMMM Do');

            if (i === 0) {
                $('.carousel-indicators').append(`
                <li data-target="#carouselCaptions" data-slide-to="${i}" class="active"></li>
                `);

                $('.carousel-inner').append(`
                    <div class="carousel-item active">
                        <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${posterImg}" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-block">
                            <p>${posterRelease}</p>
                        </div>
                    </div>
                `)
            } else {
                $('.carousel-indicators').append(`
                <li data-target="#carouselCaptions" data-slide-to="${i}"></li>
                `);

                $('.carousel-inner').append(`
                    <div class="carousel-item">
                        <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${posterImg}" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-block">
                            <p>${posterRelease}</p>
                        </div>
                    </div>
                `)
            }
        }
    }

    var clickCounter = 0;
    var windowOpen = false;

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
                            background: '#4784d4',
                            leftMargin: 40,
                            height: 30,
                            fontSize: 14,
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
                        backgroundColor: 'rgba(220,220,220,0.6)',
                        overflow: 'hidden',
                        width: '100%',
                    },
                    html: `
                        <ul class="nav nav-pills" style="background-color: rgba(0,0,0,.7)" >
                        <li class="nav-item movieButton">
                        <a class="nav-link" id="infoModule" href="#">Info</a>
                        </li>
                        <li class="nav-item movieButton">
                        <a class="nav-link" id="trailerModule" href="#">Trailer</a>
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
                 <p class="movieHeaders">Genre:<span class="movieWindowInfo"> ${concatGenre} </span></p>
                 <p class="movieHeaders">Status:<span class="movieWindowInfo"> ${response.status}</span></p>
                 <p class="movieHeaders">Runtime:<span class="movieWindowInfo"> ${response.runtime} mins</span></p>
                 <p class="movieHeaders">Popularity:<span class="movieWindowInfo"> ${response.popularity}</span></p>
                 <hr>
                 <p class="movieHeaders">Overview:<span class="movieWindowInfo" > ${response.overview}</span></p>`)
            $("#movieContent").append(createMovieImg, createMovieDiv);

            $("#trailerModule").on("click", function(event) {
                arg = srcImg.attr("data-name") + "+trailer"
                search = arg.replace(/\s+/g, '+');

                // Youtube api here
                var key = "AIzaSyCWbq6hcw0U9aqEm-mcqV1feqRnWwDJuJo";
                queryUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&key=AIzaSyCWbq6hcw0U9aqEm-mcqV1feqRnWwDJuJo&q="
                $.ajax({
                    url: queryUrl + search,
                    method: "GET"
                }).then(function(response) {
                    console.log(response);
                    $("#movieContent").html("");
                    for (var i = 0; i < response.items.length; i++) {
                        var videoLoc = response.items[i].id.videoId;
                        var videoUrl = "";
                        $("#movieContent").append(
                            `<iframe class="trailerBox" width = "392"
                        height = "220.5"
                        src = "https://www.youtube.com/embed/${videoLoc}"
                        frameborder = "0"
                        allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen> </iframe>`
                        )

                    };

                })
            });
        });
    }








});