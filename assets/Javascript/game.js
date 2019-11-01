$(document).ready(function() {
    $.ajax({
        url: "https://api.themoviedb.org/3/movie/upcoming?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1",
        method: "GET"
    }).then(function(response) {
        renderUpcoming(response);
        renderUpcomingText(response);
        renderCarousel(response);
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
            var contentCreation = $(".card-deck").append(cardDiv);
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


});