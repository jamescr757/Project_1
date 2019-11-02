$(document).ready(function() {
    
    // global movie info variables
    var posterImg;
    var posterTitle; 
    var posterRelease; 
    var posterId;
    var cardDiv;

    // global variables for js frame window
    var clickCounter = 0;
    var windowOpen = false;

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
        renderPopular(response);
    });

    // top_rated api call
    $.ajax({
        url: "https://api.themoviedb.org/3/movie/top_rated?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1",
        method: "GET"
    }).then(function(response) {
        renderTopRated(response);
    });

    // search movies api call 
    // $.ajax({
    //     url: "https://api.themoviedb.org/3/search/movie?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1&include_adult=false",
    //     method: "GET"
    // }).then(response => {
    //     console.log(response);
    // })

    // // search tv shows api call 
    // $.ajax({
    //     url: "https://api.themoviedb.org/3/search/tv?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1",
    //     method: "GET"
    // }).then(response => {
    //     console.log(response);
    // })

    function assignResponseData(response, index) {
        posterImg = response.results[index].poster_path;
        posterTitle = response.results[index].title;
        posterRelease = response.results[index].release_date;
        posterId = response.results[index].id;
    }

    function renderMovieCard(pageName) {
        cardDiv = `
            <div>
                <div class="card m-3 imageLayout">
                    <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${posterImg}" 
                        class="card-img-top" 
                        alt="${posterTitle} image"
                        data-name=${posterTitle}
                        data-release=${posterRelease}
                        data-id=${posterId}
                        />
                    <div class="card-body">
                        <p class="card-text"><b>${posterTitle}</b></p>
                        <p class="card-text poster-release">${posterRelease}</p>
                    </div>
                </div>
            </div>`;

        $(`.card-deck.${pageName}`).append(cardDiv);

        $(".card img").on("click", movieClick);
    }

    function renderUpcoming(response) {
        for (var i = 0; i < 10; i++) {
            assignResponseData(response, i);
            // format release date based on page
            posterRelease = moment(posterRelease).format('MMMM Do');

            renderMovieCard('upcoming');
        }
    }

    function renderPopular(response) {
        for (var i = 0; i < 10; i++) {
            assignResponseData(response, i);
            // format release date based on page
            posterRelease = moment(posterRelease).format('MMMM YYYY');
            
            renderMovieCard('popular');
        }
    }

    function renderTopRated(response) {
        for (var i = 0; i < 10; i++) {
            assignResponseData(response, i);
            // format release date for specific page
            posterRelease = moment(posterRelease).format('YYYY');

            renderMovieCard('top-rated');
        }
    }

    // need to base for loop off number of results
    // max iterations 10
    // render error screen if user search gets no results
    function renderSearchCards(response) {
        
        if (response.results.length <= 10) {
            var numberOfCards = response.results.length;
        } else {
            var numberOfCards = 10;
        }

        for (var i = 0; i < numberOfCards; i++) {
            assignResponseData(response, i);
            // format release date for specific page
            posterRelease = moment(posterRelease).format('YYYY');

            // only render movie card if there is an image
            if (posterImg) {
                renderMovieCard('search-cards');
            }
        }
    }

    // run ajax method if search button clicked on search form
    // grab and sanitize user inputs and add to base url 
    // render search card deck based on length of results array (max 10 cards)
    function searchClick() {
        console.log('search click active');
        
        // api host and set fullUrl var
        var host = "https://api.themoviedb.org/3/search/"
        var fullUrl;
        
        // movie and tv query base parameters
        var movieStarterParams = "movie?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1&include_adult=false";
        var tvStarterParams = "tv?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1";

        var userSearch = $("#form-title").val().trim();
        var userType = $('#form-type').val();
        var userYear = $('#form-year').val();

        if (userType === "Movie") {
            fullUrl = `${host}${movieStarterParams}&query=${userSearch}`;
        } else {
            fullUrl = `${host}${tvStarterParams}&query=${userSearch}`;
        }
        
        // different year parameter names for tv shows and movies
        if (userYear && userType === "Movie") {
            fullUrl += `&year=${userYear}`;
        } else if (userYear && userType === "TV Show") {
            fullUrl += `&first_air_date_year=${userYear}`;
        }

        $.ajax({
            url: fullUrl,
            method: "GET"
        }).then(response => {
            console.log(response);
            $('.col-md-10').empty();
            $('.col-md-10').append(`
                <div class="card-deck search-cards">
                </div>
            `)
            renderSearchCards(response);
        }).catch(error => {
            $('#search-card').empty();
            $('#search-card').append(`
                <h5 class='text-center text-primary'>No results. Click search or refresh the page to try a different search.</h5>
            `)
        })
    }

    function renderUpcomingText(response) {
        for (var i = 0; i < 10; i++) {
            var posterTitle = response.results[i].title;
            var posterRelease = response.results[i].release_date;
            posterRelease = moment(posterRelease).format('MMMM Do');
            var cardDiv = `<li class="nav-item my-4">
            <p class="card-text my-0">${i+1}. <b>${posterTitle}</b></p>
            <p class="card-text my-0 poster-release">${posterRelease}</p>
            </li>`;
            $(".upcomingList").append(cardDiv);
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
                    title: 'Movie Name',
                    left: xMargin,
                    top: yMargin,
                    width: frameWidth,
                    height: frameHeight,
                    appearanceName: 'yosemite', //Preset name is 'yosemite','redstone','popup'
                    style: {
                        backgroundColor: 'rgba(220,220,220,0.6)',
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
                console.log("hello")
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
                 <p class="movieHeaders">Overview:<span class="movieWindowInfo" > ${response.overview}</span></p>
                `)
            $("#movieContent").append(createMovieImg, createMovieDiv);

        });
    }


    $('#search-button').on('click', searchClick);

});