$(document).ready(function() {
    $.ajax({
        url: "https://api.themoviedb.org/3/movie/upcoming?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1",
        method: "GET"
    }).then(function(response) {
        console.log(response);
        renderUpcoming(response)
    });

    function renderUpcoming(response) {
        for (var i = 0; i < 10; i++) {
            var posterImg = response.results[i].poster_path;
            var posterTitle = response.results[i].title;
            var posterRelease = response.results[i].release_date;
            var cardNum = "cardNum" + i
            var cardDiv = `<div class="col">
            <div class="card m-4 imageLayout">
            <img src="" class="card-img-top ${cardNum} " alt="">
            <div class="card-body">
              <p class="card-text">${posterTitle}</p>
              <p class="card-text">${posterRelease}</p>
            </div>
          </div>
          </div>`;
            var contentCreation = $(".row.cards").append(cardDiv);
            $(".cardNum" + i).attr("src", "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + posterImg);
            $(".cardNum" + i).attr("alt", posterTitle + " image");


        }
    }



});