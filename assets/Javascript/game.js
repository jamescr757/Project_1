$(document).ready(function() {
    
    // upcoming api call
    $.ajax({
        url: "https://api.themoviedb.org/3/movie/upcoming?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1",
        method: "GET"
    }).then(function(response) {
        console.log(response);
        renderUpcoming(response);
        renderUpcomingText(response);
        renderCarousel(response);
    });

    // popular api call
    // $.ajax({
    //     url: "https://api.themoviedb.org/3/movie/popular?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1",
    //     method: "GET"
    // }).then(function(response) {
    //     console.log(response);
    //     // renderUpcoming(response);
    //     // renderUpcomingText(response);
    //     // renderCarousel(response);
    //     renderPopular(response);
    // });

    // top_rated api call
    // $.ajax({
    //     url: "https://api.themoviedb.org/3/movie/top_rated?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1",
    //     method: "GET"
    // }).then(function(response) {
    //     console.log(response);
    //     // renderUpcoming(response);
    //     // renderUpcomingText(response);
    //     // renderCarousel(response);
    //     renderTopRated(response);
    // });

    function renderUpcoming(response) {
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
            var contentCreation = $(".card-deck.upcoming").append(cardDiv);
            $(".cardNum" + i).attr("src", "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + posterImg);
            $(".cardNum" + i).attr("alt", posterTitle + " image");
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
            <img src="" class="card-img-top ${cardNum} " alt="">
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

    function movieClick() {


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
                <ul class="nav nav-pills" style="background-color:white" >
                <li class="nav-item movieButton">
                <a class="nav-link active" href="#">Info</a>
                </li>
                <li class="nav-item movieButton">
        <a class="nav-link" href="#">Trailer</a>
        </li>
        </ul>
        
        <div class="container movieInfo">
        <div class="row">
        <div class="col">Hello
        
        </div>
        </div>
        </div>
        
        `,
                    // url: 'https://youtube.com/embed/aF8G7QDk-1A'
                }).show();

                windowOpen = true
                frame01.showModal(_frame => {
                    //Callback when modal window is closed.
                    windowOpen = false;
                });
            }
        }
        clickCounter++;
    }

});