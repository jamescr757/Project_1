$(document).ready(function() {
    $.ajax({
        url: "https://api.themoviedb.org/3/movie/upcoming?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1",
        method: "GET"
    }).then(function(response) {
        console.log(response);
        renderUpcoming(response);
        renderUpcomingText(response);

    });

    function renderUpcoming(response) {
        for (var i = 0; i < 10; i++) {
            var posterImg = response.results[i].poster_path;
            var posterTitle = response.results[i].title;
            var posterRelease = response.results[i].release_date;
            var cardNum = "cardNum" + i
            var cardDiv = `<div>
            <div class="card m-4 imageLayout">
            <img src="" class="card-img-top ${cardNum} " alt="">
            <div class="card-body">
              <p class="card-text">${posterTitle}</p>
              <p class="card-text">${posterRelease}</p>
            </div>
          </div>
          </div>`;
            var contentCreation = $(".card-deck").append(cardDiv);
            $(".cardNum" + i).attr("src", "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + posterImg);
            $(".cardNum" + i).attr("alt", posterTitle + " image");
        }
    }

    function renderUpcomingText(response) {
        for (var i = 0; i < 10; i++) {
            var posterTitle = response.results[i].title;
            var posterRelease = response.results[i].release_date;
            var cardNum = "cardNum" + i
            var cardDiv = `<li class="nav-item p-0 m-0">
            <p class="card-text">${i+1}.${posterTitle} "  "${posterRelease}</p>
            </li>`;
            var contentCreation = $(".upcomingList").append(cardDiv);
        }
    }

    const jSFrame = new JSFrame();
    //Style from preset
    const frame01 = jSFrame.create({
        title: 'Movie Name',
        left: 250,
        top: 50,
        width: 1020,
        height: 680,
        appearanceName: 'yosemite', //Preset name is 'yosemite','redstone','popup'
        style: {
            backgroundColor: 'rgba(220,220,220,0.8)',
        },
        html: `
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link movieButton text-white " href="#" >Info</a>
            </li>

            <li class="nav-item">
                <a class="nav-link movieButton text-white" href="#">Trailer</a>
            </li>
        </ul>
    </nav>
    `,
        // url: 'https://youtube.com/embed/aF8G7QDk-1A'
    }).show();



});