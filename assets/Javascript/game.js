$(document).ready(function() {
    $.ajax({
        url: "https://api.themoviedb.org/3/movie/upcoming?api_key=b4b1a288471f47d8977ade0fc9b9be70&language=en-US&page=1",
        method: "GET"
    }).then(function(response) {
//        console.log(response);
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
            $(".card img").on("click", movieClick);
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
      

});